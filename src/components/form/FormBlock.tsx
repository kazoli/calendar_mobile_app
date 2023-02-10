import React from 'react';
import {View, Text} from 'react-native';
import {styleForm} from '../../styles/styleForm';

type tProps = {
  children: JSX.Element;
  title: string;
};

function FormBlock(props: tProps) {
  return (
    <View style={styleForm.block}>
      <Text style={styleForm.blockTitle}>{props.title}</Text>
      {props.children}
    </View>
  );
}

export default FormBlock;
