import {useEffect, useState} from "react";
import './MultiSelect.css';

function MultiSelect({items, selectedItems, setSelectedItems}) {

    const [unselectedItems, setUnselectedItems] = useState([]);

    useEffect(() => {

        if (items.length > 0) {
            const filtered = items.filter(item => !selectedItems.some(selectedItem => selectedItem.id === item.id));
            setUnselectedItems(filtered);
        }

    }, [items, selectedItems]);

    function unselect(e) {
        e.preventDefault();

        let itemId = '';

        if (e.target.tagName === 'ARTICLE') {
            itemId = e.target.id;
        } else {
            itemId = e.target.parentElement.id;
        }

        const item = items.find(item => item.id === itemId);

        if (!selectedItems.some(selectedItem => selectedItem.id === item.id)) {
            return;
        }

        const index = selectedItems.indexOf(item);

        setSelectedItems(selectedItems.toSpliced(index, 1));

    }

    function select(e) {
        e.preventDefault();

        let itemId = '';

        if (e.target.tagName === 'ARTICLE') {
            itemId = e.target.id;
        } else {
            itemId = e.target.parentElement.id;
        }

        const item = items.find(item => item.id === itemId);

        setSelectedItems([...selectedItems, item]);
    }

    return  (
        <div className={'multiSelectWindow'}>

            <div className={'multiSelectLeft'}>

                <div className={'detailWindow'}>

                </div>

                <div className={'selectedItems'}>

                    {selectedItems.map(selectedItem => (
                        <article key={selectedItem.id} id={selectedItem.id} onClick={unselect}>
                            <p>{selectedItem.name ?? selectedItem.names[0]}</p>
                        </article>
                    ))}

                </div>

            </div>

            <div className={'unselectedItems'}>

                {unselectedItems.map(unselectedItem => (
                    <article key={unselectedItem.id} id={unselectedItem.id} onClick={select}>
                        <p>{unselectedItem.name ?? unselectedItem.names[0]}</p>
                    </article>
                ))}

            </div>

        </div>
    )
}

export default MultiSelect;