
# Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:80
npm start

# build for test with minification
npm run test

# build for production with minification
npm run build
```


## Main Libiries

* [vue 2](https://cn.vuejs.org/)
* [vuex](https://vuex.vuejs.org/zh/guide/)
* [vue-router](https://router.vuejs.org/zh/)
* [express](http://facebook.github.io/immutable-js/)
* [axios](https://www.axios.com/)
* [webpack 4](https://webpack.github.io/)

---
## 1. 工程目录
> 
```
- build                     // webpack config
- src
  - components              // 组件库
      - ComA
      - ComB
  - pages                   // 页面
      - PageA   
        - store             // 状态管理
        - PageA.js
        - PageA.less
        - App.vue
      - PageB
        - store             // 状态管理
        - PageB.js
        - PageB.less
        - App.vue
  - services                // 异步请求封装
  - statics                 // 静态资源
  - utils                   // 工具函数
- server.js

```

