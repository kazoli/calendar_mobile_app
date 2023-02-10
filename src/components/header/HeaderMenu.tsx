import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styleHeader} from '../../styles/styleHeader';

type tProps = {
  items: {
    name: string;
    icon: JSX.Element;
    action: () => void;
  }[];
};

function HeaderMenu(props: tProps) {
  return (
    <View style={styleHeader.menuWrapper}>
      {props.items.map(item => (
        <TouchableOpacity
          key={item.name}
          onPress={item.action}
          style={styleHeader.menuItemWrapper}>
          {item.icon}
          <Text style={styleHeader.menuItemText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default HeaderMenu;
