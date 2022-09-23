import TourType from "@/api/types/TourType";
import axios from "axios";
import ApiService from "@/api/services/ApiService";
import PaginationFilterQuery from "@/api/types/PaginationFilterQuery";
import Tour from "@/api/types/Tour";
import CountryType from "@/api/types/CountryType";
import { ApiResponse } from "@/api/services/types";
import FilterQuery from "@/api/types/FilterQuery";
import { Price } from "@/components/UI/PricePickerComponent/types";
import GetToursResponse from "@/api/types/GetToursResponse";
import ToursMeta from "@/api/types/ToursMeta";
import ToursLinks from "@/api/types/ToursLinks";

class ToursService extends ApiService {
  static get Path(): string {
    return "tours";
  }

  static async GetPriceRange(): Promise<Price | undefined> {
    const url = this.CreateApiRequestUrl({
      path: [this.Path, "price-range"],
    });

    return await this.Try<Price>(async () => {
      const response = await axios.get<Price>(url.Url);
      return response.data;
    });
  }
  static async GetTourTypes(): Promise<Array<TourType> | undefined> {
    const url = this.CreateApiRequestUrl({
      path: [this.Path, "types"],
    });

    return await this.Try<Array<TourType>>(async () => {
      const response = await axios.get<ApiResponse<Array<TourType>>>(url.Url);
      return response.data.data;
    });
  }
  static async GetToursByTypeName(
    name: string,
    query?: PaginationFilterQuery
  ): Promise<Array<Tour> | undefined> {
    const url = this.CreateApiRequestUrl({
      path: this.Path,
      query: {
        ...query,
        "filter[type]": name,
      },
    });

    return await this.Try<Array<Tour>>(async () => {
      const response = await axios.get<ApiResponse<Array<Tour>>>(url.Url);
      return response.data.data;
    });
  }
  static async GetTours(
    query?: FilterQuery
  ): Promise<GetToursResponse | undefined> {
    const url = this.CreateApiRequestUrl({
      path: this.Path,
      query,
    });

    return await this.Try<GetToursResponse>(async () => {
      const response = await axios.get<
        ApiResponse<Array<Tour>, ToursMeta, ToursLinks>
      >(url.Url);
      return response.data;
    });
  }
  static async GetCountries(): Promise<Array<CountryType> | undefined> {
    const url = this.CreateApiRequestUrl({
      path: [this.Path, "countries"],
    });

    return await this.Try<Array<CountryType>>(async () => {
      const response = await axios.get<ApiResponse<Array<CountryType>>>(
        url.Url
      );
      return response.data.data;
    });
  }
}

export default ToursService;
