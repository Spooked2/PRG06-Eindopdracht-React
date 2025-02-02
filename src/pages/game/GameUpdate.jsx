import {useEnv} from "../../context/EnvContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";

function GameUpdate() {

    const env = useEnv();
    const {id} = useParams();
    const navigate = useNavigate();

    const [messages, setMessages] = useState({});
    const [game, setGame] = useState(null);

    const [formData, setFormData] = useState({
        full_name: '',
        short_name: '',
        release_year: ''
    });

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await putUpdatedGame(formData);
        navigate('/games/' + id);
    }

    useEffect(() => {

        fetchSpecificGame()

    }, []);

    useEffect(() => {

        if (game !== null && formData.full_name === '') {

            setFormData({
                full_name: game.full_name,
                short_name: game.short_name,
                release_year: game.release_year
            });

        }

    }, [game]);

    async function fetchSpecificGame() {

        try {

            const response = await fetch(env.baseApiUrl + "games/" + id, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Something went wrong! Status: ${response.status}`);
            }

            const data = await response.json();

            setGame(data);

        } catch (error) {

            console.error(error.message);

        }

    }

    async function putUpdatedGame(updatedGame) {

        try {

            const response = await fetch(env.baseApiUrl + "games/" + id, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedGame)
            });

            if (!response.ok) {
                const data = await response.json();
                setMessages({error: data.error});
                throw new Error(`Something went wrong! Status: ${response.status} Error: ${data.error}`);
            }

            const data = await response.json();
            setMessages({success: "Game was updated!"});
            return data;

        } catch (error) {

            return console.error(error.message);

        }

    }

    return game ? (
        <section>

            <h1>Edit {game.full_name}</h1>

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
                    <label htmlFor={'full_name'}>Full name</label>
                    <input type="text" max={255} required={true}
                           id={'full_name'} name={'full_name'}
                           value={formData.full_name} placeholder={'Phoenix Wright: Ace Attorney'}
                           onChange={inputChangeHandler}
                    />
                </div>

                <div>
                    <label htmlFor={'short_name'}>Shortened name</label>
                    <input type="text" max={255} required={true}
                           id={'short_name'} name={'short_name'}
                           value={formData.short_name} placeholder={'PW:AA'}
                           onChange={inputChangeHandler}
                    />
                </div>

                <div>
                    <label htmlFor={'release_year'}>Year of release</label>
                    <input type="text" max={255} required={true}
                           id={'release_year'} name={'release_year'}
                           value={formData.release_year} placeholder={'2001'}
                           onChange={inputChangeHandler}
                    />
                </div>

                <button type={'submit'}>Update game</button>

            </form>

        </section>
    ) : (
        <section>
            <h1>Loading...</h1>
        </section>
    )
}

export default GameUpdate;