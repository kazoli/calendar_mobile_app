import React, {useReducer} from 'react';
import {ContextProvider} from './Context';
import {calendarReducer} from '../../app/reducers';
import {calendarInitialState} from '../../app/inintialStates';
import Navigation from './Navigation';

function App() {
  const [calendarState, calendarDispatch] = useReducer(
    calendarReducer,
    calendarInitialState,
  );

  return (
    <ContextProvider
      value={{
        calendarState: calendarState,
        calendarDispatch: calendarDispatch,
      }}>
      <Navigation />
    </ContextProvider>
  );
}

export default App;
