import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";

const Example4 = () => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        selectionOption: "0",
        multiSelectionOption: [],
        multiSelectionOption1: [],
        multiSelectionOption2: [],
    });
    console.log("statatta",state);

    const data = [{ id: 1, name: "Naresh" }, { id: 2, name: "Suresh" }];
    const multiSelectionData = [{ id: 1, name: "NareshKumar" }, { id: 2, name: "SureshKumar" }];
    const multiSelectionData1 = [{ id: 1, name: "NareshKumar", age: 20 }, { id: 2, name: "SureshKumar", age: 21 }];
    const multiSelectionData2 = [{ id: 1, name: "NareshKumar", lastName: "Tanuri" }, { id: 2, name: "SureshKumar", lastName: "Tanuri" }];

    const formFields = [
        { type: "text", name: "firstName", placeholder: "First Name", label: "First Name" },
        { type: "select", name: "selectionOption", placeholder: "", label: "Select Option", options: data },
        { type: "multi-select", name: "multiSelectionOption", placeholder: "", label: "Multi Select Option", options: multiSelectionData },
        { type: "multi-select", name: "multiSelectionOption1", placeholder: "", label: "Multi Select Option1", options: multiSelectionData1 },
        { type: "multi-select", name: "multiSelectionOption2", placeholder: "", label: "Multi Select Option2", options: multiSelectionData2 },
        { type: "text", name: "lastName", placeholder: "Last Name", label: "Last Name" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleMultiSelectChange = (selectedOptions, name) => {
        setState(prevState => ({ ...prevState, [name]: selectedOptions }));
    };

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            multiSelectionOption: prevState.multiSelectionOption.length === 0 ? multiSelectionData.map((item) => ({ label: item.name, value: item.id })) : prevState.multiSelectionOption,
            multiSelectionOption1: prevState.multiSelectionOption1.length === 0 ? multiSelectionData1.map((item) => ({ label: `${item.name} (${item.age})`, value: item.id })) : prevState.multiSelectionOption1,
            multiSelectionOption2: prevState.multiSelectionOption2.length === 0 ? multiSelectionData2.map((item) => ({ label: `${item.name} (${item.lastName})`, value: item.id })) : prevState.multiSelectionOption2,
        }));
    }, []);

    return (
        <>
            <Row>
                <Col sm={6}>
                    {formFields.map((item, index) => (
                        <div key={index} className="mt-3">
                            <h6>{item.label}</h6>
                            {item.type === "text" ? (
                                <input
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    name={item.name}
                                    value={state[item.name]}
                                    onChange={handleChange}
                                />
                            ) : item.type === "select" ? (
                                <select
                                    name={item.name}
                                    value={state[item.name]}
                                    onChange={handleChange}
                                >
                                    <option value="0">--Select Name--</option>
                                    {item.options.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            ) : item.type === "multi-select" ? (
                                <MultiSelect
                                    options={item.options.map(option => ({
                                        value: option.id,
                                        label: item.name === "multiSelectionOption1" 
                                                ? `${option.name} (${option.age})`
                                                : item.name === "multiSelectionOption2" 
                                                ? `${option.name} (${option.lastName})` 
                                                : option.name
                                    }))}
                                    value={state[item.name]}
                                    onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, item.name)}
                                    labelledBy="Select"
                                />
                            ) : null}
                        </div>
                    ))}
                </Col>
            </Row>
        </>
    );
};

export default Example4;
