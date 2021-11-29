import { eventBus } from '@/utils'
import Taro, { useDidShow } from '@tarojs/taro'
import { memo, useMemo, useState, useCallback, useEffect } from 'react'
import { AtTabs, AtTabsPane, AtSearchBar, AtButton } from 'taro-ui';

import './index.scss'

type PropsType = {

}

const Package = (props: PropsType) => {
  // 兼容微信小程序 custom-tab-bar
  useDidShow(() => {
    eventBus.emit('selectedTabIdx', 1);
  })

  const [current, setCurrent] = useState(0);
  const [isShowScan, setIsShowScan] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const tabList = useMemo(() => [{ title: '取件区' }, { title: '历史取件' }], [])

  const handleClick = (value: number) => {
    setCurrent(value)
  }

  const handleSearchFocus = useCallback(() => {
    setIsShowScan(false)
  }, [])

  const handleSearchClose = useCallback(() => {
    setIsShowScan(true)
  }, [])

  const handleHistoryClear = useCallback(() => {
    Taro.removeStorage({ key: 'history-list' })
    setHistoryList([])
  }, []);

  useEffect(() => {
    const historyList = Taro.getStorageSync('history-list') || ['2391232321312', '3213124213421', '321312321321321']

    setHistoryList(historyList);
  }, [])

  return <div className='package'>
    <div className='package-toolbox'>
      <AtSearchBar
        value={searchVal}
        onChange={(val) => {
          console.log(val)
          setSearchVal(val)
        }}
        actionName='查询'
        className={'package-search ' + (isShowScan ? 'package-search__default' : 'package-search__active')}
        onFocus={handleSearchFocus}
      />
      { isShowScan ? <div className='package-scan'></div> : <span className='package-search__btn' onClick={handleSearchClose}>取消</span> }
      { !isShowScan ? <div className='package-history'>
        <p className='package-history__text'>
          历史查询
        </p>
        {
          (() => {
            if(!historyList.length) {
              return <p className='package-history__null'>
                暂无历史查询
              </p>
            }

            return <ul className='package-history__list'>
              { historyList.map((item: string, idx: number) => {
                  return <li key={'history_' + idx} className='package-history__item'>
                    {item}
                  </li>
                })
              }
            </ul>
          })()
        }
        <span className='package-history__clear' onClick={handleHistoryClear}>清空</span>
      </div> : null }
    </div>
    { !isShowScan ? <div className='package-mask' onClick={handleSearchClose}></div> : null }
    <AtTabs current={current} tabList={tabList} onClick={handleClick} className='package-tabs'>
      <AtTabsPane current={current} index={0} >
        <div className='package-site'>
          <div className='package-site__info'>
            <div className='package-site__title'>
              <div className='package-site__name'>
                站点1号
              </div>
              <i className='package-site__location'></i>
            </div>

            <div className='package-site__addr'>
              广东省广州市天河区车陂村1号
            </div>

            <div className='package-site__num'>
              9个
            </div>·
          </div>

          <div className='package-site__list'>
            <div className='package-site__card'></div>
          </div>
        </div>
      </AtTabsPane>
      <AtTabsPane current={current} index={1}>
        <div className='package-tabs__item'>

        </div>
      </AtTabsPane>
    </AtTabs>
  </div>
}

export default memo(Package)
