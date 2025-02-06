'use client'
import React from 'react';
import dynamic from 'next/dynamic'
import {Provider} from 'react-redux';
import STORE from '../../client/src/store/Store.js';
import logo from '../../public/east_blue_logo.jpg';
import '../../public/index.css'
const App = dynamic(() => import('../../client/src/components/App'), { ssr: false })

export function ClientOnly() {
  return (
    <Provider store={STORE}>
      <App logo={logo}/>
    </Provider>
  )
}
