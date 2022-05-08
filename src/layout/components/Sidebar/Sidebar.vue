<template>
  <div id="Sidebar" class="reset-menu-style">
    <!--logo-->
    <Logo v-if="settings.sidebarLogo" :collapse="!isCollapse" />
    <!--router nav-->
    <el-scrollbar :style="{ backgroundColor: scssJson[`${theme}-menuBg`] }">
      <el-menu
        class="el-menu-vertical"
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        :background-color="scssJson[`${theme}-menuBg`]"
        :text-color="scssJson[`${theme}-menuText`]"
        :active-text-color="scssJson.menuActiveText"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { dillScssExportToJson } from '@/utils/validate'
//导入配置文件

const appStore = useAppStore()
const settings = computed(() => {
  return appStore.settings
})

const route = useRoute()
const permissionStore = usePermissionStore()
const routes = computed(() => {
  return permissionStore.routes
})
const isCollapse = computed(() => {
  return appStore.sidebar.opened
})

const theme = computed(() => {
  return appStore.theme
})

onMounted(() => {
  console.log(routes, '111111111111')
})

//get scss variable
import scssExportJson from '@/styles/variables-to-js.scss'
import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'
const scssJson = dillScssExportToJson(scssExportJson)
const activeMenu = computed(() => {
  const { meta, fullPath } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return fullPath
})
</script>

<style lang="scss">
.reset-menu-style {
  .el-menu {
    border-right: none;
  }
  .el-scrollbar__wrap {
    padding-bottom: 10vh;
  }
}

.el-menu-vertical {
  width: $sideBarWidth;
  .el-menu-item.is-active {
    color: $menuActiveText !important;
    .circle {
      background-color: $menuActiveText !important;
    }
  }

  .submenu-title-noDropdown, .el-sub-menu__title {
    padding: 0 20px 0 21px;
  }
}
.el-menu--collapse .el-tooltip__trigger {
  padding-right: 0;
}
.el-menu--vertical {
  .el-menu--popup-right-start {
    padding: 0 !important;
    border-radius: 4px !important;
    overflow: hidden;
    a .el-menu-item:hover {
      background-color: $menuActiveText !important;
      color:#FFFFFF !important;
    }
  }
}
</style>
