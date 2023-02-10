import React, {createContext, useContext, ReactNode, Dispatch} from 'react';
import {calendarInitialState} from '../../app/inintialStates';
import {tCalendarActions, tCalendarState} from '../../app/types';

// Type of context
type tContext = {
  calendarState: tCalendarState;
  calendarDispatch: Dispatch<tCalendarActions>;
};

// Type of props
type tProps = {
  children: ReactNode;
  value: tContext;
};

// Initial state of context
const contextInitialState: tContext = {
  calendarState: calendarInitialState,
  calendarDispatch: () => null,
};

// Create context
const Context = createContext(contextInitialState);

// Context custom hook
function useAppContext() {
  return useContext(Context);
}

// Context provider
function ContextProvider(props: tProps) {
  return (
    <Context.Provider value={props.value}>{props.children}</Context.Provider>
  );
}

export {ContextProvider, useAppContext};
