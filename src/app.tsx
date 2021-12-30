import React, { Component } from 'react'
import { Provider } from 'react-redux'

import '@tarojs/taro/html.css';
import './app.scss';

import store from './store';

class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return <React.StrictMode>
      <Provider store={store}>
        { this.props.children }
      </Provider>
    </React.StrictMode>
  }
}

export default App
