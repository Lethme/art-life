<template>
  <header class="header header-home">
    <div class="header__body">
      <router-link to="/" class="header__logo">
        <picture>
          <source :srcset="assets.images.webp.logo" type="image/webp" />
          <img :src="assets.images.png.logo" alt="Логотип" />
        </picture>
      </router-link>

      <div class="header__action action">
        <button type="button" class="action__button action__button-reg">
          Зарегистрироваться
        </button>
        <button type="button" class="action__button action__button-log">
          Войти
          <i class="action__button-icon">
            <picture>
              <source :srcset="assets.images.webp.userIcon" type="image/webp" />
              <img :src="assets.images.png.userIcon" alt="" />
            </picture>
          </i>
        </button>
      </div>

      <div class="header__menu menu">
        <nav class="menu__body">
          <ul class="menu__list">
            <li class="menu__item"><a href="" class="menu__link">Туры</a></li>
            <li class="menu__item">
              <a href="" class="menu__link menu__link-active">Аренда яхт</a>
            </li>
            <li class="menu__item"><a href="" class="menu__link">Отели</a></li>
          </ul>

          <div class="menu__social social">
            <p>Подпишись на нас</p>
            <div class="social__items">
              <a href="" class="social__item">
                <svg width="46" height="42" aria-hidden="true">
                  <use xlink:href="#telegram"></use>
                </svg>
              </a>
              <a href="" class="social__item">
                <svg width="41" height="42" aria-hidden="true">
                  <use xlink:href="#whatsapp"></use>
                </svg>
              </a>
              <a href="" class="social__item">
                <svg width="42" height="42" aria-hidden="true">
                  <use xlink:href="#insta"></use>
                </svg>
              </a>
            </div>
          </div>
        </nav>
        <button type="button" class="menu__icon icon-menu">
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logoWebp from "@/assets/img/logo.webp";
import logoPng from "@/assets/img/logo.png";
import userIconWebp from "@/assets/img/icons/user-icon.webp";
import userIconPng from "@/assets/img/icons/user-icon.png";

export default defineComponent({
  name: "ArtLifeHeader",
  data() {
    return {
      assets: {
        images: {
          webp: {
            logo: logoWebp,
            userIcon: userIconWebp,
          },
          png: {
            logo: logoPng,
            userIcon: userIconPng,
          },
        },
      },
    };
  },
});
</script>

<style lang="less">
@import "HeaderComponent";
</style>
