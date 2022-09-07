import state, { State } from "./state";
import TourType from "@/api/types/TourType";
import CountryType from "@/api/types/CountryType";
import { TourTypePickerState } from "@/components/UI/TourTypePickerComponent/types";
import { PricePickerState } from "@/components/UI/PricePickerComponent/types";
import { FilterDaterangeState } from "@/components/UI/FilterDaterangeComponent/types";
import { FilterSortState } from "@/components/UI/FilterSortComponent/types";

const mutations = {
  setSelectedTourTypes(state: State, payload: TourTypePickerState) {
    state.selectedTourTypes = payload;
  },
  setCountry(state: State, payload: CountryType) {
    state.country = payload;
  },
  setPriceRange(state: State, payload: PricePickerState) {
    state.priceRange = payload;
  },
  setComfort(state: State, payload: number) {
    state.comfort = payload;
  },
  setActivity(state: State, payload: number) {
    state.activity = payload;
  },
  setDatesRange(state: State, payload: FilterDaterangeState) {
    state.datesRange = payload;
  },
  setSortingTypes(state: State, payload: FilterSortState) {
    state.sortingTypes = payload;
  },
};

export default mutations;
