import {useEffect, useState} from "react";
import {Link} from "react-router";
import FetchError from "../../components/FetchError.jsx";
import fetchFunc from "../../util/fetchFunc.jsx";

function GameIndex() {

    const [games, setGames] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    async function fetchGames() {

        const response = await fetchFunc('games', {
            method: 'GET'
        });

        if (response.ok) {
            setGames(response.body.items)
        } else {
            setFetchError({cause: response.status, message: response.statusText})
        }
    }

    useEffect(() => {

        fetchGames();

    }, []);

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

    return (
        <section id={'gameIndex'}>

            <h1>All games</h1>

            <Link to={'/create/games'}>Create new game</Link>

            <div id={"gameContainer"}>
                {
                    (games ?
                            games.map(game => (

                                    <article key={game.id} className={'gameCard'}>

                                        <div>

                                            <h2>{game.full_name}</h2>
                                            <p>Shortened to {game.short_name}</p>
                                            <p>Released in {game.release_year}</p>

                                        </div>

                                        <div>

                                            <h3>List of cases</h3>

                                            <div id={'caseContainer'}>

                                                {game.cases.map(gameCase => (
                                                    <Link to={'/cases/' + gameCase.id} key={gameCase.id}
                                                          className={'caseLink'}>{gameCase.name}</Link>
                                                ))}

                                            </div>

                                        </div>

                                        <Link to={'/games/' + game.id}>Details</Link>

                                    </article>

                                )
                            )
                            :
                            (
                                <h2>Loading...</h2>
                            )
                    )

                }
            </div>

        </section>
    )
}

export default GameIndex;