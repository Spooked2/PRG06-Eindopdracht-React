import './CaseCard.css';

function CaseCard({gameCase}) {

    return (
        <article className={"caseCard"}>

            <h2>{gameCase.name}</h2>

            <p>Appears in: {gameCase.game.short_name}</p>

            <h3>People involved</h3>

            <div className={"profileContainer"}>

                {
                    (gameCase.profiles ?

                        gameCase.profiles.map(profile => (

                            <article key={profile.id} className={"profileCard"}>

                                <div>
                                    <img src={`data:${profile.images[0].mime};base64, ${profile.images[0].data}`}
                                         alt={`Image of ${profile.names[0]}`}/>
                                </div>

                                <h4>{profile.names[0]}</h4>

                            </article>
                        ))
                        :
                        (
                            <h4>Nobody was involved in this case</h4>
                        ))
                }

            </div>

            <h3>List of evidence</h3>

            <div className={"evidenceContainer"}>

                {
                    (gameCase.evidence ?

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
                        :
                        (
                            <h4>No evidence has been found</h4>
                        ))
                }

            </div>

        </article>
    )

}

export default CaseCard;