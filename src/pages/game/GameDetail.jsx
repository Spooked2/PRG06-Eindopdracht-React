import {Link, useParams} from "react-router";
import {useEnv} from "../../context/EnvContext.jsx";
import {useEffect, useState} from "react";

function GameDetail() {

    const env = useEnv();
    const [game, setGame] = useState(null);
    const {id} = useParams();

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
                    throw new Error(`Something went wrong! Status: ${response.status}`);
                }

                const data = await response.json();

                setGame(data);

            } catch (error) {

                console.error(error.message);

            }

        }

        fetchSpecificGame();

    }, []);

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

            </article>

        </section>

    ) : (

        <section>
            <h1>Loading...</h1>
        </section>

    )
}

export default GameDetail;