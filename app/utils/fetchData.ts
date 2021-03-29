import {store} from "../store/getStore";
import {addLocation, addPlayer} from "../store/reducers/data";

export const fetchData = async () => {
    store.dispatch(addPlayer("Alireza"));
    store.dispatch(addPlayer("Mehdi"));
    store.dispatch(addPlayer("Reza"));
    // store.dispatch(addPlayer("Hadis"));
    // store.dispatch(addPlayer("Elham"));
    // store.dispatch(addPlayer("Masoud"));
    // store.dispatch(addPlayer("Akram"));
    // store.dispatch(addPlayer("Abas"));
    // store.dispatch(addPlayer("Ali"));
    // store.dispatch(addPlayer("Mamad"));
    // store.dispatch(addPlayer("Taghi"));
    // store.dispatch(addPlayer("Naghi"));
    // store.dispatch(addPlayer("Mohsen"));
    // store.dispatch(addPlayer("Hasti"));

    store.dispatch(addLocation("Hospital"));
    store.dispatch(addLocation("Church"));
    store.dispatch(addLocation("Spa"));
};
