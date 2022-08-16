import { State } from "./state";

const getters = {
  tourTypes(state: State) {
    return state.tourTypes;
  },
  countries(state: State) {
    return state.countries;
  },
};

export default getters;
