import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";
import FetchError from "../../components/FetchError.jsx";
import fetchFunc from "../../util/fetchFunc.jsx";

function GameDelete() {

    const [game, setGame] = useState(null);
    const {id} = useParams();
    const [fetchError, setFetchError] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteGame = async () => {

        const response = await fetchFunc('games', {
            method: 'DELETE',
            id: id
        })

        if (response.ok) {
            setIsDeleted(true);
        } else {
            setFetchError({cause: response.status, message: response.statusText})
        }

    }

    async function fetchGame() {

        const response = await fetchFunc('games', {
            method: 'GET',
            id: id
        });

        if (response.ok) {
            setGame(response.body)
        } else {
            setFetchError({cause: response.status, message: response.statusText})
        }
    }

    useEffect(() => {

        fetchGame();

    }, []);

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

    if (isDeleted) {
        return (
            <section>

                <h1>Game has been successfully deleted</h1>

                <div>

                    <Link to={'/games'}>Return to game index</Link>
                    <Link to={'/'}>Return to home</Link>

                </div>

            </section>
        )
    }

    return game ? (
        <section>

            <h1>Are you sure you wish to delete the following game?</h1>

            <h2>{game.full_name}</h2>

            <button onClick={deleteGame} id={'deleteButton'}>Yes, delete {game.short_name}</button>

        </section>
    ) : (
        <section>
            <h1>Loading...</h1>
        </section>
    )
}

export default GameDelete;