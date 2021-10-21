export default {
  pages: ["pages/home/index", "pages/package/index", "pages/personal/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "快递代收-通用",
    navigationBarTextStyle: "black",
    backgroundColor: '#F3F7F9'
  },
  tabBar: {
    color: '#606060',
    selectedColor: '#3F8FFF',
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home_active.png'
      },
      {
        pagePath: "pages/package/index",
        text: "我的包裹",
        iconPath: 'assets/icons/package.png',
        selectedIconPath: 'assets/icons/package_active.png'
      },
      {
        pagePath: "pages/personal/index",
        text: "个人中心",
        iconPath: 'assets/icons/personal.png',
        selectedIconPath: 'assets/icons/personal_active.png'
      }
    ],
    custom: true
  }
};
