import { ClientOnly } from './client'
import React from 'react';

const Page = () => {
  return <ClientOnly/>
}
export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default Page;