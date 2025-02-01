import {useEnv} from "../context/EnvContext.jsx";
import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import ScrollButtons from "../components/ScrollButtons.jsx";

function ProfileDetail() {

    const env = useEnv();
    const {id} = useParams();
    const [profile, setProfile] = useState(null);

    const [name, setName] = useState(0);
    const [age, setAge] = useState(0);
    const [description, setDescription] = useState(0);
    const [image, setImage] = useState(0);

    useEffect(() => {
        async function fetchSpecificProfile() {

            try {

                const response = await fetch(env.baseApiUrl + "profiles/" + id, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Something went wrong! Status: ${response.status}`);
                }

                const data = await response.json();

                setProfile(data);

            } catch (error) {

                console.error(error.message);

            }

        }

        fetchSpecificProfile();

    }, []);

    return (
        <section>

            {
                profile ? (

                    <article id={'profileDetail'}>

                        <ScrollButtons key={'image'} targetLength={profile.images.length}
                                       setter={setImage}>

                            <img
                                src={`data:${profile.images[image].mime};base64, ${profile.images[image].data}`}
                                alt={"Image of " + profile.names[name]}/>

                        </ScrollButtons>

                        <div>

                            <div>

                                <ScrollButtons key={'name'} targetLength={profile.names.length} setter={setName}>

                                    <h1>{profile.names[name]}</h1>

                                </ScrollButtons>

                                <ScrollButtons key={'age'} targetLength={profile.ages.length} setter={setAge}>
                                    ({profile.ages[age]})
                                </ScrollButtons>

                            </div>

                            <ScrollButtons key={'description'}
                                           targetLength={profile.descriptions.length}
                                           setter={setDescription}>

                                <p>{profile.descriptions[description].text}</p>
                                <p>Description from
                                    <Link to={'/cases/' + profile.descriptions[description].case}>
                                        {profile.descriptions[description].case.name}
                                    </Link>
                                </p>

                            </ScrollButtons>

                        </div>

                    </article>


                ) : (
                    <h1>Loading...</h1>
                )
            }

        </section>
    )
}

export default ProfileDetail;