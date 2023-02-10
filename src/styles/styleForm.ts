import {StyleSheet} from 'react-native';

export const styleForm = StyleSheet.create({
  block: {
    marginTop: 40,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#777777',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
  },
  blockTitle: {
    position: 'absolute',
    fontSize: 16,
    paddingHorizontal: 2,
    top: -12,
    left: 8,
    color: '#303030',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 20,
    color: '#303030',
    padding: 0,
    margin: 0,
    flexGrow: 1,
    flexShrink: 1,
  },
  dropDownListWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 20,
  },
  dropDownListHeader: {
    backgroundColor: '#303030',
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownListHeaderElement: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dropDownSearchBar: {
    backgroundColor: '#e0e0e0',
    padding: 20,
  },
  dropDownSearchInput: {
    marginTop: 0,
    marginHorizontal: 0,
  },
  dropDownList: {
    paddingHorizontal: 20,
    height: '80%',
  },
  dropDownListItem: {
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
    padding: 15,
    fontSize: 20,
  },
  dropDownTrigger: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dropDownIcon: {
    fontSize: 22,
    color: '#303030',
  },
  button: {
    borderRadius: 5,
    height: 55,
    backgroundColor: '#303030',
    marginHorizontal: 20,
    marginTop: 40,
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 20,
  },
  errorMessage: {
    marginHorizontal: 30,
    marginTop: 2,
    color: '#ff0000',
    fontSize: 16,
  },
});
