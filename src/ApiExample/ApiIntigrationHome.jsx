import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const PromiseExampleHome = (props) => {
    const { Promise2Data } = props.state;

    const [sortField, setSortField] = useState('');
    const [order, setOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState({
        columns: ['Sno', 'title', 'body'],
        rows: [],
    });

    const recordsPerPage = 10;

    useEffect(() => {
        setData(prevState => ({
            ...prevState,
            rows: Promise2Data
        }));
    }, [Promise2Data]);

    const handleSort = (field) => {
        setSortField(field);
        setOrder(order === 'asc' ? 'desc' : 'asc');
    };

    const sortedData = data.rows.sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (order === 'asc') {
            return valueA < valueB ? -1 : 1;
        } else {
            return valueA > valueB ? -1 : 1;
        }
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.rows.length / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <table className="table">
                <thead className="thead-success">
                    <tr className="bg-success text-white">
                        {data.columns.map((column) => (
                            <th key={column} onClick={() => handleSort(column)}>
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((row, index) => (
                        <tr key={row.id}>
                            <td>{indexOfFirstRecord + index + 1}</td>
                            {data.columns.slice(1).map((column) => (
                                <td key={column}>{row[column]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} href="!#" className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
export default PromiseExampleHome;
