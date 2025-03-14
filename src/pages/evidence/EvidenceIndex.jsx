import {useEffect, useState} from "react";
import {Link} from "react-router";
import fetchFunc from "../../util/fetchFunc.jsx";
import FetchError from "../../components/FetchError.jsx";

function EvidenceIndex() {

    const [evidence, setEvidence] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    async function fetchAllEvidence() {

        const response = await fetchFunc('evidence', {
            method: 'GET'
        });

        if (response.ok) {
            setEvidence(response.body.items);
        } else {
            setFetchError({cause: response.status, message: response.statusText});
        }

    }

    useEffect(() => {

        fetchAllEvidence();

    }, []);

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

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