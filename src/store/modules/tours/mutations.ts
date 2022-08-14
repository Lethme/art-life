import state, { State } from "./state";
import TourType from "@/api/types/TourType";

const mutations = {
  setTourTypes(state: State, payload: TourType[]) {
    state.tourTypes = payload;
  },
};

export default mutations;
