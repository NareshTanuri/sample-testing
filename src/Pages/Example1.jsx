import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const allCities = [
    { id: 1, name: "India", cities: ["Hyderabad", "Mumbai"] },
    { id: 2, name: "USA", cities: ["New York", "Los Angeles"] },
    { id: 3, name: "USSA", cities: ["New City", "Los Angeles"] },
];

const Example1 = () => {
    const [state, setState] = useState({
        cities: allCities,
        selectCityName: "0",
        cityName: "0",
        selectCity: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "SelectName") {
            if (value !== "0") {
                const findValueCity = state.cities.find((element) => element.id === parseInt(value));
                if (findValueCity) {
                    setState((prevState) => ({ ...prevState, selectCity: findValueCity.cities, selectCityName: value }));
                }
            } else {
                setState((prevState) => ({ ...prevState, selectCity: [], selectCityName: value }));
            }
        } else if (name === "CityName") {
            setState((prevState) => ({ ...prevState, cityName: value }));
        }
    };

    const { cities, selectCity, selectCityName, cityName } = state;

    return (
        <>
            <Row className="mt-3">
                <Col sm={6}>
                    <Form.Select size="sm" onChange={handleChange} value={selectCityName} name="SelectName">
                        <option value="0">--Select Country--</option>
                        {cities.map((item) => (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col sm={6}>
                    <Form.Select size="sm" onChange={handleChange} value={cityName} name="CityName">
                        <option value="0">--Select City--</option>
                        {selectCity.map((city, index) => (
                            <option value={city} key={index}>{city}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
        </>
    );
};

export default Example1;
