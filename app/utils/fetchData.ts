import {store} from "../store/getStore";
import {addLocation, addPlayer} from "../store/reducers/data";

export const fetchData = async () => {
    store.dispatch(addPlayer("Alireza Hadjar"));
    store.dispatch(addPlayer("Mamad"));
    store.dispatch(addPlayer("Mehdi"));
    store.dispatch(addLocation("Hospital"));
    store.dispatch(addLocation("Church"));
    store.dispatch(addLocation("Spa"));
};
