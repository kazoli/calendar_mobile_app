import AsyncStorage from '@react-native-async-storage/async-storage';

// ~ 5 mbytes is the maximum size of local storage values
export const storageMaxLengthExceeded = (value: object) =>
  JSON.stringify(value).length > 5000000;

// delete a local storage by key
export const deleteStorage = (storageKey: string) =>
  AsyncStorage.removeItem(storageKey);

// store data into local storage
export const setStorageData = async (storageKey: string, value: object) => {
  const stringifiedValue = JSON.stringify(value);
  try {
    return await AsyncStorage.setItem(storageKey, stringifiedValue);
  } catch (e) {
    console.error(e);
    return false;
  }
};

// get data from local storage
export const getStorageData = async (storageKey: string) => {
  let data: null | string | object;
  try {
    data = await AsyncStorage.getItem(storageKey);
  } catch (e) {
    console.error(e);
    data = null;
  }
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      if (typeof parsedData === 'object' && parsedData !== null) {
        data = parsedData;
      }
    } catch (e) {
      console.error(e);
    }
  }
  return data;
};
