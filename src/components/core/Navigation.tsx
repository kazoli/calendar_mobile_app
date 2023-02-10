import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {tCalendarScreenNames} from '../../app/types';
import HeaderNavCalendar from '../header/HeaderNavCalendar';
import Calendar from '../screens/Calendar';
import EditEvent from '../screens/EditEvent';
import ShowEvent from '../screens/ShowEvent';
import HeaderNavEditEvent from '../header/HeaderNavEditEvent';
import HeaderNavShowEvent from '../header/HeaderNavShowEvent';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calendar">
        <Stack.Screen
          name={tCalendarScreenNames.calendar}
          component={Calendar}
          options={{
            header: props => <HeaderNavCalendar {...props} />,
          }}
        />
        <Stack.Screen
          name={tCalendarScreenNames.newEvent}
          component={EditEvent}
          options={{
            header: props => <HeaderNavEditEvent {...props} />,
          }}
        />
        <Stack.Screen
          name={tCalendarScreenNames.editEvent}
          component={EditEvent}
          options={{
            header: props => <HeaderNavEditEvent {...props} />,
          }}
        />
        <Stack.Screen
          name={tCalendarScreenNames.showEvent}
          component={ShowEvent}
          options={{
            header: props => <HeaderNavShowEvent {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
