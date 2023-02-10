import React from 'react';
import {Text, View} from 'react-native';
import {styleCalendar} from '../../styles/styleCalendar';

function CalendarBackground() {
  const rows = [...Array(24).keys()];

  return (
    <View>
      {rows.map((row, index) => (
        <View key={index} style={styleCalendar.backgroundRow}>
          <Text style={styleCalendar.backgroundText}>
            {`${row}`.padStart(2, '0')}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default CalendarBackground;
