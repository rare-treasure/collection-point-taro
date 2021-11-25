import { eventBus } from '@/utils';
import Taro, { useDidShow } from '@tarojs/taro';
import { memo, useEffect, useMemo, useState } from 'react'
import { AtList, AtListItem } from 'taro-ui'

import './index.scss'

type PropsType = {

}

const Personal = (props: PropsType) => {
  useDidShow(() => {
    eventBus.emit('selectedTabIdx', 2);
  })

  return <div className='personal'>
    <AtList>
      {/* <AtListItem title='标题文字' onClick={this.handleClick} /> */}
      <AtListItem title='标题文字' arrow='right' />
      <AtListItem title='标题文字' extraText='详细信息' />
    </AtList>
  </div>
}

export default memo(Personal)
