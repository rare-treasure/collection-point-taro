import { eventBus } from '@/utils'
import { useDidShow } from '@tarojs/taro'
import { memo, useEffect } from 'react'

import './index.scss'

type PropsType = {

}

const Package = (props: PropsType) => {
  // 兼容微信小程序 custom-tab-bar
  useDidShow(() => {
    eventBus.emit('selectedTabIdx', 1);
  })

  return <div className='package'>
    package
  </div>
}

export default memo(Package)
