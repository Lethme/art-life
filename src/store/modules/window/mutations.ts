import state, { State } from "./state";
import WindowSize from "@/store/modules/window/types/WindowSize";

const mutations = {
  setWindowSize(state: State, payload: WindowSize) {
    state.windowSize = payload;
  },
};

export default mutations;
