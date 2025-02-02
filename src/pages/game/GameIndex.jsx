import {useEnv} from "../../context/EnvContext.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router";

function GameIndex() {

    const env = useEnv();
    const [games, setGames] = useState(null);

    useEffect(() => {
        async function fetchAllGames() {

            try {

                const response = await fetch(env.baseApiUrl + "games", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Something went wrong! Status: ${response.status}`);
                }

                const data = await response.json();

                setGames(data.items);

            } catch (error) {

                console.error(error.message);

            }

        }

        fetchAllGames();

    }, []);

    return (
        <section id={'gameIndex'}>

            <h1>All games</h1>

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
                                                    <Link to={'/cases/' + gameCase.id} key={gameCase.id} className={'caseLink'}>{gameCase.name}</Link>
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