import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { AtTabBar } from "taro-ui";
import Taro, { useRouter } from "@tarojs/taro";
import { eventBus } from "@/utils";

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
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  useEffect(() => {
    eventBus.on('selectedTabIdx', (idx: number) => {
      setSelectedTabIdx(idx)
    })
  }, [])

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
      current={selectedTabIdx}
      color='#707070'
      selectedColor='#3F8FFF'
    />
  );
};

export default memo(TabBar);
