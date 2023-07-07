"use client"
import store from '@/store'
import {Provider, useSelector} from 'react-redux'
import Unravel from "@/components/Unravel";

export default function Home() {
  return (
      <Provider store={store}>
        <Unravel/>
      </Provider>
  )
}
