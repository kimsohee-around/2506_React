import '../assets/css/OptionsList.scss'
import React from "react";

export default function OptionsList({ option, current, selected, handleSelect }) { // ({배열},{숫자})
    return (
        <div className='optionsDiv'>
            <h3>{option[current].question}</h3>
            {option[current].options.map((item, idx) => (
                <button className={`optionsList ${selected === idx ? "selected" : ""}`}
                    key={idx} onClick={() => handleSelect(idx)}>{item}</button>
            ))}
        </div>
    );
}
