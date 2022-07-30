<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__body">
        <div class="footer__left">
          <router-link to="/" class="footer__logo">
            <picture>
              <source
                :data-srcset="assets.images.webp.logo"
                :srcset="assets.images.webp.logo"
                type="image/webp"
              />
              <img
                :src="assets.images.png.logo"
                :data-src="assets.images.png.logo"
                alt=""
              />
            </picture>
          </router-link>

          <art-life-action-button
            data-da=".footer__right,768,first"
            type="log"
            image="user-icon"
          >
            Войти
          </art-life-action-button>
        </div>

        <div class="footer__right">
          <p class="footer__text" data-da=".footer__left,768,2">
            ИП Чурганов Сергей Игоревич <br />
            ИНН: 781712956101 <br />
            ОГРНИП: 318784700032544
          </p>

          <div class="social">
            <p>Подпишись на нас</p>
            <div class="social__items">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                class="social__item"
              >
                <img :src="assets.images.svg.telegram" alt="" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                class="social__item"
              >
                <img :src="assets.images.svg.whatsapp" alt="" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                class="social__item"
              >
                <img :src="assets.images.svg.instagram" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p>
        2022 © ООО «Арт Истейт». <br />
        Экспертное агентство по продаже недвижимости.
      </p>
      <router-link to="/">Конфиденциальность</router-link>
      <p>Website designed by Morsel Web Studio</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import footerLogoWebp from "@/assets/img/footer-logo.webp";
import footerLogoPng from "@/assets/img/footer-logo.png";
import whatsappSvg from "@/assets/img/icons/whatsapp.svg";
import telegramSvg from "@/assets/img/icons/telegram.svg";
import instagramSvg from "@/assets/img/icons/insta.svg";
import ArtLifeActionButton from "@/components/UI/ActionButtonComponent";

export default defineComponent({
  name: "ArtLifeFooter",
  components: { ArtLifeActionButton },
  data() {
    return {
      assets: {
        images: {
          webp: {
            logo: footerLogoWebp,
          },
          png: {
            logo: footerLogoPng,
          },
          svg: {
            whatsapp: whatsappSvg,
            telegram: telegramSvg,
            instagram: instagramSvg,
          },
        },
      },
    };
  },
});
</script>

<style lang="less">
@import "FooterComponent";
</style>
