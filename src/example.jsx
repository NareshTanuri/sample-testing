import React, { useEffect, useState } from "react";

const contacts = [
    {
        id: 1,
        name: "John Doe",
        mobileNumber: "1234567890",
        email: "john@example.com",
        gender: "male",
        time: "1717744561",
    },
    {
        id: 2,
        name: "Jane Smith",
        mobileNumber: "0987654321",
        email: "jane@example.com",
        gender: "female",
        time: "1717744561",
    },
    {
        id: 3,
        name: "Michael Johnson",
        mobileNumber: "3456789012",
        email: "michael@example.com",
        gender: "male",
        time: "1717744561",
    },
    {
        id: 4,
        name: "Emily Davis",
        mobileNumber: "5678901234",
        email: "emily@example.com",
        gender: "female",
        time: "1717744561",
    },
    {
        id: 5,
        name: "David Brown",
        mobileNumber: "7890123456",
        email: "david@example.com",
        gender: "male",
        time: "1717744561",
    }
];

const Example = () => {

    const [state, setState] = useState({
        columns: ['Sno', 'Name', 'Mobile Number', 'Email', 'Gender', "Time", "Icon"],
        rowData: [],
        rowContactData:[],
    });

    useEffect(() => {
        setState(prevState => ({ ...prevState, rowData: contacts }))
    }, []);

    const formatDate = (timestamp) => {
        const date = new Date(parseInt(timestamp) * 1000);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}-${dd}-${yyyy}`;
    }

    const displayRowData = (row) => {
        setState(prevState => ({ ...prevState, rowContactData: [row] }))
    }

    const emojiMap = {
        1: '🌞',
        2: '😀',
        3: '😟',
        4: '😰',
        5: '😌',
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr className="table-danger">
                        {state.columns.map((column, index) => (
                            <th key={index} scope="col">{column}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {state.rowData.map((row, index) => (
                        <tr key={row.id} className="bg-info">
                            <td>{index + 1}</td>
                            {state.columns.slice(1).map((column, columnIndex) => (
                                <td key={columnIndex}>
                                    {column === 'Name' && (
                                        <a href={row.name} target="_blank">{row.name}</a>
                                    )}
                                    {column === 'Mobile Number' && row.mobileNumber}
                                    {column === 'Email' && row.email}
                                    {column === 'Gender' && row.gender}
                                    {column === 'Time' && formatDate(row.time)}
                                    {column === 'Icon' && (
                                        <span style={{ cursor: 'pointer' }} onClick={() => displayRowData(row)}>{emojiMap[row.id]}</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h1>Name Is : {state.rowContactData[0]?.name}</h1>
            </div>
        </>
    )
}
export default Example;
