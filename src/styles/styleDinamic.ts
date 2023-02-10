import {eventImportance} from '../app/inintialStates';

// generating dinamic style for importance coloring
export const styleImportance = (importance: string) => ({
  backgroundColor: eventImportance[importance]
    ? eventImportance[importance]
    : '#ffffff',
});

// generating dinamic style for position in calendar
export const styleCalendarElementPosition = (
  top: number,
  left: number | string = 0,
) => ({
  top: top,
  left: left,
});

// generating dinamic style for dimensions of an element
export const styleCalendarElementDimensions = (
  width: number | string,
  height: number | string,
) => ({
  width: width,
  height: height,
});
