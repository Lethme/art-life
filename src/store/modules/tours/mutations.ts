import state, { State } from "./state";
import TourType from "@/api/types/TourType";
import CountryType from "@/api/types/CountryType";

const mutations = {
  setTourTypes(state: State, payload: TourType[]) {
    state.tourTypes = payload;
  },
  setCountries(state: State, payload: CountryType[]) {
    state.countries = payload;
  },
};

export default mutations;
