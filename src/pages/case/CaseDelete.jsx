import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";
import fetchFunc from "../../util/fetchFunc.jsx";
import FetchError from "../../components/FetchError.jsx";

function CaseDelete() {

    const [gameCase, setGameCase] = useState(null);
    const {id} = useParams();
    const [fetchError, setFetchError] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteCase = async () => {

        const response = await fetchFunc('cases', {
            method: 'DELETE',
            id: id
        })

        if (response.ok) {
            setIsDeleted(true);
        } else {
            setFetchError({cause: response.status, message: response.statusText})
        }

    }

    async function fetchCase() {

        const response = await fetchFunc('cases', {
            method: 'GET',
            id: id
        });

        if (response.ok) {
            setGameCase(response.body)
        } else {
            setFetchError({cause: response.status, message: response.statusText})
        }
    }

    useEffect(() => {

        fetchCase();

    }, []);

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

    if (isDeleted) {
        return (
            <section>

                <h1>Case has been successfully deleted</h1>

                <div>

                    <Link to={'/cases'}>Return to case index</Link>
                    <Link to={'/'}>Return to home</Link>

                </div>

            </section>
        )
    }

    return gameCase ? (
        <section>

            <h1>Are you sure you wish to delete the following case?</h1>

            <h2>{gameCase.name}</h2>

            <button onClick={deleteCase} id={'deleteButton'}>Yes, delete {gameCase.name}</button>

        </section>
    ) : (
        <section>
            <h1>Loading...</h1>
        </section>
    )
}

export default CaseDelete;