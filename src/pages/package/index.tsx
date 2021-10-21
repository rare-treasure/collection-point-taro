import { memo } from 'react'

import './index.scss'

type PropsType = {

}

const Package = (props: PropsType) => {
  return <div className='package'>
    package
  </div>
}

export default memo(Package)
