import {useEffect, useState} from "react";
import './ArrayInput.css';

function ArrayInput({name, array, setArray}) {

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {

        setInputValue('');

    }, [array])

    function updateInputValue(e) {

        setInputValue(e.target.value);

    }

    function addItem() {

        if (inputValue === '') {
            return;
        }

        if (array.includes(inputValue)) {
            setInputValue('');
            return;
        }

        setArray([...array, inputValue]);

    }

    function removeItem(e) {

        setArray(array.toSpliced(e.target.id, 1));

    }

    return Array.isArray(array) ? (
        <div className={'arrayInput'}>

            <div id={`${name}Input`} className={'arrayInputContainer'}>

                <div>
                    <label htmlFor={name}>{name}</label>
                    <input type="text" name={name} id={name} value={inputValue} onChange={updateInputValue}/>
                </div>

                <button onClick={addItem} type={'button'}>{'Add ' + name}</button>

            </div>

            <div id={`${name}Container`} className={'arrayInputList'}>
                <h3 className={'highlight'}>Current list of {name}s</h3>
                {array.map(item => (
                    <p onClick={removeItem} key={array.indexOf(item)} id={array.indexOf(item)}>{item}</p>
                ))}
            </div>

        </div>
    ) : (
        <h3>Loading...</h3>
    )
}

export default ArrayInput