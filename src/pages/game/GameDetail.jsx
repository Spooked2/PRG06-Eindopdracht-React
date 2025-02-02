import {Link, useParams} from "react-router";
import {useEnv} from "../../context/EnvContext.jsx";
import {useEffect, useState} from "react";
import FetchError from "../../components/FetchError.jsx";

function GameDetail() {

    const env = useEnv();
    const [game, setGame] = useState(null);
    const {id} = useParams();
    const [fetchError, setFetchError] = useState(false);

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

    return game ? (
        <section>

            <article key={game.id} className={'gameCard'}>

                <div>

                    <h1>{game.full_name}</h1>
                    <p>Shortened to {game.short_name}</p>
                    <p>Released in {game.release_year}</p>

                </div>

                <div>

                    <h2>List of cases</h2>

                    <div id={'caseContainer'}>

                        {game.cases.map(gameCase => (
                            <Link to={'/cases/' + gameCase.id} key={gameCase.id}
                                  className={'caseLink'}>{gameCase.name}</Link>
                        ))}

                    </div>

                </div>

                <div>

                    <Link to={'/update/games/' + game.id}>Edit</Link>
                    <Link to={'/delete/games/' + game.id}>Delete</Link>

                </div>

            </article>

        </section>

    ) : (

        <section>
            <h1>Loading...</h1>
        </section>

    )
}

export default GameDetail;