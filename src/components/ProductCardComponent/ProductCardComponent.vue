<template>
  <div :class="`product__item${swiperSlide ? ' swiper-slide' : ''}`">
    <div class="product__item-img">
      <picture>
        <source
          :srcset="require(`@/assets/img/${imageSource}.webp`)"
          type="image/webp"
        />
        <img :src="require(`@/assets/img/${imageSource}.webp`)" alt="" />
      </picture>
    </div>

    <div class="product__item-body">
      <h4 class="product__item-title">{{ title }}</h4>
      <p class="product__item-desc">
        {{ description }}
      </p>
      <div class="product__item-bottom">
        <time class="product__item-time">
          <i>
            <svg width="21" height="18" aria-hidden="true">
              <path
                d="M6.75 8.47114V9.52884C6.75 9.82116 6.47047 10.0577 6.125 10.0577H4.875C4.52953 10.0577 4.25 9.82116 4.25 9.52884V8.47114C4.25 8.17882 4.52953 7.9423 4.875 7.9423H6.125C6.47047 7.9423 6.75 8.17882 6.75 8.47114ZM6.125 12.1731H4.875C4.52953 12.1731 4.25 12.4096 4.25 12.7019V13.7596C4.25 14.0519 4.52953 14.2885 4.875 14.2885H6.125C6.47047 14.2885 6.75 14.0519 6.75 13.7596V12.7019C6.75 12.4096 6.47047 12.1731 6.125 12.1731ZM11.125 7.9423H9.875C9.52953 7.9423 9.25 8.17882 9.25 8.47114V9.52884C9.25 9.82116 9.52953 10.0577 9.875 10.0577H11.125C11.4705 10.0577 11.75 9.82116 11.75 9.52884V8.47114C11.75 8.17882 11.4705 7.9423 11.125 7.9423ZM11.125 12.1731H9.875C9.52953 12.1731 9.25 12.4096 9.25 12.7019V13.7596C9.25 14.0519 9.52953 14.2885 9.875 14.2885H11.125C11.4705 14.2885 11.75 14.0519 11.75 13.7596V12.7019C11.75 12.4096 11.4705 12.1731 11.125 12.1731ZM16.125 7.9423H14.875C14.5295 7.9423 14.25 8.17882 14.25 8.47114V9.52884C14.25 9.82116 14.5295 10.0577 14.875 10.0577H16.125C16.4705 10.0577 16.75 9.82116 16.75 9.52884V8.47114C16.75 8.17882 16.4705 7.9423 16.125 7.9423ZM16.125 12.1731H14.875C14.5295 12.1731 14.25 12.4096 14.25 12.7019V13.7596C14.25 14.0519 14.5295 14.2885 14.875 14.2885H16.125C16.4705 14.2885 16.75 14.0519 16.75 13.7596V12.7019C16.75 12.4096 16.4705 12.1731 16.125 12.1731ZM4.875 3.71153H6.125C6.47047 3.71153 6.75 3.475 6.75 3.18268V1.0673C6.75 0.774979 6.47047 0.538452 6.125 0.538452H4.875C4.52953 0.538452 4.25 0.774979 4.25 1.0673V3.18268C4.25 3.475 4.52953 3.71153 4.875 3.71153ZM20.5 4.76922V15.3461C20.5 16.5144 19.3806 17.4615 18 17.4615H3C1.61937 17.4615 0.5 16.5144 0.5 15.3461V4.76922C0.5 3.601 1.61937 2.65384 3 2.65384H3.625V3.18268C3.625 3.76524 4.1859 4.24038 4.875 4.24038H6.125C6.8141 4.24038 7.375 3.76524 7.375 3.18268V2.65384H13.625V3.18268C13.625 3.76524 14.1865 4.24038 14.875 4.24038H16.125C16.8135 4.24038 17.375 3.76524 17.375 3.18268V2.65384H18C19.3806 2.65384 20.5 3.601 20.5 4.76922ZM19.25 6.88461C19.25 6.30205 18.6897 5.82691 18 5.82691H3C2.3109 5.82691 1.75 6.30205 1.75 6.88461V15.3461C1.75 15.9297 2.3109 16.4038 3 16.4038H18C18.6897 16.4038 19.25 15.9297 19.25 15.3461V6.88461ZM14.875 3.71153H16.125C16.4705 3.71153 16.75 3.475 16.75 3.18268V1.0673C16.75 0.774979 16.4705 0.538452 16.125 0.538452H14.875C14.5295 0.538452 14.25 0.774979 14.25 1.0673V3.18268C14.25 3.475 14.5295 3.71153 14.875 3.71153Z"
                fill="#84CCC9"
              />
            </svg>
          </i>
          {{ dates }}
        </time>
        <div class="product__item-price">{{ price }}</div>
        <div class="product__item-button-wrapper">
          <art-life-product-button>Оставить заявку</art-life-product-button>
          <art-life-product-link :to="linkUrl"></art-life-product-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ArtLifeProductButton from "@/components/UI/ProductButtonComponent";
import ArtLifeProductLink from "@/components/UI/ProductLinkComponent";

export default defineComponent({
  name: "ArtLifeProductCard",
  components: { ArtLifeProductLink, ArtLifeProductButton },
  props: {
    imageSource: {
      required: true,
      type: String as PropType<string>,
    },
    title: {
      required: true,
      type: String as PropType<string>,
    },
    description: {
      required: true,
      type: String as PropType<string>,
    },
    dates: {
      required: true,
      type: String as PropType<string>,
    },
    price: {
      required: true,
      type: String as PropType<string>,
    },
    linkUrl: {
      required: true,
      type: String as PropType<string>,
    },
    swiperSlide: {
      require: false,
      type: Boolean as PropType<boolean>,
      default: () => {
        return true;
      },
    },
  },
});
</script>

<style lang="less">
@import "ProductCardComponent";
</style>
