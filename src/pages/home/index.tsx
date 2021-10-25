import { memo, useCallback, useEffect } from "react";
import Taro, { useDidShow } from '@tarojs/taro'
import { eventBus } from "@/utils";

import bgIcon from "@/assets/images/home_bg.png";
import sendIcon from "@/assets/icons/send.png";
import packageIcon from "@/assets/icons/package_active.png";

import "./index.scss";

type PropsType = {};

const Home = (props: PropsType) => {
  const handleRouteSkip = useCallback((pageUrl) => {
    Taro.switchTab({
      url: pageUrl
    })
  }, [])

  useDidShow(() => {
    eventBus.emit('selectedTabIdx', 0);
  })

  return (
    <div className='home'>
      <img className='home__bg' src={bgIcon} />

      <div className='home-toolbox'>
        <div className='home-toolbox__item' onClick={() => handleRouteSkip('/pages/package/index')}>
          <img className='home-toolbox__img' src={sendIcon} />
          <span className='home-toolbox__text'>寄件下单</span>
        </div>
        <div className='home-toolbox__item' onClick={() => handleRouteSkip('/pages/package/index')}>
          <img className='home-toolbox__img' src={packageIcon} />
          <span className='home-toolbox__text'>我的包裹</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
