import {useEffect, useState} from "react";
import {Link} from "react-router";
import FetchError from "../../components/FetchError.jsx";
import fetchFunc from "../../util/fetchFunc.jsx";
import './GameIndex.css';

function GameIndex() {

    const [games, setGames] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [fetchedGames, setFetchedGames] = useState(null);

    const [fetchError, setFetchError] = useState(false);

    async function fetchGames() {

        const response = await fetchFunc('games', {
            method: 'GET'
        });

        if (response.ok) {
            setFetchedGames(response.body.items)
        } else {
            setFetchError({cause: response.status, message: response.statusText})
        }
    }

    useEffect(() => {

        fetchGames();

    }, []);

    useEffect(() => {

        setCurrentPage(0);

    }, [fetchedGames]);

    useEffect(() => {

        if (fetchedGames) {
            setGames(fetchedGames.slice(currentPage * 3, ((currentPage * 3) + 3)))
        }

    }, [currentPage, fetchedGames]);

    function previousPage() {

        if (currentPage === 0) {
            return;
        }

        setCurrentPage(currentPage - 1);

    }

    function nextPage() {
        const amount = fetchedGames.length;
        const nextIndex = currentPage + 1;

        if (nextIndex >= (amount / 3)) {
            return;
        }

        setCurrentPage(currentPage + 1);

    }

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

    return fetchedGames ? (
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

            <div>
                <button type={"button"} onClick={previousPage}>Previous</button>
                <button type={"button"} onClick={nextPage}>Next</button>
            </div>

        </section>
    ) : (
        <h1>Loading...</h1>
    )
}

export default GameIndex;