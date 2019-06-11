## 大屏模块开发
目的:仅维护组件以及页面布局配置,在容器中生成相应页面
```
├── containers      页面组件
│   ├── touchtvchart    主要页面
│   └── devchart    面向开发
├── components      容器组件
│   ├── BaseContainer   布局容器
│   ├── BaseCharts  县级组件容器
│   └── County      县级组件
│   └── Media       短视频组件
    └── AutoCounty  每个县可能存在多个大屏这里是各个县各个屏的组件
```

1. touchtvchart
主要页面,面向外部,仅作模块容器,取线上数据
2. devchart
面向开发,调整布局配置,取本地数据
布局配置使用横竖块状切割,组件调整数据可通过配置data传达

```
// 布局配置(/store/dev.js)
{
    // 占位
    col: 16.4,
    // 名字标识
    name: '内容排行榜',
    // 组件名
    componentType: 'ContentRate',
    // 组件所取后台字段名
    filed: 'Content_leaderboard',
    data: {
        // 自定义数据,字段不能与filed值重复
        platform: {
            name: '桔子新闻',
            logoUrl: 'http://img2-cloud.itouchtv.cn/upload/20190506/7ejJ34AnbB1557113117.png'
        }
    }
}
```

3. County
组件内通过`translator.js`转换数据,视情况而设置
新建组件需要在BaseCharts引入

4. 组件输出
类似AutoCounty多个屏的组件，在输出时需要加在当前县哪种屏的标识

```
<!-- 例如：四会的大屏 -->
export default {
    ...addComponentPrefix(COMPONENTS, 'AutoCounty_Sihui_Big')
};

```

```
<!-- 内容排行榜 -->
<ContentRate v-if="type==='ContentRate'" :screenData="option" />

import ContentRate from 'Components/County/ContentRate/index.vue';

components: {
    'ContentRate': ContentRate
}
```