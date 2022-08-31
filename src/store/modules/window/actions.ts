import { ActionContext } from "vuex";
import { State } from "./state";

const actions = {
  async setWindowWidth(context: ActionContext<State, any>) {
    await context.commit("setWindowWidth", window.innerWidth);
  },
  async setWindowHeight(context: ActionContext<State, any>) {
    await context.commit("setWindowHeight", window.innerHeight);
  },
};

export default actions;
