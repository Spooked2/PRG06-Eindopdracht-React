import {useEffect, useState} from "react";
import './ArrayInput.css';
import './ArrayInputCases.css';

function ArrayInputCases({name, array, setArray, gameCases}) {

    const [inputValue, setInputValue] = useState('');
    const [selectedCase, setSelectedCase] = useState('');

    useEffect(() => {

        setInputValue('');

    }, [array])

    function updateInputValue(e) {

        setInputValue(e.target.value);

    }

    function addItem() {

        if (inputValue === '' || selectedCase === '') {
            return;
        }

        const newItem = {
            text: inputValue,
            "case": selectedCase
        }

        const exists = array.find(item => item.text === newItem.text && item.case === newItem.case);

        if (exists) {
            return;
        }

        setArray([...array, newItem]);

    }

    function removeItem(e) {

        setArray(array.toSpliced(e.target.id, 1));

    }

    function getCaseName(caseId) {

        const gameCase = gameCases.find(item => item.id === caseId);

        if (gameCase) {
            return gameCase.name;
        }

        return false;

    }

    return Array.isArray(array) ? (
        <div className={'arrayInputCases'}>

            <div id={`${name}Input`} className={'arrayInputContainer'}>

                <div>
                    <label htmlFor={name}>{name}</label>
                    <input type="text" name={name} id={name} value={inputValue} onChange={updateInputValue}/>
                </div>

                <div>
                    <label htmlFor="gameCase">Select a case</label>
                    <select name="gameCase" id="gameCase" onChange={(e) => setSelectedCase(e.target.value)}>
                        <option value="" disabled={true} selected={true}>Please select a case</option>
                        {gameCases.map(gameCase => (
                            <option value={gameCase.id} key={gameCase.id}>{gameCase.name}</option>
                        ))}
                    </select>
                </div>

                <button onClick={addItem} type={'button'}>{'Add ' + name}</button>

            </div>

            <div id={`${name}Container`} className={'arrayInputList'}>
                <h3>Current list of {name}s</h3>
                {array.map(item => (
                    <p onClick={removeItem} key={array.indexOf(item)} id={array.indexOf(item)}>{item.text} ({getCaseName(item.case)})</p>
                ))}
            </div>

        </div>
    ) : (
        <h3>Loading...</h3>
    )
}

export default ArrayInputCases