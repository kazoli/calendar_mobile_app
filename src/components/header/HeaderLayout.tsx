import React from 'react';
import {StackHeaderProps} from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import {styleHeader} from '../../styles/styleHeader';
import Icon from 'react-native-vector-icons/Ionicons';
// import HeaderElements from './HeaderElements';

type tProps = StackHeaderProps & {
  children: JSX.Element;
};

function HeaderLayout(props: tProps) {
  return (
    <View style={styleHeader.background}>
      <View>
        {props.back && (
          <TouchableOpacity onPress={props.navigation.goBack}>
            <Icon name="ios-arrow-back" style={styleHeader.icon} />
          </TouchableOpacity>
        )}
      </View>
      {props.children}
    </View>
  );
}

export default HeaderLayout;
