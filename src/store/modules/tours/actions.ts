import { ActionContext } from "vuex";
import { State } from "./state";
import ToursService from "@/api/services/ToursService";

const actions = {
  async fetchTourTypes(context: ActionContext<State, State>) {
    const tourTypes = await ToursService.GetTourTypes();
    context.commit("setTourTypes", tourTypes);
  },
};

export default actions;
