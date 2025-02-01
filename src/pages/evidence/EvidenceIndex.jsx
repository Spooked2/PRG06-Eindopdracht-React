import {useEnv} from "../../context/EnvContext.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router";

function EvidenceIndex() {

    const env = useEnv();
    const [evidence, setEvidence] = useState(null);

    useEffect(() => {
        async function fetchAllEvidence() {

            try {

                const response = await fetch(env.baseApiUrl + "evidence", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Something went wrong! Status: ${response.status}`);
                }

                const data = await response.json();

                setEvidence(data.items);

            } catch (error) {

                console.error(error.message);

            }

        }

        fetchAllEvidence();

    }, []);

    return (
        <section id={'evidenceIndex'}>

            <h1>All evidence</h1>

            <div id={"evidenceContainer"}>
                {
                    (evidence ?
                            evidence.map(evidencePiece => (

                                    <article key={evidencePiece.id} className={"evidenceCard"}>

                                        <div>

                                            <img
                                                src={`data:${evidencePiece.small_images[0].mime};base64, ${evidencePiece.small_images[0].data}`}
                                                alt={`Image of ${evidencePiece.names[0]}`}/>

                                        </div>

                                        <div>

                                            <h2>{evidencePiece.names[0]}</h2>
                                            <p>{evidencePiece.short_descriptions[0]}</p>
                                            <Link to={'/evidence/' + evidencePiece.id}>Details</Link>

                                        </div>

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

export default EvidenceIndex;