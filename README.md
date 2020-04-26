## Vue 项目介绍

基于 Vue-cli3.x 脚手架---Vue 2.x 系列 + Vue-router + axios + vuex + Element UI 等技术的系统解决方案。

## 项目基础目录结构

    ├── README.md                               //项目说明
    ├── build.xml                               //项目jenkins部署文件
    └── vue-admin                               //项目启动目录
        ├── babel.config.js                     //babel相关配置
        ├── package.json                        //项目及工具的依赖配置文件
        ├── public                              //站点公共目录
        │   ├── favicon.ico                     //站点ico图标
        │   ├── index.html                      //项目入口html文件
        │   └── vendor                          //第三方包打包生成目录
        │       ├── vendor-manifest.json        //第三方包索引
        │       └── vendor.dll.js               //合成的js包文件
        ├── src                                 //源码目录
        │   ├── App.vue                         //页面入口文件
        │   ├── api                             //项目api配置
        │   │   ├── configAxios.js              //axios相关配置
        │   │   ├── configMsg.js                //全局消息配置
        │   │   └── httpRequest.js              //http相关配置
        │   ├── assets                          //项目静态资源目录
        │   │   ├── images                      //图片文件
        │   │   │   └── 404.png                 //404图片
        │   │   ├── css                         //css文件
        │   │   ├── js                          //js文件
        │   │   ├── icon                        //icon文件
        │   ├── components                      //公共组件集合
        │   │   ├── 404.vue                     //404
        │   ├── main.js                         //项目入口js
        │   ├── pages                           //路由页面
        │   │   └── index.vue                   //首页
        │   ├── router                          //路由管理
        │   │   ├── index.js                    //路由入口js文件
        │   │   └── modules                     //模块路由管理(区分模块的管理路由)
        │   │       └── commonRouter.js         //公共路由管理
        │   ├── service                         //数据接口服务
        │   │   └── test.js                     //示例js
        │   ├── store                           //vuex相关
        │   │   ├── index.js                    //入口文件
        │   │   └── modules                     //模块状态管理(区分模块的管理状态)
        │   │       └── testStore.js            //示例
        │   └── util                            //项目工具js管理
        ├── vue.config.js                       //vue+webpack等配置相关
        ├── .eslintrc.js                        //eslint配置
        ├── .eslintignore                       //eslint忽略配置
        ├── .gitignore                          //git忽略的文件
        ├── webpack.dll.conf.js                 //dll预打包配置相关
        ├── .env.local                          //本地环境变量配置
        ├── .env.development                    //dev测试环境变量配置
        ├── .env.prerelease                     //pre预发布环境变量配置
        ├── .env.production                     //prd生产环境变量配置
        ├── yarn-error.log                      //yarn错误日志
        └── yarn.lock                           //yarn锁版本管理

## 项目执行命令

### 项目启动目录

```
vue-admin
```

### 项目初始化设置

```
yarn install
```

### 启动开发环境

```
yarn run serve
```

### 构建生产环境

```
yarn run build:dev (dev环境)
yarn run build:pre (pre环境)
yarn run build:prd (prd线上环境)
```

### 运行 lint 服务

```
yarn run lint
```