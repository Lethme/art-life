import { ActionContext } from "vuex";
import { State } from "./state";
import ToursService from "@/api/services/ToursService";

const actions = {
  async fetchTourTypes(context: ActionContext<State, State>) {
    const tourTypes = await ToursService.GetTourTypes();
    await context.commit("setTourTypes", tourTypes);
  },
  async fetchCountries(context: ActionContext<State, State>) {
    const countries = await ToursService.GetCountries();
    await context.commit("setCountries", countries);
  },
};

export default actions;
