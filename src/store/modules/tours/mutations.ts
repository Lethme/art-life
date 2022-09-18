import state, { State } from "./state";
import TourType from "@/api/types/TourType";
import CountryType from "@/api/types/CountryType";
import { Price } from "@/components/UI/PricePickerComponent/types";

const mutations = {
  setTourTypes(state: State, payload: TourType[]) {
    state.tourTypes = payload;
  },
  setCountries(state: State, payload: CountryType[]) {
    state.countries = payload;
  },
  setPrice(state: State, payload: Price) {
    state.price = payload;
  },
};

export default mutations;
