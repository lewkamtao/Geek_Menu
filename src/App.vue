<style scoped lang="scss">
.wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--bgColor);
  padding: 120px 50px 50px 50px;
  box-sizing: border-box;
}
.set-btn {
  position: fixed;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bgColor);
  right: 30px;
  top: 30px;
  transition: all 0.2s ease-out;
  cursor: pointer;
  box-shadow: var(--xntshadow);
}
.set-btn:hover {
  box-shadow: var(--xnthovershadow);
}
.set-btn:active {
  transform: translateY(2px);
}

.container {
  max-width: 1200px;
  min-width: 800px;

  .group {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 50px;
    justify-content: flex-start;

    .title {
      width: 100%;
      font-size: 22px;
      font-weight: bold;
      color: val(--color);
      margin: 20px 0px 0px 20px;
    }

    .box {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      align-content: center;
      width: 100px;
      height: 140px;
      margin: 20px;
      .img {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 100px;
        height: 100px;
        box-shadow: var(--xntshadow);
        border-radius: 20px;
        background-color: var(--bgColor);
        transition: all 0.2s ease-out;
        position: relative;
        img {
          width: 60px;
          transition: width 0.2s ease-out;
        }
      }
      .name {
        color: val(--color) !important;
      }

      .img:hover {
        box-shadow: var(--xnthovershadow);
        transition: all 0.2s ease-out;
        img {
          width: 58px;
          transition: width 0.2s ease-out;
        }
      }
      .img:active {
        transform: translateY(2px);
        img {
          width: 55px;
          transition: width 0.2s ease-out;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import "./assets/style/main.scss";
import { ref, onMounted } from "vue";
import Edit from "./components/Edit.vue";
import axios from "axios";
import config from "../config.json";

onMounted(() => {
  getMenuList();
});

const menuData = ref({} as any);
const isEdit = ref(false);

const getMenuList = () => {
  axios.get(`${config.baseUrl}/menu/list`).then((res) => {
    menuData.value = res.data.data;
  });
};
</script>

<template>
  <div class="wrapper">
    <div v-if="menuData.menu" class="container">
      <div
        v-for="(group, index) in menuData.menu"
        :key="'g' + index"
        class="group"
      >
        <div class="title">
          {{ group.title }}
        </div>
        <div
          :key="'i' + index"
          v-for="(item, index) in group.siteGroup"
          class="box"
        >
          <a :href="item.site_url" target="_blank">
            <div class="img">
              <img :src="item.icon" />
            </div>
          </a>
          <div class="name">{{ item.name || "未命名" }}</div>
        </div>
      </div>
    </div>
    <div @click="isEdit = !isEdit" class="set-btn">
      <svg
        v-if="!isEdit"
        xmlns="http://www.w3.org/2000/svg"
        width="32px"
        height="32px"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-settings"
      >
        <circle cx="12" cy="12" r="3"></circle>
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
        ></path></svg
      ><svg
        v-if="isEdit"
        width="42px"
        height="42px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"
        ></path>
      </svg>
    </div>
    <Edit v-if="isEdit" :menu-data="menuData"></Edit>
  </div>
</template>
