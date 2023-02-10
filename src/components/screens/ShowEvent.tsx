import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ParamListBase} from '@react-navigation/routers';
import {tCalendarScreenNames, tEvent, tNavigation} from '../../app/types';
import {useAppContext} from '../core/Context';
import {calendarSettings} from '../../app/inintialStates';
import {formatDate} from '../../app/useful';
import {styleShowEvent} from '../../styles/styleShowEvent';
import ShowEventDataBlock from '../showEvent/ShowEventDataBlock';

type tProps = {
  navigation: tNavigation;
  route: RouteProp<ParamListBase, tCalendarScreenNames.showEvent>;
};

type tRouteParams = {
  id: tEvent['id'];
};

function ShowEvent(props: tProps) {
  const {calendarState} = useAppContext();
  const [selectedEvent, setSelectedEvent] = useState<tEvent>();

  useEffect(() => {
    const routeParams = props.route.params as tRouteParams;
    const eventId = routeParams && routeParams.id;
    if (eventId !== null && calendarState.allEvents) {
      const eventFound = calendarState.allEvents.find(
        event => event.id === eventId,
      );
      if (eventFound) {
        setSelectedEvent(eventFound);
        // if event found return to not go to navigation back to calendar
        return;
      }
    }
    props.navigation.navigate(tCalendarScreenNames.calendar);
  }, [props.route.params, props.navigation, calendarState.allEvents]);

  if (!selectedEvent) {
    return <></>;
  }

  return (
    <ScrollView style={styleShowEvent.mainWrapper}>
      <ShowEventDataBlock
        label="Title"
        data={selectedEvent.title}
        importance={selectedEvent.importance}
      />
      <ShowEventDataBlock
        label="Start date"
        data={formatDate(calendarSettings.dateTimeDisplay, selectedEvent.start)}
        importance={selectedEvent.importance}
      />
      <ShowEventDataBlock
        label="End date"
        data={formatDate(calendarSettings.dateTimeDisplay, selectedEvent.end)}
        importance={selectedEvent.importance}
      />
      <ShowEventDataBlock
        label="Importance"
        data={selectedEvent.importance}
        importance={selectedEvent.importance}
      />
      <ShowEventDataBlock
        label="Location"
        data={selectedEvent.location}
        importance={selectedEvent.importance}
      />
    </ScrollView>
  );
}

export default ShowEvent;
