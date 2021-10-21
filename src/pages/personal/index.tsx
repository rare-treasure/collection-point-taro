import Taro from '@tarojs/taro';
import { memo, useMemo, useState } from 'react'
import style from './index.module.css'

import './index.scss'

type PropsType = {

}

const Personal = (props: PropsType) => {
  const [cTabBar] = useState(<div>2221</div>)

  return <div className='personal'>
    {cTabBar}
  </div>
}

export default memo(Personal)
