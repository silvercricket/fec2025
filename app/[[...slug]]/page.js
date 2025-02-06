import { ClientOnly } from './client'
import React from 'react';
import {Provider} from 'react-redux';
import STORE from '../../client/src/store/Store.js';

const Page = () => {
  return <ClientOnly />
}
export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default Page;