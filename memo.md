### start

[https://juejin.cn/post/7035929902381531150](https://juejin.cn/post/7035929902381531150)

### if
```js
// #ifdef MP-WEIXIN
return;
// #endif

// #ifdef APP-PLUS
plus.runtime.openURL(url);
return;
// #endif

// #ifdef H5
window.location.href = url;
return;
// #endif
```
