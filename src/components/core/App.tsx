import React, {useReducer} from 'react';
import {calendarReducer} from '../../app/reducers';
import {calendarInitialState} from '../../app/inintialStates';
import {ContextProvider} from './Context';
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
