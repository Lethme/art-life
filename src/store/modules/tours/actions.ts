import { ActionContext } from "vuex";
import { State } from "./state";
import ToursService from "@/api/services/ToursService";

const actions = {
  async fetchTourTypes(context: ActionContext<State, State>) {
    const tourTypes = await ToursService.GetTourTypes();
    if (!tourTypes) return false;
    await context.commit("setTourTypes", tourTypes);
    return true;
  },
  async fetchCountries(context: ActionContext<State, State>) {
    const countries = await ToursService.GetCountries();
    if (!countries) return false;
    await context.commit("setCountries", countries);
    return true;
  },
};

export default actions;
