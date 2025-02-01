import {useEffect, useState} from "react";
import {useEnv} from "../../context/EnvContext.jsx";
import CaseCard from "../../components/CaseCard.jsx";
import './CaseIndex.css';

function CaseIndex() {

    const env = useEnv();
    const [gameCases, setGameCases] = useState(null);

    useEffect(() => {
        async function fetchAllCases() {

            try {

                const response = await fetch(env.baseApiUrl + "cases", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Something went wrong! Status: ${response.status}`);
                }

                const data = await response.json();

                setGameCases(data.items);

            } catch (error) {

                console.error(error.message);

            }

        }

        fetchAllCases();

    }, []);


    return (
        <section id={"caseIndex"}>

            <h1>All cases</h1>

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