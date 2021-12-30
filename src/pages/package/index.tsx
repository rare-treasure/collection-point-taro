import { eventBus } from '@/utils'
import Taro, { useDidShow } from '@tarojs/taro'
import { memo, useMemo, useState, useCallback, useEffect } from 'react'
import { AtTabs, AtTabsPane, AtSearchBar, AtCheckbox } from 'taro-ui';
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
  const [isSearch, setIsSearch] = useState(false);

  const tabList = useMemo(() => [{ title: '取件区' }, { title: '历史取件' }], [])

  const handleClick = (value: number) => {
    setCurrent(value)
  }

  const handleSearchFocus = useCallback(() => {
    setIsShowScan(false)
  }, [])

  const handleSearch = useCallback(() => {
    if(isSearch) {
      // 搜索list
    }

    setIsShowScan(true)
  }, [isSearch])

  const handleHistoryClear = useCallback(() => {
    Taro.removeStorage({ key: 'history-list' })
    setHistoryList([])
  }, []);

  const handleSiteCheckbox = useCallback((state) => {
    console.log(state)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const historyList = Taro.getStorageSync('history-list') || ['2391232321312', '3213124213421', '321312321321321']

    setHistoryList(historyList);
  }, [])

  useEffect(() => {
    setIsSearch(!!searchVal)
  }, [searchVal])

  return <div className='package'>
    <div className='package-toolbox'>
      <AtSearchBar
        value={searchVal}
        onChange={(val) => {
          setSearchVal(val)
        }}
        actionName='查询'
        className={'package-search ' + (isShowScan ? 'package-search__default' : 'package-search__active')}
        onFocus={handleSearchFocus}
      />
      { isShowScan ? <div className='package-scan'></div> : <span className='package-search__btn' onClick={handleSearch}>{
        isSearch ? '搜索' : '取消'
      }</span> }
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
    { !isShowScan ? <div className='package-mask' onClick={handleSearch}></div> : null }
    <AtTabs current={current} tabList={tabList} onClick={handleClick} className='package-tabs'>
      <AtTabsPane current={current} index={0} >
        <div className='package-site'>
          <div className='package-site__info'>
            <div className='package-site__title'>
              <div className='package-site__name'>
                站点1号
              </div>
              <div className='package-site__addr'>
                <span>广东省广州市天河区车陂村1号</span>
                <i className='package-site__location'></i>
              </div>
            </div>

            <div className='package-site__num'>
              9个
            </div>
          </div>

          <ul className='package-site__list'>
            <li className='package-site__card'>
              <AtCheckbox selectedList={[1]} options={[{
                  value: 1,
                  label: ''
                }]}
                onChange={handleSiteCheckbox}
              >
              </AtCheckbox>
              <div className='package-icon package-icon__sf'></div>
              <div className='package-site__express'>
                <p className='package-site__code'>
                  3450
                </p>
                <div className='package-site__no'>
                  顺丰｜SF1338439446313
                  <span className='package-site__copy'></span>
                </div>
                <p className='package-site__time'>
                  抵达时间：2021-02-10 10:10:10
                </p>
              </div>
            </li>
          </ul>
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
