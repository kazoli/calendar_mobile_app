import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {styleForm} from '../../styles/styleForm';
import FormBlock from './FormBlock';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PopUpModal from '../general/PopUpModal';

type tProps = {
  title: string;
  selected: string;
  values: string[];
  action: (value: string) => void;
};

function FormDropDown(props: tProps) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredValues, setFilteredValues] = useState<tProps['values']>([]);

  useEffect(() => {
    const keyword = search.trim();
    if (keyword) {
      const regex = new RegExp(`^${keyword}`, 'i');
      setFilteredValues(props.values.filter(value => value.match(regex)));
    } else {
      setFilteredValues(props.values);
    }
  }, [search, props.values]);

  const hide = () => {
    setSearch('');
    setVisible(false);
  };

  return (
    <FormBlock title={props.title}>
      <>
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
          <View style={styleForm.dropDownTrigger}>
            <Text style={styleForm.text}>{props.selected}</Text>
            <Icon name="arrow-drop-down" style={styleForm.dropDownIcon} />
          </View>
        </TouchableWithoutFeedback>
        <PopUpModal visible={visible}>
          <View style={styleForm.dropDownListWrapper}>
            <View style={styleForm.dropDownListHeader}>
              <Text style={styleForm.dropDownListHeaderElement}>
                {props.title}
              </Text>
              <Icon
                name="close"
                style={styleForm.dropDownListHeaderElement}
                onPress={hide}
              />
            </View>
            <View style={styleForm.dropDownSearchBar}>
              <View
                style={{...styleForm.block, ...styleForm.dropDownSearchInput}}>
                <TextInput
                  style={styleForm.text}
                  onChangeText={text => setSearch(text)}
                  value={search}
                  placeholder="Enter to filter list"
                />
              </View>
            </View>
            <ScrollView style={styleForm.dropDownList}>
              {filteredValues.map((value, index) => (
                <Text
                  key={`${value}_${index}`}
                  style={styleForm.dropDownListItem}
                  onPress={() => {
                    hide();
                    props.action(value);
                  }}>
                  {value}
                </Text>
              ))}
            </ScrollView>
          </View>
        </PopUpModal>
      </>
    </FormBlock>
  );
}

export default FormDropDown;
