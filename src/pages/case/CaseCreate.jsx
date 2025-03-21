import {useEffect, useState} from "react";
import fetchFunc from "../../util/fetchFunc.jsx";
import FetchError from "../../components/FetchError.jsx";
import MultiSelect from "../../components/MultiSelect.jsx";

function CaseCreate() {

    const [messages, setMessages] = useState({});
    const [games, setGames] = useState([]);
    const [evidence, setEvidence] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [selectedEvidence, setSelectedEvidence] = useState([]);
    const [selectedProfiles, setSelectedProfiles] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        evidence: [],
        profiles: [],
        game: '',
    });

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function updateFormData() {

        const evidenceIds = [];

        for (const evidenceItem of selectedEvidence) {
            evidenceIds.push(evidenceItem.id);
        }

        const profileIds = [];

        for (const profile of selectedProfiles) {
            profileIds.push(profile.id);
        }

        //The fucking set function decided to stop working, so we're doing it manually
        formData.evidence = evidenceIds;
        formData.profiles = profileIds;

    }

    const submitHandler = async (e) => {

        e.preventDefault();

        updateFormData();

        await postNewCase(formData);

    }

    const clearFormData = () => {
        setFormData({
            name: '',
            evidence: [],
            profiles: [],
            game: '',
        });
        setSelectedEvidence([]);
    }

    async function postNewCase(newCase) {

        const response = await fetchFunc('cases', {
            method: 'POST',
            body: JSON.stringify(newCase)
        });

        if (response.ok) {

            setMessages({success: "Case was created!"});
            clearFormData();

        } else {

            setMessages({error: response.body.error});

        }

    }

    async function fetchData() {

        //Get all the games
        const gamesRes = await fetchFunc('games', {
            method: 'GET'
        });

        if (gamesRes.ok) {
            setGames(gamesRes.body.items);
        } else {
            setFetchError({cause: gamesRes.status, message: gamesRes.statusText});
        }

        //Get all the evidence
        const evidenceRes = await fetchFunc('evidence', {
            method: 'GET'
        });

        if (evidenceRes.ok) {
            setEvidence(evidenceRes.body.items);
        } else {
            setFetchError({cause: evidenceRes.status, message: evidenceRes.statusText});
        }

        //Get all the profiles
        const profilesRes = await fetchFunc('profiles', {
            method: 'GET'
        });

        if (profilesRes.ok) {
            setProfiles(profilesRes.body.items);
        } else {
            setFetchError({cause: profilesRes.status, message: profilesRes.statusText});
        }

    }

    useEffect(() => {

        fetchData();
        setSelectedEvidence([]);
        setSelectedProfiles([]);

    }, []);

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

    return games && profiles && evidence ? (
        <section>

            <h1>Create a new case</h1>

            {messages.error ? (
                <p>{messages.error}</p>
            ) : ''
            }

            {messages.success ? (
                <p>{messages.success}</p>
            ) : ''
            }

            <form onSubmit={submitHandler}>

                <div>
                    <label htmlFor={'name'}>Name</label>
                    <input type="text" max={255} required={true}
                           id={'name'} name={'name'}
                           value={formData.name} placeholder={'Turnabout Sisters'}
                           onChange={inputChangeHandler}
                    />
                </div>

                <div>
                    <h2>Evidence</h2>
                    <MultiSelect items={evidence} selectedItems={selectedEvidence} setSelectedItems={setSelectedEvidence}/>
                </div>

                <div>
                    <h2>Profiles</h2>
                    <MultiSelect items={profiles} selectedItems={selectedProfiles} setSelectedItems={setSelectedProfiles}/>
                </div>

                <div>
                    <label htmlFor={'game'}>Select a game</label>

                    <select name={'game'}
                            id={'game'}
                            required={true}
                            onChange={inputChangeHandler}
                    >

                        <option value="" disabled={true} selected={true}>Please select a game</option>

                        {games.map(game => (
                            <option value={game.id} key={game.id}>{game.full_name}</option>
                        ))}

                    </select>
                </div>

                <button type={'submit'}>Create case</button>

            </form>

        </section>
    ) : (
        <section>
            <h1>Loading...</h1>
        </section>
    )
}

export default CaseCreate;