import { memo, useCallback, useMemo } from "react";
import { AtTabBar } from "taro-ui";
import Taro from "@tarojs/taro";

import config from '../app.config'

import "./index.scss";

const tabBarList = (config.tabBar?.list ?? []).map(item => ({
  ...item,
  title: item.text ?? '',
  text: '',
  selectedImage: require('@/' + item.selectedIconPath),
  image: require('@/' + item.iconPath),
}));

const TabBar = () => {
  const currentSelectedTab = useMemo(() => {
    const currentPage = Taro.getCurrentPages().pop();

    const idx = tabBarList.findIndex(tabBar => tabBar?.pagePath === currentPage?.route);

    return idx > 0 ? idx : 0;
  }, []);

  const handleTabClick = useCallback((idx: number) => {
    Taro.switchTab({
      url: '/' + tabBarList?.[idx]?.pagePath ?? ''
    })
  }, []);

  return (
    <AtTabBar
      fixed
      onClick={handleTabClick}
      tabList={tabBarList}
      current={currentSelectedTab}
      color='#707070'
      selectedColor='#3F8FFF'
    />
  );
};

export default memo(TabBar);
