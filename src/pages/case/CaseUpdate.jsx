import {useEffect, useState} from "react";
import fetchFunc from "../../util/fetchFunc.jsx";
import FetchError from "../../components/FetchError.jsx";
import MultiSelect from "../../components/MultiSelect.jsx";
import {useNavigate, useParams} from "react-router";

function CaseUpdate() {

    const [gameCase, setGameCase] = useState({});
    const [games, setGames] = useState([]);
    const [evidence, setEvidence] = useState([]);
    const [profiles, setProfiles] = useState([]);

    const [selectedEvidence, setSelectedEvidence] = useState([]);
    const [selectedProfiles, setSelectedProfiles] = useState([]);

    const [messages, setMessages] = useState({});
    const [fetchError, setFetchError] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

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

        await updateCase(formData);

    }

    async function updateCase(updatedCase) {

        const response = await fetchFunc('cases', {
            method: 'PUT',
            id: id,
            body: JSON.stringify(updatedCase)
        });

        if (response.ok) {

            navigate('/cases/' + id);

        } else {

            setMessages({error: response.body.error});

        }

    }

    async function fetchData() {

        //Get the case
        const caseRes = await fetchFunc('cases', {
            method: 'GET',
            id: id
        });

        if (caseRes.ok) {
            setGameCase(caseRes.body);
        } else {
            return setFetchError({cause: caseRes.status, message: caseRes.statusText});
        }

        //Get all the games
        const gamesRes = await fetchFunc('games', {
            method: 'GET'
        });

        if (gamesRes.ok) {
            setGames(gamesRes.body.items);
        } else {
           return setFetchError({cause: gamesRes.status, message: gamesRes.statusText});
        }

        //Get all the evidence
        const evidenceRes = await fetchFunc('evidence', {
            method: 'GET'
        });

        if (evidenceRes.ok) {
            setEvidence(evidenceRes.body.items);
        } else {
            return setFetchError({cause: evidenceRes.status, message: evidenceRes.statusText});
        }

        //Get all the profiles
        const profilesRes = await fetchFunc('profiles', {
            method: 'GET'
        });

        if (profilesRes.ok) {
            setProfiles(profilesRes.body.items);
        } else {
            return setFetchError({cause: profilesRes.status, message: profilesRes.statusText});
        }

    }

    useEffect(() => {

        fetchData()

    }, []);

    useEffect(() => {

        if (Object.keys(gameCase).length > 0 && games.length > 0 && evidence.length > 0 && profiles.length > 0) {

            const evidenceIds = [];
            for (const evidenceElement of gameCase.evidence) {
                evidenceIds.push(evidenceElement.id);
            }

            const profileIds = [];
            for (const profile of gameCase.profiles) {
                profileIds.push(profile.id);
            }

            setSelectedEvidence(gameCase.evidence ?? []);
            setSelectedProfiles(gameCase.profiles ?? []);

            setFormData({
                name: gameCase.name,
                evidence: evidenceIds,
                profiles: profileIds,
                game: gameCase.game.id,
            });

            setLoading(false);

        }

    }, [gameCase, games, evidence, profiles]);

    if (fetchError) {
        return <FetchError error={fetchError}/>
    }

    return !loading ? (
        <section>

            <h1>Create a new case</h1>

            {messages.error ? (
                <p>{messages.error}</p>
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

                        <option value="" disabled={true}>Please select a game</option>

                        {games.map(game => (
                            <option value={game.id} key={game.id} selected={game === gameCase.game}>{game.full_name}</option>
                        ))}

                    </select>
                </div>

                <button type={'submit'}>Save changes</button>

            </form>

        </section>
    ) : (
        <section>
            <h1>Loading...</h1>
        </section>
    )
}

export default CaseUpdate;