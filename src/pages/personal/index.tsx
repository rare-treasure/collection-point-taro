import { eventBus } from '@/utils';
import Taro, { useDidShow } from '@tarojs/taro';
import { memo, useEffect, useMemo, useState } from 'react'
import style from './index.module.css'

import './index.scss'

type PropsType = {

}

const Personal = (props: PropsType) => {
  const [cTabBar] = useState(<div>2221</div>)

  useDidShow(() => {
    eventBus.emit('selectedTabIdx', 2);
  })

  return <div className='personal'>
    {cTabBar}
  </div>
}

export default memo(Personal)
