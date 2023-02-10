import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StackHeaderProps} from '@react-navigation/stack';
import {tCalendarScreenNames} from '../../app/types';
import {styleHeader} from '../../styles/styleHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type tProps = {
  navigation: StackHeaderProps['navigation'];
};

function HeaderCalendarRight(props: tProps) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate(tCalendarScreenNames.newEvent, {id: null})
      }>
      <Icon name="calendar-import" style={styleHeader.icon} />
    </TouchableOpacity>
  );
}

export default HeaderCalendarRight;
