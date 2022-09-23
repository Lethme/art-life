import { TourTypePickerState } from "@/components/UI/TourTypePickerComponent/types";
import { RegionPickerState } from "@/components/UI/RegionPickerComponent/types";
import CountryType from "@/api/types/CountryType";
import { PricePickerState } from "@/components/UI/PricePickerComponent/types";
import { FilterDaterangeState } from "@/components/UI/FilterDaterangeComponent/types";
import { FilterSortState } from "@/components/UI/FilterSortComponent/types";

export interface State {
  selectedTourTypes: TourTypePickerState;
  country: CountryType;
  priceRange: PricePickerState;
  comfort: number;
  activity: number;
  datesRange: FilterDaterangeState;
  sortingTypes: FilterSortState;
}

export type FilterState = State;

const state: State = {
  selectedTourTypes: [],
  country: null,
  priceRange: null,
  comfort: 0,
  activity: 0,
  datesRange: null,
  sortingTypes: [],
};

export default state;
