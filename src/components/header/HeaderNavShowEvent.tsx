import React, {useState} from 'react';
import {Text} from 'react-native';
import {StackHeaderProps} from '@react-navigation/stack';
import {useAppContext} from '../core/Context';
import {
  tCalendarActionTypes,
  tCalendarScreenNames,
  tEvent,
} from '../../app/types';
import {styleHeader} from '../../styles/styleHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderLayout from './HeaderLayout';
import HeaderMenu from './HeaderMenu';
import CustomAlert from '../general/CustomAlert';

type tProps = StackHeaderProps;

type tRouteParams = {
  id: tEvent['id'];
};

function HeaderNavShowEvent(props: tProps) {
  const {calendarDispatch} = useAppContext();
  const [showMenu, setShowMenu] = useState(false);
  const routeParams = props.route.params as tRouteParams;
  const eventId = routeParams && routeParams.id;

  const items = [
    {
      name: tCalendarScreenNames.editEvent,
      icon: <Icon name="calendar-edit" style={styleHeader.icon} />,
      action: () => {
        setShowMenu(false);
        props.navigation.navigate(tCalendarScreenNames.editEvent, {
          id: eventId,
        });
      },
    },
    {
      name: 'Delete event',
      icon: <Icon name="delete-outline" style={styleHeader.icon} />,
      action: () => {
        CustomAlert({
          title: 'Delete event',
          message: 'Are you sure to delete this event?',
          buttons: [
            {
              text: 'Cancel',
              onPress: () => setShowMenu(false),
            },
            {
              text: 'Ok',
              onPress: () => {
                calendarDispatch({
                  type: tCalendarActionTypes.deleteEvent,
                  payload: eventId,
                });
                props.navigation.navigate(tCalendarScreenNames.calendar);
              },
            },
          ],
        });
      },
    },
  ];

  return (
    <HeaderLayout {...props}>
      <>
        <Text style={styleHeader.title}>{props.route.name}</Text>
        <Icon
          name="menu"
          style={styleHeader.icon}
          onPress={() => setShowMenu(!showMenu)}
        />
        {showMenu && <HeaderMenu items={items} />}
      </>
    </HeaderLayout>
  );
}

export default HeaderNavShowEvent;
