/* eslint-disable */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import "@/assets/styles/global.less";

momentDurationFormatSetup(moment as any);

const monthsTitles = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

moment.locale("ru");
moment.updateLocale("ru", {
  months: monthsTitles,
});

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .mount("#app");
