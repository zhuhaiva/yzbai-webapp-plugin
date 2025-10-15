# 微信小程序插件 `getUserInfo` 使用说明

## 📖 目录

- [简介](#简介)
- [安装与配置](#安装与配置)
- [使用方法](#使用方法)

  - [WXML 代码](#wxml-代码)
  - [JS 逻辑](#js-逻辑)

- [返回数据说明](#返回数据说明)
- [开发注意事项](#开发注意事项)
- [版本记录](#版本记录)

---

## 简介

`getUserInfo` 是一个微信小程序插件组件，主要用于**快捷授权登录**，帮助开发者快速获取用户的基础信息（昵称、头像、地区、性别等）。

---

## 安装与配置

### 1. 添加插件

在 `app.json` 配置文件中引入插件组件：

```json
"plugins": {
    "yzbFastLoginPlugin": {
      "version": "1.0.0",
      "provider": "wxc4acd4715423d65c"
    }
}
```
### 2. 配置插件

在需要使用的页面的中的 `json` 配置文件中引入插件组件：

```json
{
  "usingComponents": {
    "getUserInfo": "plugin://yzbFastLoginPlugin/getUserInfo"
  }
}
```

---

## 使用方法

### WXML 代码

```xml
<getUserInfo onSuccess="getInfo">
  <button>快捷授权登录</button>
</getUserInfo>
```

- `getUserInfo` ：插件提供的授权组件
- `onSuccess` ：获取授权信息成功后的回调方法
- 插槽 `<button>` ：自定义显示的按钮内容

---

### JS 逻辑

```js
Page({
  data: {},

  // 插件回调：获取用户信息
  getInfo({userInfo}) {
    console.log("用户信息：", userInfo);
    // TODO: 将用户信息传递给后台，完成登录或绑定逻辑
  },
});
```

---

## 返回数据说明

`e.detail` 返回的典型数据格式：

```json
{
  "nickName": "张三",
  "avatarUrl": "https://example.com/avatar.jpg",
  "gender": 1,
  "province": "Zhejiang",
  "city": "Hangzhou"
}
```

字段说明：

| 字段名      | 类型   | 说明                       |
| ----------- | ------ | -------------------------- |
| `nickName`  | String | 用户昵称                   |
| `avatarUrl` | String | 用户头像 URL               |
| `gender`    | Number | 性别（0 未知，1 男，2 女） |
| `province`  | String | 省份                       |
| `city`      | String | 城市                       |

---

## 开发注意事项

1. 必须在小程序后台 **开通插件并配置合法域名**，否则调用失败。
2. 插件组件必须包裹触发元素（如 `<button>`），否则不会弹出授权弹窗。
3. 在真机调试时才能看到完整的授权流程，模拟器可能无法正常展示。
4. 建议在获取到用户信息后，**立刻上传至服务端**，完成用户登录/注册逻辑。

---

## 版本记录

| 版本号 | 日期       | 更新内容                       |
| ------ | ---------- | ------------------------------ |
| 1.0.0  | 2025-09-18 | 初始版本，支持快捷授权登录功能 |
