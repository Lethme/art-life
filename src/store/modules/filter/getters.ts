import { State } from "./state";
import FilterQuery from "@/api/types/FilterQuery";

const getters = {
  filterState(state: State): State {
    return state;
  },
  filterQuery(state: State): FilterQuery {
    const queryParams = {
      "filter[activity_level]": state.activity || undefined,
      "filter[comfort_level]": state.comfort || undefined,
      "filter[country]": state.country?.name || undefined,
      "filter[date]":
        [
          state.datesRange?.from?.toISOString().split("T")[0],
          state.datesRange?.to?.toISOString().split("T")[0],
        ]
          .filter((date) => date)
          .join(",") || undefined,
      "filter[price]":
        [state.priceRange?.price?.min, state.priceRange?.price?.max]
          .filter((price) => price)
          .join(",") || undefined,
      "filter[type]":
        state.selectedTourTypes?.map((type) => type.name).join(",") ||
        undefined,
      sort: state.sortingTypes?.map((type) => type.type).join(",") || undefined,
    };

    return queryParams;
  },
};

export default getters;
