"use client"
import Navbar from "@/components/Navbar";
import {Provider, useSelector} from 'react-redux'
import FileInput from "@/components/FileInput";

export default function Unravel() {
    const {isLoading} = useSelector((state) => state.chart);

    return (
        <main>
            <Navbar/>
            <FileInput/>
        </main>
    )
}
