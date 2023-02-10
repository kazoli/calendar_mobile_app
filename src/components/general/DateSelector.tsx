import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {deviceLocale} from '../../app/inintialStates';
import {formatDate} from '../../app/useful';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type tProps = {
  wrapperStyle: {[key: string]: string | number};
  iconStyle: {[key: string]: string | number};
  textStyle: {[key: string]: string | number};
  title: string;
  format: string;
  mode: 'datetime' | 'date' | 'time';
  initialDate: Date;
  action: (value: Date) => void;
};

function DateSelector(props: tProps) {
  const [date, setDate] = useState(props.initialDate);
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={props.wrapperStyle}
        onPress={() => setOpen(true)}>
        <Icon name="calendar-search" style={props.iconStyle} />
        <Text style={props.textStyle}>{formatDate(props.format, date)}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        locale={deviceLocale}
        title={props.title}
        mode={props.mode}
        open={open}
        date={date}
        onConfirm={value => {
          setOpen(false);
          setDate(value);
          props.action(value);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}

export default DateSelector;
