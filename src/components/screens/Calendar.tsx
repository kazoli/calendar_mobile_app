import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useAppContext} from '../core/Context';
import {
  tCalendarActionTypes,
  tCalendarProcessedData,
  tEvent,
  tNavigation,
} from '../../app/types';
import {getStorageData} from '../../app/dataStorage';
import {getCalendarProcessedData} from '../../app/middleware';
import {styleCalendar} from '../../styles/styleCalendar';
import CalendarCrossDayEvents from '../calendar/CalendarCrossDayEvents';
import CalendarBackground from '../calendar/CalendarBackground';
import CalendarIntradayEventBlock from '../calendar/CalendarIntradayEventBlock';

type tProps = {
  navigation: tNavigation;
};

function Calendar(props: tProps) {
  // useIsFocused is necessary to refresh page data if an event has been modified
  const isFocused = useIsFocused();
  const {calendarState, calendarDispatch} = useAppContext();
  const [calendarProcessedData, setCalendarProcessedData] =
    useState<tCalendarProcessedData>();

  useEffect(() => {
    if (calendarState.initialization) {
      // get calendar data for selected date
      setCalendarProcessedData(getCalendarProcessedData(calendarState));
    } else {
      // initialize data from local storage
      getStorageData('events').then(events => {
        let payload: tEvent[] = [];
        // if events exist push into array
        if (events && typeof events === 'object') {
          payload = events as tEvent[];
        }
        // store all events into state of reducer
        calendarDispatch({
          type: tCalendarActionTypes.initializeAllEvents,
          payload: payload,
        });
      });
    }
  }, [isFocused, calendarState, calendarDispatch]);

  if (!calendarProcessedData) {
    return <></>;
  }

  return (
    <View style={styleCalendar.mainWrapper}>
      {!!calendarProcessedData.crossDay.length && (
        <CalendarCrossDayEvents
          events={calendarProcessedData.crossDay}
          navigation={props.navigation}
        />
      )}
      <ScrollView>
        <CalendarBackground />
        {!!calendarProcessedData.intraday.length &&
          calendarProcessedData.intraday.map((eventBlock, index) => (
            <CalendarIntradayEventBlock
              key={index}
              eventBlock={eventBlock}
              navigation={props.navigation}
            />
          ))}
      </ScrollView>
    </View>
  );
}

export default Calendar;
