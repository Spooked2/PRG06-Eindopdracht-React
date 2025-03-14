import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import ScrollButtons from "../../components/ScrollButtons.jsx";
import FetchError from "../../components/FetchError.jsx";
import fetchFunc from "../../util/fetchFunc.jsx";

function ProfileDetail() {

    const {id} = useParams();
    const [profile, setProfile] = useState(null);
    const [gameCases, setGameCases] = useState(new Map);
    const [fetchError, setFetchError] = useState(false);

    const [name, setName] = useState(0);
    const [age, setAge] = useState(0);
    const [description, setDescription] = useState(0);
    const [image, setImage] = useState(0);

    async function fetchSpecificProfile() {

        const response = await fetchFunc('profiles', {
            method: 'GET',
            id: id
        });

        if (response.ok) {
            setProfile(response.body);

            for (const fetchedCase of response.body.cases) {
                const name = fetchedCase.name;
                const id = fetchedCase._id;

                setGameCases(gameCases.set(id, name));
            }

        } else {
            setFetchError({cause: response.status, message: response.statusText});
        }


    }

    useEffect(() => {

        fetchSpecificProfile();

    }, []);

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

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
                                    (Age: {profile.ages[age]})
                                </ScrollButtons>

                            </div>

                            <ScrollButtons key={'description'}
                                           targetLength={profile.descriptions.length}
                                           setter={setDescription}>

                                <p>{profile.descriptions[description].text}</p>
                                <p>Description from
                                    <Link to={'/cases/' + profile.descriptions[description].case}>
                                        {gameCases.get(profile.descriptions[description].case)}
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