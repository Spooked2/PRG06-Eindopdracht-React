import {useEffect, useState} from "react";
import {Link} from "react-router";
import fetchFunc from "../../util/fetchFunc.jsx";
import FetchError from "../../components/FetchError.jsx";
import './ProfileIndex.css';

function ProfileIndex() {

    const [profiles, setProfiles] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    async function fetchAllProfiles() {

        const response = await fetchFunc('profiles', {
            method: 'GET'
        });

        if (response.ok) {
            setProfiles(response.body.items);
        } else {
            setFetchError({cause: response.status, message: response.statusText});
        }

    }

    useEffect(() => {

        fetchAllProfiles();

    }, []);

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

    return (
        <section>

            <h1>All profiles</h1>

            <Link to={'/create/profiles'}>Create new profile</Link>

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