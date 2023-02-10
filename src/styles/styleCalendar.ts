import {StyleSheet} from 'react-native';
import {calendarSettings} from '../app/inintialStates';

// static style
export const styleCalendar = StyleSheet.create({
  mainWrapper: {
    height: '100%',
  },
  backgroundRow: {
    height: 60 * calendarSettings.minuteHeight,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
    display: 'flex',
    alignItems: 'stretch',
  },
  backgroundText: {
    backgroundColor: '#a0a0a0',
    color: '#ffffff',
    display: 'flex',
    width: 25,
    height: '100%',
    textAlign: 'center',
    fontSize: 16,
  },
  crossDayEventWrapper: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
    paddingTop: 10,
    maxHeight: '100%',
  },
  crossDayEvent: {
    fontSize: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },
  crossDayEventShowMore: {
    fontSize: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#a0a0a0',
    color: '#ffffff',
  },
  intradayEventBlockWrapper: {
    position: 'absolute',
    width: '100%',
    paddingLeft: 26,
    paddingRight: 1,
  },
  intradayEventBlockInnerWrapper: {
    position: 'relative',
  },
  intradayEventWrapper: {
    position: 'absolute',
    padding: 1,
  },
  intradayEvent: {
    color: '#303030',
    fontSize: 20,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#c0c0c0',
    height: '100%',
    overflow: 'hidden',
  },
});
