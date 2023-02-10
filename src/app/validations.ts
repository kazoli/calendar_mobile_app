import {eventErrorsInitialState} from './inintialStates';
import {tEvent} from './types';

export const validateEditEvent = (data: tEvent) => {
  const errors = {...eventErrorsInitialState};

  // [] provides that special characters worth only 1 in length
  if ([...data.title].length > 100) {
    errors.title = 'Maximum 100 characters can be entered';
  }

  // check out end date is later than start date
  if (data.start > data.end) {
    errors.start = 'Start date needs to be sooner than end date';
    errors.end = 'End date needs to be later than start date';
  }

  return errors;
};
