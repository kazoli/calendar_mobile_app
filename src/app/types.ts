import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/routers';

// type for dynamic key-value objects
export type tKeyValueObject = {[key: string]: string};

// type for calendar settings
export type tCalendarSettings = {
  minuteHeight: number;
  eventMinLength: number;
  crossDayMaxRows: number;
  dateBackend: string;
  dateDisplay: string;
  dateTimeBackend: string;
  dateTimeDisplay: string;
};

// type for country list
export type tCountryList = string[];

// types of routes of calendar
export enum tCalendarScreenNames {
  calendar = 'Calendar',
  newEvent = 'Add a new event',
  showEvent = 'Event details',
  editEvent = 'Edit event',
}

// type for navigation
export type tNavigation = StackNavigationProp<ParamListBase, string, undefined>;

// type for event base structure
export type tEvent = {
  id: null | string;
  title: string;
  start: string;
  end: string;
  importance: string;
  location: string;
};

// type for event editting errors
export type tEventErrors = {
  title: string;
  start: string;
  end: string;
};

// type of state of calendar
export type tCalendarState = {
  initialization: boolean;
  allEvents: tEvent[];
  selectedDate: string;
};

// type for day crossing events
export type tCrossDayEvent = {
  id: tEvent['id'];
  title: tEvent['title'];
  importance: tEvent['importance'];
};

// type for intraday event
export type tIntradayEvent = {
  id: tEvent['id'];
  title: tEvent['title'];
  importance: tEvent['importance'];
  rowStart: number;
  rowEnd: number;
  column: number;
};

// type for intraday events block
export type tIntradayEventsBlock = {
  columnIndex: number;
  columns: {rowStart: number; rowEnd: number}[];
  rowStart: number;
  rowEnd: number;
  events: tIntradayEvent[];
};

// type processed data
export type tCalendarProcessedData = {
  intraday: tIntradayEventsBlock[];
  crossDay: tCrossDayEvent[];
};

// types of actions for calendar reducer
export enum tCalendarActionTypes {
  initializeAllEvents = 'initializeAllEvents',
  setSelectedDate = 'setSelectedDate',
  createEvent = 'createEvent',
  updateEvent = 'updateEvent',
  deleteEvent = 'deleteEvent',
}

// payload of calendar actions
type tCalendarPayload = {
  [tCalendarActionTypes.initializeAllEvents]: tEvent[];
  [tCalendarActionTypes.setSelectedDate]: tCalendarState['selectedDate'];
  [tCalendarActionTypes.createEvent]: tEvent;
  [tCalendarActionTypes.updateEvent]: tEvent;
  [tCalendarActionTypes.deleteEvent]: tEvent['id'];
};

// action map for reducers
type tActionMap<M extends {[index: string]: any}> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// type of calendar actions
export type tCalendarActions =
  tActionMap<tCalendarPayload>[keyof tActionMap<tCalendarPayload>];
