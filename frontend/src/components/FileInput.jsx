import {useDispatch, useSelector} from "react-redux";
import {setData, setLoading} from "@/chartSlice";
import {useState} from "react";

export default function FileInput() {

    const {isLoading} = useSelector((state) => state.chart);
    const dispatch = useDispatch();
    let [file, setFile] = useState(new FormData());
    const URL = process.env.NEXT_PUBLIC_API_HOST
    console.log(URL)

    async function handleFileSubmit(event) {
        event.preventDefault();
        dispatch(setLoading());

        let data = await fetch(`${URL}/unravel`, {
            body: file,
            method: "POST"
        })
        data = await data.json();
        console.log(data.nodes, data.edges)
        let edgesData = data.edges.map((edge, index) => ({ id: index, ...edge }));
        dispatch(setData({nodes: data.nodes, edges: edgesData}));
        dispatch(setLoading());
    }

    function handleFileInput(event) {
        console.log(event.target.files)
        const formData = new FormData();
        formData.append('file', event.target.files[0])
        setFile(formData);
    }

    return (
        <div className={"p-10 flex flex-row justify-center"}>
            <form className={"mb-5"}>
                <input type="file" className="text-md text-slate-500
                      file:mr-4 file:py-4 file:px-8 file:h-14
                      file:rounded-tl-full file:rounded-bl-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      placeholder:bg-violet-50
                      hover:file:bg-violet-100
                    " onChange={handleFileInput} required={true}/>
                <button
                    className={"btn hover:bg-violet-100 h-14 border-0 bg-violet-50 text-violet-700 rounded-tr-full rounded-br-full py-4 px-8"}
                    onClick={handleFileSubmit}>
                    Unravel
                </button>
            </form>
        </div>
    )
}