"use client"
import Navbar from "@/components/Navbar";
import {Provider, useSelector} from 'react-redux'

export default function Unravel() {
    const {isLoading} = useSelector((state) => state.chart);

    return (
        <main>
            <Navbar/>
        </main>
    )
}
