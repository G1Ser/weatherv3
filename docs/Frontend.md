# 前端架构文档

## 接口请求

接口请求使用`ky`来封装, ky文档https://github.com/sindresorhus/ky

## 图表

图标使用`echarts`来绘制, echarts文档https://github.com/apache/echarts,https://echarts.apache.org/handbook/en/get-started/,按需使用

## 样式

样式使用`unocss`来管理, unocss文档https://github.com/unocss/unocss,https://unocss.dev/guide/

## 状态管理

状态管理使用`svelte`原生store

## 动画

- 结构/状态驱动动画 svelte原生
- 视觉动画 scss

## ui

- 字体使用,不用去改变我这里的预设

```css
@font-face {
  font-family: 'Consolas';
  src: url('$lib/assets/fonts/consolas.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'LXGW';
  src: url('$lib/assets/fonts/lxgwscreen.woff2') format('woff2');
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Consolas', 'LXGW', sans-serif;
  scrollbar-width: none;
}

- 明/暗模式 读取`weather.pen`UI稿, 还原其中颜色变量 写进root变量 明暗切换
```

## 国际化

使用`Paraglides JS`来做国际化,文档https://github.com/opral/inlang,https://inlang.com/m/gerre34r/library-inlang-paraglideJs
配置文件在`./messages`里面, 语言文件在`./messages/en.json`, `./messages/zh.json` 读取`weather.pen` 稿件 对一些标题进行国际化设置
