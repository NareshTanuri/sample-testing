import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExampleCard = () => {
    const [cardData] = useState([
        { id: 1, headerName: 'Naresh' },
        { id: 2, headerName: 'Suresh' },
        { id: 3, headerName: 'Ganesh' },
        { id: 4, headerName: 'Harish' },
    ]);

    const [selectedOption, setSelectedOption] = useState(1);
    const [selectedCard, setSelectedCard] = useState([]);
    console.log("selectedCard",selectedCard);

    const handleSelection = (option) => {
        setSelectedOption(option);

        const selectedCard = cardData.find(card => card.id === option);
        setSelectedCard(selectedCard)
    };

    const getColors = (id) => {
        if (id == 1) {
            return 'border-primary';
        } else if (id == 2) {
            return 'border-danger';
        } else if (id == 3) {
            return 'border-success';
        } else {
            return 'border-info';
        }
    }

    return (
        <div className="container">
            <div className="d-flex flex-wrap">
                {cardData.map((item) => (
                    <div
                        key={item.id}
                        className={`card m-2 ${selectedOption === item.id ? getColors(selectedOption) : ''}`}
                        style={{ width: '18rem', cursor: 'pointer' }}
                        onClick={() => handleSelection(item.id)}
                    >
                        <div className="card-body text-center">
                            <h5 className="card-title">{item.headerName}</h5>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-5 text-center">
                <h4>Selected Card</h4>
                <p>ID: {selectedCard.id}</p>
                <p>Name: {selectedCard.headerName}</p>
            </div>
        </div>
    );
};

export default ExampleCard;
