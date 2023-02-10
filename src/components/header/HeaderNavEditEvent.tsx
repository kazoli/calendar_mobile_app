import React from 'react';
import {Text, View} from 'react-native';
import {StackHeaderProps} from '@react-navigation/stack';
import {styleHeader} from '../../styles/styleHeader';
import HeaderLayout from './HeaderLayout';

type tProps = StackHeaderProps;

function HeaderNavEditEvent(props: tProps) {
  return (
    <HeaderLayout {...props}>
      <>
        <Text style={styleHeader.title}>{props.route.name}</Text>
        <View style={styleHeader.icon} />
      </>
    </HeaderLayout>
  );
}

export default HeaderNavEditEvent;
