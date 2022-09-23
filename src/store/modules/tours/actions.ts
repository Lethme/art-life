import { ActionContext } from "vuex";
import { State } from "./state";
import ToursService from "@/api/services/ToursService";
import EventEmitter from "@/api/utils/EventEmitter/EventEmitter";
import Events from "@/api/utils/EventEmitter/types/Events";

const actions = {
  async fetchPrice(context: ActionContext<State, State>) {
    EventEmitter.Emit(Events.PriceRangeFetching);
    await context.commit("setPrice", undefined);
    const priceRange = await ToursService.GetPriceRange();

    if (!priceRange) {
      return;
    }

    await context.commit("setPrice", priceRange);
    EventEmitter.Emit(Events.PriceRangeFetched);
  },
  async fetchTourTypes(context: ActionContext<State, State>) {
    EventEmitter.Emit(Events.TourTypesFetching);
    await context.commit("setTourTypes", undefined);
    const tourTypes = await ToursService.GetTourTypes();

    if (!tourTypes) {
      return;
    }

    await context.commit("setTourTypes", tourTypes);
    EventEmitter.Emit(Events.TourTypesFetched);
  },
  async fetchCountries(context: ActionContext<State, State>) {
    EventEmitter.Emit(Events.CountriesFetching);
    await context.commit("setCountries", undefined);
    const countries = await ToursService.GetCountries();

    if (!countries) {
      return;
    }

    await context.commit("setCountries", countries);
    EventEmitter.Emit(Events.CountriesFetched);
  },
};

export default actions;
