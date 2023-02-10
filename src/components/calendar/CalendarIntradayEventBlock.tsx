import React from 'react';
import {View} from 'react-native';
import {tIntradayEventsBlock, tNavigation} from '../../app/types';
import {styleCalendar} from '../../styles/styleCalendar';
import {styleCalendarElementPosition} from '../../styles/styleDinamic';
import CalendarIntradayEvent from './CalendarIntradayEvent';

type tProps = {
  eventBlock: tIntradayEventsBlock;
  navigation: tNavigation;
};

function CalendarIntradayEventBlock(props: tProps) {
  const columnWidth = 100 / (props.eventBlock.columnIndex + 1);

  return (
    <View
      style={{
        ...styleCalendar.intradayEventBlockWrapper,
        ...styleCalendarElementPosition(props.eventBlock.rowStart),
      }}>
      <View style={styleCalendar.intradayEventBlockInnerWrapper}>
        {props.eventBlock.events.map(event => (
          <CalendarIntradayEvent
            key={event.id}
            event={event}
            columnWidth={columnWidth}
            navigation={props.navigation}
          />
        ))}
      </View>
    </View>
  );
}

export default CalendarIntradayEventBlock;
