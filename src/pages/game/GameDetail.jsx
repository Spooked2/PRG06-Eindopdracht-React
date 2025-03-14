import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import FetchError from "../../components/FetchError.jsx";
import fetchFunc from "../../util/fetchFunc.jsx";

function GameDetail() {

    const [game, setGame] = useState(null);
    const {id} = useParams();
    const [fetchError, setFetchError] = useState(false);

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