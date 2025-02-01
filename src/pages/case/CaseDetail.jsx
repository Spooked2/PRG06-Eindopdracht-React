import {useEnv} from "../../context/EnvContext.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";

function CaseDetail() {

    const env = useEnv();
    const [gameCase, setGameCase] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        async function fetchSpecificCase() {

            try {

                const response = await fetch(env.baseApiUrl + "cases/" + id, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Something went wrong! Status: ${response.status}`);
                }

                const data = await response.json();

                setGameCase(data);

            } catch (error) {

                console.error(error.message);

            }

        }

        fetchSpecificCase();

    }, []);

    return gameCase ? (
            <section id={'caseDetail'}>

                <h1>{gameCase.name}</h1>
                <p>Appears in {gameCase.game.full_name ?? gameCase.game.short_name}</p>

                <div id={'profileContainer'}>

                    {
                        gameCase.profiles.map(profile => (
                            <article key={profile.id} className={'profileCard'}>

                                <div>
                                    <img src={`data:${profile.images[0].mime};base64, ${profile.images[0].data}`}
                                         alt={`Image of ${profile.names[0]}`}/>
                                </div>

                                <h4>{profile.names[0]}</h4>

                            </article>
                        ))
                    }

                </div>

                <div id={'evidenceContainer'}>

                    {
                        gameCase.evidence.map(evidencePiece => (

                        <article key={evidencePiece.id} className={"evidenceCard"}>

                            <div>
                                <img
                                    src={`data:${evidencePiece.small_images[0].mime};base64, ${evidencePiece.small_images[0].data}`}
                                    alt={`Image of ${evidencePiece.names[0]}`}/>
                            </div>

                            <h4>{evidencePiece.names[0]}</h4>

                        </article>
                    ))
                    }

                </div>

            </section>
        ) :
        (
            <section id={'caseDetail'}>
                <h1>Loading...</h1>
            </section>
        )
}

export default CaseDetail;