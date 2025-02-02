import {useEnv} from "../../context/EnvContext.jsx";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";
import FetchError from "../../components/FetchError.jsx";

function GameDelete() {

    const env = useEnv();
    const [game, setGame] = useState(null);
    const {id} = useParams();
    const [fetchError, setFetchError] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteGame = async () => {
        try {

            const response = await fetch(env.baseApiUrl + "games/" + id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error, {cause: response.status});
            }

            setIsDeleted(true);

        } catch (error) {

            setFetchError(error);

        }
    }

    useEffect(() => {
        async function fetchSpecificGame() {

            try {

                const response = await fetch(env.baseApiUrl + "games/" + id, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.error, {cause: response.status});
                }

                const data = await response.json();

                setGame(data);

            } catch (error) {

                setFetchError(error);

            }

        }

        fetchSpecificGame();

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
                    <Link to={'/home'}>Return to home</Link>

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