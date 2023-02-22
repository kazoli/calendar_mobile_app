import {calendarSettings} from './inintialStates';
import {
  tCalendarState,
  tCrossDayEvent,
  tIntradayEvent,
  tIntradayEventsBlock,
  tCalendarProcessedData,
} from './types';

// process calendar events for the selected date
export function getCalendarProcessedData(
  calendarState: tCalendarState,
): tCalendarProcessedData {
  let crossDayEvents: tCrossDayEvent[] = [];
  let intradayEventBlocks: tIntradayEventsBlock[] = [];

  // check out allEvents contains events
  if (calendarState.allEvents.length) {
    let intradayEvents: tIntradayEvent[] = [];
    // destructuring variables from event sorting
    ({crossDayEvents, intradayEvents} = sortEvents(calendarState));
    // get calculated positions for intraday events and their blocks
    intradayEventBlocks = calculatePositions(intradayEvents);
  }

  return {
    crossDay: crossDayEvents,
    intraday: intradayEventBlocks,
  };
}

// calculate an event row position for start or end
const calculateRowPosition = (
  eventTimeStamp: number,
  dayStartTimeStamp: number,
) => {
  // calculate based on timestamp difference in minutes and multiplying by the height of a minute in displaying
  return (
    Math.round((eventTimeStamp - dayStartTimeStamp) / 60000) *
    calendarSettings.minuteHeight
  );
};

// calculate an event time interval length in days
function calculateIntervalDays(endTimeStamp: number, startTimeStamp: number) {
  return 1 + Math.floor((endTimeStamp - startTimeStamp) / 86400000);
}

// sorting events according to cross day, intraday, sooner or later than selected date
function sortEvents(calendarState: tCalendarState) {
  const crossDayEvents: tCrossDayEvent[] = [];
  const intradayEvents: tIntradayEvent[] = [];
  // time stamp for day start
  const dayStartTimeStamp = Date.parse(
    `${calendarState.selectedDate}T00:00:00`,
  );
  // time stamp for day end
  const dayEndTimeStamp = Date.parse(`${calendarState.selectedDate}T23:59:59`);

  // selecting loop
  calendarState.allEvents.forEach(e => {
    const event: tIntradayEvent = {
      id: e.id,
      title: e.title,
      importance: e.importance,
      column: 0,
      rowStart: 0,
      rowEnd: 0,
    };
    let eventStartTimeStamp = Date.parse(e.start);
    let eventEndTimeStamp = Date.parse(e.end);

    // sort events by cross day or intraday
    if (eventStartTimeStamp < dayStartTimeStamp) {
      if (eventEndTimeStamp < dayStartTimeStamp) {
        // event is sooner than the selected date so continue with next event
        return;
      } else {
        // current day crosses the date interval of event
        // adding No title text instead of empty title
        event.title = event.title.length ? event.title : 'No title';
        // get event interval length in days
        const intervalDays = calculateIntervalDays(
          eventEndTimeStamp,
          eventStartTimeStamp,
        );
        // which day is the current one in the interval
        const currentDay = calculateIntervalDays(
          dayEndTimeStamp,
          eventStartTimeStamp,
        );
        // adding interval data to title
        event.title = `${event.title} (Days: ${intervalDays}/${currentDay})`;
        if (dayEndTimeStamp - eventEndTimeStamp < 0) {
          // event will not end in current day
          crossDayEvents.push({
            id: event.id,
            title: event.title,
            importance: event.importance,
          });
          // continue with next event
          return;
        } else {
          // event will end in current day so changing start time stamp for later processing
          eventStartTimeStamp = dayStartTimeStamp;
        }
      }
    } else {
      if (eventStartTimeStamp > dayEndTimeStamp) {
        // event is later than selected date so continue with next event
        return;
      } else {
        // adding No title text instead of empty title
        event.title = event.title.length ? event.title : 'No title';
        if (eventEndTimeStamp > dayEndTimeStamp) {
          // event crosses the current day
          // get event interval length in days
          const intervalDays = calculateIntervalDays(
            eventEndTimeStamp,
            eventStartTimeStamp,
          );
          event.title = `${event.title} (Days: ${intervalDays}/1)`;
          // event will not end in current day so changing end time stamp for later processing
          eventEndTimeStamp = dayEndTimeStamp;
        }
      }
    }

    // if an event too short in height to be rendered correctly it add minimum height for it
    if (
      eventEndTimeStamp - eventStartTimeStamp <
      calendarSettings.eventMinLength
    ) {
      eventEndTimeStamp = eventStartTimeStamp + calendarSettings.eventMinLength;
    }

    // start position of the event
    event.rowStart = calculateRowPosition(
      eventStartTimeStamp,
      dayStartTimeStamp,
    );
    // end position of the event
    event.rowEnd = calculateRowPosition(eventEndTimeStamp, dayStartTimeStamp);
    intradayEvents.push(event);
  });
  return {crossDayEvents: crossDayEvents, intradayEvents: intradayEvents};
}

// calculating positions of intraday blocks and column position of events
function calculatePositions(intradayEvents: tIntradayEvent[]) {
  const intradayEventBlocks: tIntradayEventsBlock[] = [];
  // intraday event data block (must have let to aviod shallow copy problems)
  let intradayEventBlock: tIntradayEventsBlock = {
    columnIndex: 0,
    columns: [{rowStart: 0, rowEnd: 0}],
    rowStart: 0,
    rowEnd: 0,
    events: [],
  };

  // looping through intraday events
  intradayEvents.forEach(event => {
    // if next event row start is after the end row of intraday event block, then a new intraday event block is created and the old one is pushed into intraday event block array
    if (
      intradayEventBlock.rowStart !== intradayEventBlock.rowEnd &&
      intradayEventBlock.rowEnd <= event.rowStart
    ) {
      // push previous intraday event block object into intraday event blocks array
      intradayEventBlocks.push(intradayEventBlock);
      // reset the intraday event block
      intradayEventBlock = {
        columnIndex: 0,
        columns: [{rowStart: 0, rowEnd: 0}],
        rowStart: 0,
        rowEnd: 0,
        events: [],
      };
    }
    if (intradayEventBlock.events.length) {
      // the intraday event block already contains events
      let newColumn = true;
      let columnIndex = 0;
      // try to find a column in which the event first can be pushed
      do {
        // inside an intraday event block if a column ends before new event start
        if (intradayEventBlock.columns[columnIndex].rowEnd <= event.rowStart) {
          // existing column takes row end of event
          intradayEventBlock.columns[columnIndex].rowEnd = event.rowEnd;
          // event takes the column index
          event.column = columnIndex;
          // no new column needs to create
          newColumn = false;
          // exit from do-while
          columnIndex = intradayEventBlock.columnIndex;
        }
        // runs until it turns undefined
      } while (intradayEventBlock.columns[++columnIndex]);
      // create a new column in intraday event block
      if (newColumn) {
        // increase index of columns
        intradayEventBlock.columnIndex += 1;
        // event data push into the new column
        // (because start date ordering, a new event cannot be inserted at the beginning of an existing column)
        intradayEventBlock.columns[intradayEventBlock.columnIndex] = {
          rowStart: event.rowStart,
          rowEnd: event.rowEnd,
        };
        // event takes the new column index
        event.column = intradayEventBlock.columnIndex;
      }
    } else {
      // if no events in an intraday event block it takes event data
      intradayEventBlock.columns[0].rowStart = event.rowStart;
      intradayEventBlock.columns[0].rowEnd = event.rowEnd;
      intradayEventBlock.rowStart = event.rowStart;
    }
    // if intraday event block row end lower than the one of event, the block takes that value
    if (intradayEventBlock.rowEnd < event.rowEnd) {
      intradayEventBlock.rowEnd = event.rowEnd;
    }
    intradayEventBlock.events.push({
      id: event.id,
      title: event.title,
      importance: event.importance,
      rowStart: event.rowStart - intradayEventBlock.rowStart, // set event start position relative to its block
      rowEnd: event.rowEnd - intradayEventBlock.rowStart, // set event end position relative to its block
      column: event.column,
    });
  });
  // push last intraday event block object into data if it has data
  if (intradayEventBlock.rowEnd !== intradayEventBlock.rowStart) {
    intradayEventBlocks.push(intradayEventBlock);
  }
  return intradayEventBlocks;
}
