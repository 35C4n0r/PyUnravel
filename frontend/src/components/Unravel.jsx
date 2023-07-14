"use client"
import Navbar from "@/components/Navbar";
import {useSelector} from 'react-redux'
import FileInput from "@/components/FileInput";
import DepTree from "@/components/DepTree";

export default function Unravel() {
    const {isLoading, nodes} = useSelector((state) => state.chart);

    return (
        <main>
            <Navbar/>
            <FileInput/>
            {nodes.length && !isL === 0 ?
                <p className={"text-4xl flex items-center justify-center mt-48 animate-pulse text-center"}>Start
                    Unraveling</p> : isLoading ?
                    <p className={"text-4xl flex items-center justify-center mt-48 animate-pulse text-center"}> Loading </p> :
                    <div className={"overflow-auto"}><DepTree/></div>
            }
        </main>
    )
}
