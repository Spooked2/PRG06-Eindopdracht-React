import {useEnv} from "../context/EnvContext.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import ScrollButtons from "../components/ScrollButtons.jsx";

function EvidenceDetail() {

    const env = useEnv();
    const {id} = useParams();
    const [evidence, setEvidence] = useState(null);

    const [name, setName] = useState(0);
    const [shortDescription, setShortDescription] = useState(0);
    const [longDescription, setLongDescription] = useState(0);
    const [smallImage, setSmallImage] = useState(0);
    const [largeImage, setLargeImage] = useState(0);

    useEffect(() => {
        async function fetchSpecificEvidence() {

            try {

                const response = await fetch(env.baseApiUrl + "evidence/" + id, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Something went wrong! Status: ${response.status}`);
                }

                const data = await response.json();

                setEvidence(data);

            } catch (error) {

                console.error(error.message);

            }

        }

        fetchSpecificEvidence();

    }, []);

    return (
        <section id={'evidenceDetail'}>

            {
                evidence ? (

                    <>
                        <div>

                            <ScrollButtons key={'smallImage'} targetLength={evidence.small_images.length}
                                           setter={setSmallImage}>

                                <img
                                    src={`data:${evidence.small_images[smallImage].mime};base64, ${evidence.small_images[smallImage].data}`}
                                    alt={"Image of " + evidence.names[name]}/>

                            </ScrollButtons>

                            <div>

                                <ScrollButtons key={'name'} targetLength={evidence.names.length} setter={setName}>

                                    <h1>{evidence.names[name]}</h1>

                                </ScrollButtons>

                                <ScrollButtons key={'shortDescription'}
                                               targetLength={evidence.short_descriptions.length}
                                               setter={setShortDescription}>

                                    <p>{evidence.short_descriptions[shortDescription]}</p>

                                </ScrollButtons>

                            </div>

                        </div>

                        <div>

                            {
                                evidence.long_descriptions.length !== 0 ? (

                                        <ScrollButtons key={'longDescriptions'}
                                                       targetLength={evidence.long_descriptions.length}
                                                       setter={setLongDescription}>

                                            <p>{evidence.long_descriptions[longDescription]}</p>

                                        </ScrollButtons>

                                    ) :
                                    (
                                        <></>
                                    )
                            }

                            {
                                evidence.large_images.length !== 0 ? (

                                        <ScrollButtons key={'largeImage'}
                                                       targetLength={evidence.large_images.length}
                                                       setter={setLargeImage}>

                                            <p>{evidence.large_images[largeImage]}</p>

                                        </ScrollButtons>

                                    ) :
                                    (
                                        <></>
                                    )
                            }

                        </div>

                    </>

                ) : (
                    <h1>Loading...</h1>
                )
            }

        </section>
    )
}

export default EvidenceDetail;