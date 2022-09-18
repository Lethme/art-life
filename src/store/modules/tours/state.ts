import TourType from "@/api/types/TourType";
import CountryType from "@/api/types/CountryType";
import { Price } from "@/components/UI/PricePickerComponent/types";

export interface State {
  tourTypes: TourType[];
  countries: CountryType[];
  price: Price;
}

const state: State = {
  tourTypes: [],
  countries: [],
  price: undefined,
};

export default state;
