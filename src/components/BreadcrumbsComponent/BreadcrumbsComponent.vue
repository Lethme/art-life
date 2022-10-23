<template>
  <div class="section__container px-3">
    <div class="section__breadcrumbs px-3">
      <!-- Using finders - approach 1 -->
      <ol class="breadcrumbs d-flex flex-row list-unstyled">
        <li
          :key="item.name"
          v-for="(item, index) in breadcrumbs"
          :class="`breadcrumbs__item${
            index === breadcrumbs.length - 1 ? ' breadcrumbs__item-current' : ''
          }`"
          @click="index < breadcrumbs.length - 1 ? goTo(item) : null"
        >
          {{ getBreadcrumb(item.name) }}
          {{ index < breadcrumbs.length - 1 ? "&#65125;" : "" }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FinderModel } from "@/router/model";
import { RouteLocationRaw } from "vue-router";

export default defineComponent({
  name: "ArtLifeBreadcrumbs",
  computed: {
    breadcrumbs() {
      const breadcrumbFromRoute = this.$route.meta?.breadcrumb;
      if (!breadcrumbFromRoute) return;

      const { finders, initialState } = breadcrumbFromRoute;

      const breadcrumb = finders?.length
        ? (finders.map((finder: FinderModel) => {
            //finders array added at router config
            const { query } = this.$route;
            const getLastLabel = finder.query[finder.query.length - 1];
            return {
              name: finder.name, //(e.g. PetType)
              label: query[getLastLabel],
              ...this.createParamsAndQuery(finder),
            };
          }) as FinderModel[])
        : new Array<FinderModel>();

      breadcrumb.unshift(...initialState);
      return breadcrumb;
    },
  },
  methods: {
    getBreadcrumb(name: string) {
      const breadcrumbFromRoute = this.$route.meta?.breadcrumb;
      if (!breadcrumbFromRoute) return undefined;

      const { initialState } = breadcrumbFromRoute;

      return initialState.find((crumb) => crumb.name === name)?.label;
    },
    goTo(item: RouteLocationRaw) {
      this.$router.push(item);
    },
    //  Using finders - approach 1
    createParamsAndQuery(finder: FinderModel) {
      const { params, query } = this.$route;
      const paramsMapped = finder.params.map((paramsString) => {
        //(e.g. 'typeId')
        return { [paramsString]: params[paramsString] }; //{typeId: '123' | '456'}
      });
      const queryMapped = finder.query.map((queryString) => {
        //(e.g. 'typeId')
        return { [queryString]: query[queryString] }; //{typeId: 'Dogs' | 'Cats'}
      });
      return {
        params: Object.assign({}, ...paramsMapped), // (e.g. params: {typeId: '123'})
        query: Object.assign({}, ...queryMapped), // (e.g. query: {typeId: 'Dogs'})
      };
    },
  },
});
</script>

<style lang="less">
@import "BreadcrumbsComponent";
</style>
