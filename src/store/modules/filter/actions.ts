import { ActionContext } from "vuex";
import { State } from "./state";
import { TourTypePickerState } from "@/components/UI/TourTypePickerComponent/types";
import CountryType from "@/api/types/CountryType";
import { PricePickerState } from "@/components/UI/PricePickerComponent/types";
import { FilterDaterangeState } from "@/components/UI/FilterDaterangeComponent/types";
import { FilterSortState } from "@/components/UI/FilterSortComponent/types";

const actions = {
  setSelectedTourTypes(
    context: ActionContext<State, State>,
    payload: TourTypePickerState
  ) {
    context.commit("setSelectedTourTypes", payload);
  },
  setCountry(context: ActionContext<State, State>, payload: CountryType) {
    context.commit("setCountry", payload);
  },
  setPriceRange(
    context: ActionContext<State, State>,
    payload: PricePickerState
  ) {
    context.commit("setPriceRange", payload);
  },
  setComfort(context: ActionContext<State, State>, payload: number) {
    context.commit("setComfort", payload);
  },
  setActivity(context: ActionContext<State, State>, payload: number) {
    context.commit("setActivity", payload);
  },
  setDatesRange(
    context: ActionContext<State, State>,
    payload: FilterDaterangeState
  ) {
    context.commit("setDatesRange", payload);
  },
  setSortingTypes(
    context: ActionContext<State, State>,
    payload: FilterSortState
  ) {
    context.commit("setSortingTypes", payload);
  },
};

export default actions;
