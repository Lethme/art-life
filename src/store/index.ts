import { createStore } from "vuex";
import tours from "@/store/modules/tours";
import window from "@/store/modules/window";
import filter from "@/store/modules/filter";

export default createStore({
  modules: {
    tours,
    window,
    filter,
  },
});
