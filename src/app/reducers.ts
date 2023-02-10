import {storageMaxLengthExceeded, setStorageData} from './dataStorage';
import {
  tCalendarActions,
  tCalendarActionTypes,
  tCalendarState,
  tKeyValueObject,
} from './types';
import {alphabetReorder} from './useful';

export const calendarReducer = (
  state: tCalendarState,
  action: tCalendarActions,
) => {
  // reducer actions
  switch (action.type) {
    case tCalendarActionTypes.initializeAllEvents:
      return {...state, initialization: true, allEvents: action.payload};
    case tCalendarActionTypes.setSelectedDate:
      return {...state, selectedDate: action.payload};
    case tCalendarActionTypes.createEvent:
      // creating an id for a new event
      action.payload.id =
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12),
        ).toString(36);
      // reorder events according to start dates
      const createdEvents = alphabetReorder(
        [...state.allEvents, action.payload] as tKeyValueObject[],
        'start',
      );
      // if max lenght of storage would be exceeded than drops the very first event in the array
      if (storageMaxLengthExceeded(createdEvents)) {
        createdEvents.shift();
      }
      // store extended events array into local storage
      setStorageData('events', createdEvents);
      // push newly created array into all events of state
      state.allEvents = createdEvents as tCalendarState['allEvents'];
      return state;
    case tCalendarActionTypes.updateEvent:
      state.allEvents = state.allEvents.map(event =>
        event.id === action.payload.id ? action.payload : event,
      );
      // reorder events according to start dates
      state.allEvents = alphabetReorder(
        state.allEvents as tKeyValueObject[],
        'start',
      ) as tCalendarState['allEvents'];
      // if max lenght of storage would be exceeded than drops the very first event in the array
      if (storageMaxLengthExceeded(state.allEvents)) {
        state.allEvents.shift();
      }
      // store events array of state into local storage
      setStorageData('events', state.allEvents);
      return state;
    case tCalendarActionTypes.deleteEvent:
      state.allEvents = state.allEvents.filter(
        event => event.id !== action.payload,
      );
      // store events array of state into local storage
      setStorageData('events', state.allEvents);
      return state;
    default:
      return state;
  }
};
