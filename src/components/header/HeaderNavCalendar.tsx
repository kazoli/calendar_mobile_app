import React from 'react';
import {StackHeaderProps} from '@react-navigation/stack';
import {calendarSettings} from '../../app/inintialStates';
import {formatDate} from '../../app/useful';
import {styleHeader} from '../../styles/styleHeader';
import HeaderLayout from './HeaderLayout';
import DateSelector from '../general/DateSelector';
import HeaderCalendarRight from './HeaderCalendarRight';
import {useAppContext} from '../core/Context';
import {tCalendarActionTypes} from '../../app/types';

type tProps = StackHeaderProps;

function HeaderNavCalendar(props: tProps) {
  const {calendarState, calendarDispatch} = useAppContext();

  const action = (value: Date) => {
    const date = formatDate(calendarSettings.dateBackend, value);
    // dispatch only if there is changing in selected date
    if (date !== calendarState.selectedDate) {
      calendarDispatch({
        type: tCalendarActionTypes.setSelectedDate,
        payload: date,
      });
    }
  };

  return (
    <HeaderLayout {...props}>
      <>
        <DateSelector
          wrapperStyle={styleHeader.title}
          iconStyle={styleHeader.icon}
          textStyle={styleHeader.title}
          title="Select date"
          format={calendarSettings.dateDisplay}
          mode="date"
          initialDate={new Date()}
          action={action}
        />
        <HeaderCalendarRight navigation={props.navigation} />
      </>
    </HeaderLayout>
  );
}

export default HeaderNavCalendar;
