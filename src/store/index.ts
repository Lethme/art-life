import { createStore } from "vuex";
import tours from "@/store/modules/tours";
import window from "@/store/modules/window";

export default createStore({
  modules: {
    tours,
    window,
  },
});
