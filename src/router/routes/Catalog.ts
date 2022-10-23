import { BreadcrumbModel, FinderModel } from "@/router/model";
import FilterQuery from "@/api/types/FilterQuery";

const initial: Array<BreadcrumbModel> = [
  { label: "Главная", name: "home" },
  { label: "Каталог туров", name: "catalog" },
];

const finders: FinderModel = {
  name: "catalog",
  params: [],
  query: [],
};

export const Catalog = {
  path: "/catalog",
  name: "catalog",
  component: () => import("@/views/CatalogView.vue"),
  meta: {
    breadcrumb: {
      initialState: initial,
      finders,
    },
  },
};
