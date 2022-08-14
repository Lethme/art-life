import { Currency } from "@/components/UI/PricePickerComponent/types";
import { ProductCard } from "@/components/ProductCardComponent/types";
import { getCurrencySign } from "@/components/UI/PricePickerComponent/types/Currency";
import moment from "moment";
import { formatDateTour } from "@/api/utils/formatDateTour";

interface Tour {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly start_date: string;
  readonly end_date: string;
  readonly price: number;
  readonly currency: Currency;
}

export const getProductCardFromTour = (tour: Tour): ProductCard => {
  return {
    imageSource: "charter/01",
    title: tour.name,
    description: tour.description,
    dates: `${formatDateTour(tour.start_date)} - 
            ${formatDateTour(tour.end_date)}`,
    price: `${tour.price}${getCurrencySign(tour.currency)}`,
    linkUrl: "/test",
  };
};

export default Tour;
