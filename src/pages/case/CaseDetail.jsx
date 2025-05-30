import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";
import fetchFunc from "../../util/fetchFunc.jsx";
import FetchError from "../../components/FetchError.jsx";
import './CaseDetail.css'

function CaseDetail() {

    const [gameCase, setGameCase] = useState(null);
    const {id} = useParams();
    const [fetchError, setFetchError] = useState(false);

    async function fetchCase() {

        const response = await fetchFunc('cases', {
            method: 'GET',
            id: id
        });

        if (response.ok) {
            setGameCase(response.body)
        } else {
            setFetchError({cause: response.status, message: response.statusText})
        }
    }

    useEffect(() => {

        fetchCase();

    }, []);

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

    return gameCase ? (
            <section id={'caseDetail'}>

                <h1>{gameCase.name}</h1>
                <p>Appears in {gameCase.game.full_name ?? gameCase.game.short_name}</p>

                <h2>People involved</h2>
                <div id={'profileContainer'}>


                    {
                        gameCase.profiles.map(profile => (
                            <article key={profile.id} className={'profileCard'}>

                                <div>
                                    <img src={`data:${profile.images[0].mime};base64, ${profile.images[0].data}`}
                                         alt={`Image of ${profile.names[0]}`}/>
                                </div>

                                <Link to={`/profiles/${profile.id}`}>{profile.names[0]}</Link>

                            </article>
                        ))
                    }

                </div>

                <h2>List of evidence</h2>
                <div id={'evidenceContainer'}>


                    {
                        gameCase.evidence.map(evidencePiece => (

                            <article key={evidencePiece.id} className={"evidenceCard"}>

                                <div>
                                    <img
                                        src={`data:${evidencePiece.small_images[0].mime};base64, ${evidencePiece.small_images[0].data}`}
                                        alt={`Image of ${evidencePiece.names[0]}`}/>
                                </div>

                                <Link to={`/evidence/${evidencePiece.id}`}>{evidencePiece.names[0]}</Link>

                            </article>
                        ))
                    }

                </div>

                <div>
                    <Link to={`/update/cases/${id}`}>Edit case</Link>
                    <Link to={`/delete/cases/${id}`}>Delete case</Link>
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