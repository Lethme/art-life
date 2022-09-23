import { State } from "./state";

const getters = {
  tourTypes(state: State) {
    return state.tourTypes;
  },
  countries(state: State) {
    return state.countries;
  },
  price(state: State) {
    return state.price;
  },
};

export default getters;
