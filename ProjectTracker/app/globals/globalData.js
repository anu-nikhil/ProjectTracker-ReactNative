import { strings } from "../globals/localisation";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const GLOBAL_DATA = {
    _storeDataInAsyncStorage: async function (key, value) {
        try {
            await AsyncStorage.setItem(
                key,
                value
            );
        } catch (error) {
            // Error saving data
        }
    },
    _retrieveDataFromAsyncStorage: async function (key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // We have data!!
                return value;
            } else
                return null
        } catch (error) {
            // Error retrieving data
        }
    },
    _removeDataFromAsyncStorage: async function (key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            // Error retrieving data
        }
    }
};
