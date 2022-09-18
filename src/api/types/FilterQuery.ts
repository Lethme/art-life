import PaginationFilterQuery from "@/api/types/PaginationFilterQuery";

interface FilterQuery extends PaginationFilterQuery {
  "filter[country]"?: string;
  "filter[region]"?: string;
  "filter[comfort_level]"?: number;
  "filter[activity_level]"?: number;
  "filter[type]"?: string | Array<string>;
  "filter[price]": string | Array<string | number>;
  "filter[date]": string | Array<string>;
  sort?: string | Array<string>;
}

export default FilterQuery;
