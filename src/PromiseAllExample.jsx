import React, { useEffect, useState } from "react";
import PromiseExampleHome from "./ApiExample/ApiIntigrationHome";
import axios from "axios";

const ExampleWithPromises = () => {
    const [state, setState] = useState({
        Promise1Data: [],
        Promise2Data: [],
        Promise3Data: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [Promise1, Promise2, Promise3] = await Promise.all([
                    axios.get('https://jsonplaceholder.typicode.com/users'),
                    axios.get('https://jsonplaceholder.typicode.com/posts'),
                    axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
                ]);
                const dataResults1 = Promise1.data;
                const dataResults2 = Promise2.data;
                const dataResult3 = Promise3.data;
                setState(prevState => ({
                    ...prevState,
                    Promise1Data: dataResults1,
                    Promise2Data: dataResults2,
                    Promise3Data: dataResult3,
                }))
                console.log("dataResults", dataResults2, dataResult3, dataResults1);
            } catch (error) {
                console.error("Error");
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <PromiseExampleHome state={state} />
        </>
    )
}
export default ExampleWithPromises;