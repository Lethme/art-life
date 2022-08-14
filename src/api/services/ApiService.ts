class ApiService {
  static get ApiHost(): string {
    return process.env.VUE_APP_API_HOST || "localhost:8080";
  }
  static get ApiRoutePrefix(): string[] | undefined {
    if (process.env.VUE_APP_API_ROUTE_PREFIX) {
      return process.env.VUE_APP_API_ROUTE_PREFIX.split("/").filter(
        (pref) => pref
      );
    }

    return undefined;
  }
  static CreateRequest(route = "", query?: object) {
    let reqUrl = `//${this.ApiHost}/`;

    if (this.ApiRoutePrefix) {
      reqUrl += `${this.ApiRoutePrefix.join("/")}/`;
    }

    reqUrl += route;

    if (query) {
      const keys = Object.keys(query);
      const values = Object.values(query);

      const queryLine = keys
        .map((key, index) => {
          return `${!index ? "?" : ""}${key}=${values[index]}`;
        })
        .join("&");

      if (queryLine) {
        reqUrl += queryLine;
      }
    }

    return reqUrl;
  }
}

export default ApiService;
