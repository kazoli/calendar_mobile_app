import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {calendarSettings} from '../../app/inintialStates';
import {
  tCalendarScreenNames,
  tCrossDayEvent,
  tNavigation,
} from '../../app/types';
import {styleCalendar} from '../../styles/styleCalendar';
import {styleImportance} from '../../styles/styleDinamic';

type tProps = {
  events: tCrossDayEvent[];
  navigation: tNavigation;
};

function CalendarCrossDayEvents(props: tProps) {
  const [showAll, setShowAll] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<tCrossDayEvent[]>([]);
  const totalEvents = props.events.length;
  const isHiddenEvents = totalEvents > calendarSettings.crossDayMaxRows;
  const showMore = `Show +${
    totalEvents - calendarSettings.crossDayMaxRows + 1
  } more...`;
  const showLess = 'Show less...';

  useEffect(() => {
    if (isHiddenEvents && !showAll) {
      setFilteredEvents(
        props.events.slice(0, calendarSettings.crossDayMaxRows - 1),
      );
    } else {
      setFilteredEvents(props.events);
    }
  }, [props.events, showAll, isHiddenEvents, setFilteredEvents]);

  return (
    <View style={styleCalendar.crossDayEventWrapper}>
      <ScrollView>
        {filteredEvents.map(event => (
          <Text
            onPress={() =>
              props.navigation.navigate(tCalendarScreenNames.showEvent, {
                id: event.id,
              })
            }
            key={event.id}
            style={{
              ...styleCalendar.crossDayEvent,
              ...styleImportance(event.importance),
            }}>
            {event.title}
          </Text>
        ))}
        {isHiddenEvents && (
          <Text
            style={styleCalendar.crossDayEventShowMore}
            onPress={() => setShowAll(!showAll)}>
            {showAll ? showLess : showMore}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

export default CalendarCrossDayEvents;
