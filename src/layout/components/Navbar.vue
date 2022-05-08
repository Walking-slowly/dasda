<template>
  <div
    class="navbar rowBC reset-el-dropdown"
    :style="{
      backgroundColor: scssJson[`${theme}-menuBg`],
      color: scssJson[`${theme}-menuText`]
    }"
  >
    <div class="rowSC">
      
      <svg-icon icon-class="theme" class="cursor" style="font-size: 15px; margin: 0 11px 0 20px;" @click="toggleSideBar"/>

      <breadcrumb class="breadcrumb-container"/>
    </div>
    <!--nav title-->
    <div v-if="settings.showNavbarTitle" class="heardCenterTitle">{{ settings.showNavbarTitle }}</div>
    <div v-if="settings.ShowDropDown" class="right-menu rowSC">

      <el-select placeholder="请选择" class="mr-3"/>

      <ScreenFull />
      <svg-icon
        icon-class="theme"
        class="nav-svg-icon"
        style="margin: -1px 15px 0 15px"
        @click="toggleTheme(theme === 'dark' ? 'bright' : 'dark')"
      />
      <el-dropdown size="medium">
        <div class="avatar-wrapper">
          <img
            src=""
            class="user-avatar"
          />
          <span :style="{color: scssJson[`${theme}-menuText`]}">测试测试</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import ScreenFull from '@/components/ScreenFull/index.vue'
import scssExportJson from '@/styles/variables-to-js.scss'
import { dillScssExportToJson } from '@/utils/validate'

import { ElMessage } from 'element-plus'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'

import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

const scssJson = dillScssExportToJson(scssExportJson)

const settings = computed(() => {
  return appStore.settings
})
const opened = computed(() => {
  return appStore.sidebar.opened
})

const theme = computed(() => {
  return appStore.theme
})

const appStore = useAppStore()
const toggleSideBar = () => {
  appStore.M_toggleSideBar()
}
/*
 * 退出登录
 * */
const router = useRouter()
const route = useRoute()

const toggleTheme = (value) => {
  appStore.M_theme(value)
}

const loginOut = () => {
  const userStore = useUserStore()
  userStore.logout().then(() => {
    ElMessage({ message: '退出登录成功', type: 'success' })
    router.push(`/login?redirect=/`)
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

//logo
.avatar-wrapper {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;

  .user-avatar {
    cursor: pointer;
    width: 36px;
    height: 36px;
    margin-right: 5px;
    border-radius: 50%;
    overflow: hidden;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  cursor: pointer;
  margin-right: 15px;
}
</style>
