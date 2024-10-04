import axios from "axios";
import React, { useEffect, useState } from "react";

const Example3 = () => {
    const [data, setData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [currentBatch, setCurrentBatch] = useState(0);
    
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Failure", error);
            });
    }, []);

    useEffect(() => {
        if (data.length > 0 && currentBatch * 20 < data.length) {
            const timeout = setTimeout(() => {
                setDisplayedData(prevDisplayedData => [
                    ...prevDisplayedData,
                    ...data.slice(currentBatch * 20, (currentBatch + 1) * 20)
                ]);
                setCurrentBatch(prevBatch => prevBatch + 1);
            }, 9000);
            return () => clearTimeout(timeout);
        }
    }, [data, currentBatch]);

    return (
        <>
            {displayedData.map((item, index) => (
                <div key={index}>{index + 1}.{item.title}</div>
            ))}
        </>
    );
};

export default Example3;
