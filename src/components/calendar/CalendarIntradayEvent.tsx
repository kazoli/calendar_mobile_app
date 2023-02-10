import React from 'react';
import {View, Text} from 'react-native';
import {
  tCalendarScreenNames,
  tIntradayEvent,
  tNavigation,
} from '../../app/types';
import {styleCalendar} from '../../styles/styleCalendar';
import {
  styleCalendarElementDimensions,
  styleCalendarElementPosition,
  styleImportance,
} from '../../styles/styleDinamic';

type tProps = {
  event: tIntradayEvent;
  columnWidth: number;
  navigation: tNavigation;
};

function CalendarIntradayEvent(props: tProps) {
  return (
    <View
      style={{
        ...styleCalendar.intradayEventWrapper,
        ...styleCalendarElementPosition(
          props.event.rowStart,
          `${props.event.column * props.columnWidth}%`,
        ),
        ...styleCalendarElementDimensions(
          `${props.columnWidth}%`,
          props.event.rowEnd - props.event.rowStart,
        ),
      }}>
      <Text
        onPress={() =>
          props.navigation.navigate(tCalendarScreenNames.showEvent, {
            id: props.event.id,
          })
        }
        style={{
          ...styleCalendar.intradayEvent,
          ...styleImportance(props.event.importance),
        }}>
        {props.event.title}
      </Text>
    </View>
  );
}

export default CalendarIntradayEvent;
