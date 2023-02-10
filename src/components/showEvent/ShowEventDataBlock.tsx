import React from 'react';
import {View, Text} from 'react-native';
import {styleImportance} from '../../styles/styleDinamic';
import {styleShowEvent} from '../../styles/styleShowEvent';

type tProps = {
  label: string;
  data: string | JSX.Element;
  importance: string;
};

function ShowEventDataBlock(props: tProps) {
  return (
    <View
      style={{
        ...styleShowEvent.dataBlockWrapper,
        ...styleImportance(props.importance),
      }}>
      <Text style={styleShowEvent.dataLabel}>{props.label}</Text>
      <Text style={styleShowEvent.dataBody}>{props.data}</Text>
    </View>
  );
}

export default ShowEventDataBlock;
