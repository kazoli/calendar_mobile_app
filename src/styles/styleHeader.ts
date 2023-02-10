import {StyleSheet} from 'react-native';

export const styleHeader = StyleSheet.create({
  background: {
    backgroundColor: '#fcfcfc',
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  icon: {
    fontSize: 26,
    color: '#303030',
    paddingHorizontal: 3,
  },
  title: {
    fontSize: 20,
    color: '#303030',
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'row',
  },
  menuWrapper: {
    position: 'absolute',
    right: 5,
    top: 45,
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  menuItemWrapper: {
    marginVertical: 10,
    paddingRight: 10,
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 20,
    color: '#303030',
  },
});
