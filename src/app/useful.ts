import {Platform, NativeModules} from 'react-native';
import {tKeyValueObject} from './types';
import moment from 'moment';

// return the locale language of device
export const getDeviceLocale = (): string => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;
};

// create formatted date string
export const formatDate = (format: string, date: string | Date): string => {
  const d: Date = typeof date === 'string' ? new Date(date) : date;
  return moment(d).format(format);
};

// alphabet reordering
export const alphabetReorder = (
  array: tKeyValueObject[],
  key: string,
  ascend: boolean = true,
) => {
  const sorting = (a: tKeyValueObject, b: tKeyValueObject) =>
    a[key].localeCompare(b[key], undefined, {sensitivity: 'accent'});
  return ascend
    ? array.sort((a, b) => sorting(a, b))
    : array.sort((a, b) => sorting(b, a));
};
