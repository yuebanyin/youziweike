# 柚子微课

#### 介绍

打包工具： webpack
主要开发语言：react scss
css 使用 tailwindcss 框架：https://tailwind.nodejs.cn/docs/aspect-ratio

组件库地址：http://192.168.3.106:3123/basic-component（该地址目前为本地地址）

#### 开始

pnpm i
pnpm start

#### 打包

pnpm build

#### 开发规范

> 全局项目有组件的统一使用组件，禁止单独写
> 组件库选用 esy-ui 全面兼容 tailwindcss 框架
> 所有文件夹命名采用-例如：start-learn（禁止使用驼峰）,tsx 文件使用大驼峰（index 除外）
> component 业务组件,此目录下有的优先使用

| --img: 图片组件

> hooks 逻辑
> |--text: 处理文本函数

> constants 常量

> utils 工具函数

> 需要换肤的图片放在 assets/images/肤色下
> 不需要换肤的图片放在 assets/images/common 下

#### 如果出现 useContext 的报错

pnpm remove react
pnpm i react@18.2.0
pnpm start
