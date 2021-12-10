<style scoped lang="scss">
.edit-wrapper {
  max-width: 50vw;
  height: auto;
  margin-right: 50px;
  border-radius: 20px;
  padding: 30px;
  background-color: var(--bgColor);
  box-sizing: border-box;
  box-shadow: var(--xntshadow);
  input {
    height: 35px;
    margin-right: 10px;
    border-radius: 4px;
    outline: none;
    border: none;
    padding-left: 10px;
    font-size: 16px;
  }
  .del {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .del:hover {
    transform: scale(1.05);
  }
  .del:active {
    transform: scale(0.95);
  }
  input:focus {
    outline: 2px #000 solid;
  }

  .login {
    width: 300px;
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .item {
      width: 300px;
      margin: 10px 0px;
      input {
        margin-top: 10px;
        width: 100%;
      }
    }
  }
  .btn {
    background: #444;
    color: #fff;
    display: inline-block;
    font-size: 16px;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 12px;
  }
  .btn:hover {
    background: #333;
  }
  .btn:active {
    background: #000;
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
        margin: 20px 0px;
      }

      .box {
        width: 100%;
        display: flex;
        margin-bottom: 15px;

        .siteUrl {
          width: 50%;
        }
        .name {
          width: 25%;
        }
        .icon {
          width: 25%;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import config from "../../config.json";
import axios from "axios";

const form = ref({} as any);
const user = ref({} as any);

const props = defineProps({
  menuData: {
    type: Object,
    default: {},
  },
});

const updated = async () => {
  var token = localStorage.getItem("token");
  if (token) {
    form.value.token = token;
    form.value.updateTime = new Date().getTime();
  }

  var res = await axios.put(`${config.host}:${config.port}/menu`, form.value);
  if (res.data.code == 401) {
    localStorage.clear();
    isLogin.value = false;
  }
  alert(res.data.tips);
};

const add = (i: any) => {
  form.value.menu[i].siteGroup.push({
    name: "",
    icon: "",
    site_url: "",
  });
};
const addGroup = (i: any) => {
  form.value.menu.splice(i + 1, 0, {
    title: "未命名",
    siteGroup: [
      {
        name: "",
        icon: "",
        site_url: "",
      },
    ],
  });
};
const del = (gi: any, si: any) => {
  form.value.menu[gi].siteGroup.splice(si, 1);
};
const delGroup = (gi: any) => {
  form.value.menu.splice(gi, 1);
};
const loginOut = (i: any) => {
  localStorage.clear();
  isLogin.value = false;
};

const login = async () => {
  var res = await axios.post(`${config.host}:${config.port}/login`, user.value);
  if (res.data.code != 200) {
    localStorage.clear();
    isLogin.value = false;
    alert(res.data.tips);
  } else {
    localStorage.setItem("token", res.data.data.token);
    var token = localStorage.getItem("token");
    if (token) {
      isLogin.value = true;
    }
  }
};

const isLogin = ref(false);

onMounted(() => {
  var token = localStorage.getItem("token");
  if (token) {
    isLogin.value = true;
  }
  form.value = props.menuData;
});
</script>

<template>
  <div class="edit-wrapper">
    <div v-if="!isLogin" class="login">
      <div class="item">
        <div>用户名</div>
        <input placeholder="用户名" class="name" v-model="user.username" />
      </div>
      <div class="item">
        <div>密码</div>
        <input
          placeholder="密码"
          class="icon"
          v-model="user.password"
          type="password"
        />
      </div>
      <div class="btn" @click="login" style="margin-top: 10px">登录</div>
    </div>

    <div v-if="form && isLogin" class="container">
      <div
        v-for="(group, gindex) in form.menu"
        :key="'g' + gindex"
        class="group"
      >
        <input v-model="group.title" style="height: 45px" class="title" />
        <div
          :key="'i' + sindex"
          v-for="(item, sindex) in group.siteGroup"
          class="box"
        >
          <input placeholder="名称" class="name" v-model="item.name" />
          <input placeholder="图标" class="icon" v-model="item.icon" />
          <input placeholder="链接" class="siteUrl" v-model="item.site_url" />
          <div @click="del(gindex, sindex)" class="del">
            <svg
              style="color: rgb(204, 0, 0)"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-i6dzq1"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
        </div>
        <div @click="add(gindex)" class="btn">添加站点</div>
        <div @click="addGroup(gindex)" class="btn">添加分组</div>
        <div
          @click="delGroup(gindex)"
          v-if="group.siteGroup.length == 0"
          class="btn"
        >
          删除分组
        </div>
        <div @click="updated" class="btn">保存</div>
      </div>
      <div @click="loginOut" class="btn" style="background: #c00">退出登录</div>
    </div>
  </div>
</template>
