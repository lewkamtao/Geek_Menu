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
.nav {
  width: 140px;
  min-height: 100px;
  margin-right: 25px;
  box-shadow: var(--xnthovershadow);
  border-radius: 10px;
  padding: 7px;
  box-sizing: border-box;
  .box {
    padding: 10px 0px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    color: #999;
    transition: all 0.5s;
  }
  .active {
    background: #fff !important;
    color: #000;
  }
  .box:hover {
    color: #000;
  }
}

.container {
  width: 1100px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  margin-top: -20px;
  .title {
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    color: val(--color);
    margin: 20px 0px 0px 20px;
  }
  .sub-nav {
    padding: 7px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 20px 0px 0px 10px;
    box-sizing: border-box;

    .box {
      padding: 10px;
      border-radius: 6px;
      cursor: pointer;
      text-align: center;
      color: #999;
      transition: all 0.5s;
    }
    .box:hover {
      background: #fff;
      box-shadow: var(--xnthovershadow);
      color: #000;
    }
    .active {
      color: #000;
      background: #fff;
    }
  }
  .more-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    .loading-more {
      box-shadow: var(--xnthovershadow);
      padding: 10px 30px;
      margin-right: 30px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .menu-list {
    display: flex;
    flex-wrap: wrap;
    .box {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      align-content: center;
      width: 80px;
      height: 120px;
      margin: 20px;
      .img {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 80px;
        height: 80px;
        box-shadow: var(--xntshadow);
        border-radius: 17px;
        background-color: var(--bgColor);
        transition: all 0.2s ease-out;
        position: relative;
        img {
          width: 45px;
          transition: width 0.2s ease-out;
        }
      }
      .name {
        opacity: 0.7;
        color: val(--color);
        white-space: nowrap;
        width: 100px;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
      }

      .img:hover {
        box-shadow: var(--xnthovershadow);
        transition: all 0.2s ease-out;
        img {
          width: 40px;
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
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

<script setup lang="ts">
import "../assets/style/main.scss";
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import config from "../../config.json";

onMounted(() => {
  getMenuList("new");
  getSubMenuList();
});

const menuList = ref([] as any);
const subMenuList = ref({} as any);
const isMore = ref(false);

const nav = ref([
  {
    name: "全部",
    cid: "find",
  },
  {
    name: "生活",
    cid: "306",
  },
  {
    name: "视频",
    cid: "307",
  },
  {
    name: "新闻",
    cid: "309",
  },
  {
    name: "学习",
    cid: "310",
  },
  {
    name: "设计",
    cid: "312",
  },
  {
    name: "运营",
    cid: "319",
  },
  {
    name: "工具",
    cid: "320",
  },
  {
    name: "开发者",
    cid: "321",
  },
  {
    name: "政府",
    cid: "337",
  },
  {
    name: "资源",
    cid: "343",
  },
  {
    name: "办公",
    cid: "345",
  },
  {
    name: "导航",
    cid: "347",
  },
  {
    name: "爱好",
    cid: "349",
  },
]);

const isEdit = ref(false);
const page = ref(1);
const n_cid = ref("find");
const n_sub = ref("");
const isLoading = ref(false);

watch(n_cid, () => {
  getMenuList("new");
  n_sub.value = "";
  getSubMenuList();
});
watch(n_sub, () => {
  if (n_sub.value) {
    getMenuList("new");
  }
});
const getMenuList = (type: any) => {
  if (type == "new") {
    menuList.value = [];
  }
  if (type == "more") {
    page.value += 1;
  }
  isLoading.value = true;
  axios
    .get(
      `/bd/cool/list?page=${page.value}&tags=&sort=sort-hot&cid=${
        n_cid.value || "find"
      }&wd=&sub=${n_sub.value || ""}`
    )
    .then((res) => {
      isLoading.value = false;
      menuList.value = menuList.value.concat(res.data.list);
      if (res.data.list.length < res.data.size) {
        isMore.value = false;
      } else {
        isMore.value = true;
      }
    });
};
const getSubMenuList = () => {
  axios
    .get(
      `/bd/cool/sub-menu?page=1&tags=&sort=sort-hot&pid=${
        n_cid.value || "find"
      }&wd=`
    )
    .then((res) => {
      subMenuList.value = res.data.list;
    });
};
</script>

<template>
  <div class="wrapper">
    <div class="nav">
      <div
        v-for="(item, index) in nav"
        :key="'n' + index"
        class="box"
        :class="{ active: n_cid == item.cid }"
        @click="n_cid = item.cid"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="container">
      <div class="sub-nav">
        <div
          v-for="(item, index) in subMenuList"
          :key="'n' + index"
          class="box"
          :class="{ active: n_sub == item.cid }"
          @click="n_sub = item.cid"
        >
          {{ item.name }}
        </div>
      </div>
      <transition-group name="list" tag="p" class="menu-list">
        <div :key="'i' + index" v-for="(item, index) in menuList" class="box">
          <a :href="item.url" target="_blank">
            <div class="img">
              <img :src="'https://img.bidianer.com/' + item.originIcon" />
            </div>
          </a>
          <div class="name">{{ item.name || "未命名" }}</div>
        </div>
        <div class="more-box">
          <div v-if="isMore" class="loading-more" @click="getMenuList('more')">
            {{ isLoading ? "加载中···" : "加载更多" }}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
