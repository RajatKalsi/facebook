import { useState, useEffect } from "react"
import axios from 'axios';
// import UI from "./UserInterface";
import UserInterface from "./UserInterface";


const Api = () => {
    const [data, setData] = useState([]);

    // const getData = () => {
    //     axios.get("http://139.59.47.49:4004/api/posts?limit=6&start=1&orderby=0")
    //         .then(res => { setData(res.data) })
    // }

    useEffect(() => {
        axios.get("http://139.59.47.49:4004/api/posts?limit=10&start=1&orderby=0")
            .then(res => { setData(res.data); console.log(res, data) })
    }, [])

    return (
        <>
            <UserInterface
                data={data}
            />
        </>
    )
}

export default Api;