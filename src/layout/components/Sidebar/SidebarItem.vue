<template>
  <template v-if="!item.hidden">
    <template v-if="!item.children || !item.children.length">
      <Link :to="resolvePath(item.path)">
        <el-menu-item
          :style="{
            paddingLeft: isNest ? '33px' : '21px',
            backgroundColor: isNest ? scssJson[`${theme}-menuItemBg`] : '',
            color: theme === 'dark' && isNest ? '#C4C4C4' : ''
          }"
          :index="resolvePath(item.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item v-if="!isNest" :meta="item.meta || item.meta" />
          <div v-if="isNest && isCollapse" class="nest">
            <div class="line" :style="{ backgroundColor: scssJson[`${theme}-menuLineBg`] }"/>
            <div class="circle" :style="{ backgroundColor: scssJson[`${theme}-menuCircleBg`] }"/>
          </div>
          <template #title>{{ generateTitle(item.meta?.title) }}</template>
        </el-menu-item>
      </Link>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template v-if="item.meta" #title>
        <item :meta="item.meta" />
        <span>{{ generateTitle(item.meta.title) }}</span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script setup>
/*初始化参数比如引入组件，proxy,state等*/
import Link from './Link.vue'
import Item from './Item'
import { isExternal } from '@/utils/validate'
import scssExportJson from '@/styles/variables-to-js.scss'
import { dillScssExportToJson } from '@/utils/validate'
import path from 'path'
const props = defineProps({
  //每一个router Item
  item: {
    type: Object,
    required: true
  },
  //用于判断是不是子Item,设置响应的样式
  isNest: {
    type: Boolean,
    default: false
  },
  //基础路径，用于拼接
  basePath: {
    type: String,
    default: ''
  }
})
//i18n
import useI18n from '@/hooks/useI18n'
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
const { generateTitle } = useI18n()
//显示sidebarItem 的情况
let onlyOneChild = ref(null)
const isCollapse = computed(() => {
  return appStore.sidebar.opened
})
const theme = computed(() => {
  return appStore.theme
})

const scssJson = dillScssExportToJson(scssExportJson)

const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}

</script>

<style lang="scss" scoped>
.nest {
  width: 6px;
  position: relative;
  height: 100%;
  margin-right: 12px;
}
.line {
  width: 1px;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
