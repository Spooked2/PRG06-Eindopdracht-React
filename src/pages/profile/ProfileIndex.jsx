import {useEnv} from "../../context/EnvContext.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router";

function ProfileIndex() {

    const env = useEnv();
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function fetchAllProfiles() {

            try {

                const response = await fetch(env.baseApiUrl + "profiles", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Something went wrong! Status: ${response.status}`);
                }

                const data = await response.json();

                setProfiles(data.items);

            } catch (error) {

                console.error(error.message);

            }

        }

        fetchAllProfiles();

    }, []);

    return (
        <section>

            <h1>All profiles</h1>

            {
                profiles ? (

                    <div id={'profileContainer'}>

                        {
                            profiles.map(profile => (
                                <article key={profile.id}>

                                    <div>
                                        <img src={`data:${profile.images[0].mime};base64, ${profile.images[0].data}`}
                                             alt={`Image of ${profile.names[0]}`}/>
                                    </div>

                                    <div>
                                        <h2>{profile.names[0]} (Age: {profile.ages[0]})</h2>
                                        <p>{profile.descriptions[0].text}</p>
                                    </div>

                                    <Link to={'/profiles/' + profile.id}>Details</Link>

                                </article>
                            ))
                        }

                    </div>

                ) : (
                    <h2>Loading...</h2>
                )
            }

        </section>
    )
}

export default ProfileIndex;