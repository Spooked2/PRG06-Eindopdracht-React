import {useEffect, useState} from "react";
import CaseCard from "../../components/CaseCard.jsx";
import './CaseIndex.css';
import fetchFunc from "../../util/fetchFunc.jsx";
import FetchError from "../../components/FetchError.jsx";
import {Link} from "react-router";

function CaseIndex() {

    const [gameCases, setGameCases] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    async function fetchAllCases() {

        const response = await fetchFunc('cases', {
            method: 'GET'
        });

        if (response.ok) {
            setGameCases(response.body.items);
        } else {
            setFetchError({cause: response.status, message: response.statusText});
        }

    }

    useEffect(() => {

        fetchAllCases();

    }, []);

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

    return (
        <section id={"caseIndex"}>

            <h1>All cases</h1>

            <Link to={'/create/cases'}>Create new case</Link>

            <div id={"caseContainer"}>
                {
                    (gameCases ?
                            gameCases.map(gameCase => (

                                <CaseCard key={gameCase.id} gameCase={gameCase}/>

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
    );
}

export default CaseIndex;