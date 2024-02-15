import {MMKV} from "react-native-mmkv";
import {storageKeys} from "../storage/keys";

export const storageInstance = new MMKV({
    id: "user-local-storage",
    encryptionKey: "some-encryption-key",
});

const getString = <T>(key: keyof typeof storageKeys) => {
    const string = storageInstance.getString(key);
    return string ? (JSON.parse(string) as T) : undefined;
};
const getNumber = (key: keyof typeof storageKeys) => {
    return storageInstance.getNumber(key);
};
const set = (key: keyof typeof storageKeys, value: any) => {
    storageInstance.set(key, JSON.stringify(value));
};

export const StorageHelper = {
    set,
    getString,
    getNumber,
    clearAll: () => storageInstance.clearAll(),
};
