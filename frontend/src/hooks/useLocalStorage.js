/**
 * This hook is used to store data in local storage.
 * @param {string} key - The key to store the data in local storage.
 * @param {any} initialValue - The initial value to store in local storage.
 * @returns {Array} An array containing the stored value and a function to set the stored value.
 */
import { useState, useEffect } from 'react';
import localforage from 'localforage';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const fetchStoredValue = async () => {
      try {
        const item = await localforage.getItem(key);
        if (item !== null) {
          setStoredValue(item);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStoredValue();
  }, [key]);

  const setValue = async (value) => {
    try {
      await localforage.setItem(key, value);
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;