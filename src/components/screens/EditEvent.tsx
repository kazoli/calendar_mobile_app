import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, TextInput} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ParamListBase} from '@react-navigation/routers';
import {
  tCalendarActionTypes,
  tCalendarScreenNames,
  tEvent,
  tNavigation,
} from '../../app/types';
import {
  calendarSettings,
  countryList,
  eventInitialState,
  eventImportance,
  eventErrorsInitialState,
} from '../../app/inintialStates';
import {useAppContext} from '../core/Context';
import {validateEditEvent} from '../../app/validations';
import {formatDate} from '../../app/useful';
import {styleEditEvent} from '../../styles/styleEditEvent';
import {styleForm} from '../../styles/styleForm';
import {Button} from '@rneui/themed';
import FormBlock from '../form/FormBlock';
import DateSelector from '../general/DateSelector';
import FormDropDown from '../form/FormDropDown';

type tProps = {
  navigation: tNavigation;
  route: RouteProp<
    ParamListBase,
    tCalendarScreenNames.newEvent | tCalendarScreenNames.editEvent
  >;
};

type tRouteParams = {
  id: tEvent['id'];
};

function EditEvent(props: tProps) {
  const {calendarState, calendarDispatch} = useAppContext();
  const [eventData, setEventData] = useState(eventInitialState);
  const [errors, setErrors] = useState(eventErrorsInitialState);

  const dropDowns = useMemo(() => {
    //creating array for dropdown menu
    const eventImportanceArray = [];
    for (let key in eventImportance) {
      eventImportanceArray.push(key);
    }
    return {
      eventImportance: eventImportanceArray,
      countryList: [eventInitialState.location, ...countryList],
    };
  }, []);

  useEffect(() => {
    const routeParams = props.route.params as tRouteParams;
    const eventId = routeParams && routeParams.id;
    if (eventId === null) {
      const currentDate = new Date();
      setEventData(prevState => ({
        ...prevState,
        start: formatDate(calendarSettings.dateTimeBackend, currentDate),
        end: formatDate(
          calendarSettings.dateTimeBackend,
          new Date(currentDate.setHours(currentDate.getHours() + 1)),
        ),
      }));
    } else {
      if (calendarState.allEvents) {
        const eventFound = calendarState.allEvents.find(
          event => event.id === eventId,
        );
        if (eventFound) {
          setEventData(eventFound);
        }
      }
    }
  }, [props.route.params, calendarState.allEvents]);

  const setDate = (propName: string, newDate: Date) => {
    setEventData(prevState => ({
      ...prevState,
      [propName]: formatDate(calendarSettings.dateTimeBackend, newDate),
    }));
  };

  const onSubmit = () => {
    const errorResponse = validateEditEvent(eventData);
    setErrors(errorResponse);
    if (!errorResponse.title && !errorResponse.start && !errorResponse.end) {
      calendarDispatch({
        type: tCalendarActionTypes[
          eventData.id ? 'updateEvent' : 'createEvent'
        ],
        payload: eventData,
      });
      props.navigation.navigate(
        tCalendarScreenNames[eventData.id ? 'showEvent' : 'calendar'],
        {id: eventData.id},
      );
    }
  };

  // wait to set start and end date of event data for Date() function
  if (!eventData.start || !eventData.end) {
    return <></>;
  }

  return (
    <ScrollView style={styleEditEvent.background}>
      <FormBlock title="Title">
        <TextInput
          style={styleForm.text}
          onChangeText={text =>
            setEventData(prevState => ({...prevState, title: text}))
          }
          value={eventData.title}
          placeholder="No title"
          multiline={true}
        />
      </FormBlock>
      {!!errors.title && (
        <Text style={styleForm.errorMessage}>{errors.title}</Text>
      )}
      <FormBlock title="Start date">
        <DateSelector
          wrapperStyle={styleEditEvent.dateWrapper}
          iconStyle={styleEditEvent.dateIcon}
          textStyle={styleForm.text}
          title="Select start date"
          format={calendarSettings.dateTimeDisplay}
          mode="datetime"
          initialDate={new Date(eventData.start)}
          action={value => setDate('start', value)}
        />
      </FormBlock>
      {!!errors.start && (
        <Text style={styleForm.errorMessage}>{errors.start}</Text>
      )}
      <FormBlock title="End date">
        <DateSelector
          wrapperStyle={styleEditEvent.dateWrapper}
          iconStyle={styleEditEvent.dateIcon}
          textStyle={styleForm.text}
          title="Select end date"
          format={calendarSettings.dateTimeDisplay}
          mode="datetime"
          initialDate={new Date(eventData.end)}
          action={value => setDate('end', value)}
        />
      </FormBlock>
      {!!errors.end && <Text style={styleForm.errorMessage}>{errors.end}</Text>}
      <FormDropDown
        title="Importance"
        selected={eventData.importance}
        values={dropDowns.eventImportance}
        action={value =>
          setEventData(prevState => ({...prevState, importance: value}))
        }
      />
      <FormDropDown
        title="Location"
        selected={eventData.location}
        values={dropDowns.countryList}
        action={value =>
          setEventData(prevState => ({...prevState, location: value}))
        }
      />
      <Button
        onPress={onSubmit}
        title="Submit"
        buttonStyle={styleForm.button}
        titleStyle={styleForm.buttonTitle}
      />
    </ScrollView>
  );
}

export default EditEvent;
