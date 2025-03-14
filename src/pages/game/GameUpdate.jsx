import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import fetchFunc from "../../util/fetchFunc.jsx";
import FetchError from "../../components/FetchError.jsx";

function GameUpdate() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [fetchError, setFetchError] = useState(false);
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

        const response = await fetchFunc('games', {
            method: 'GET',
            id: id
        });

        if (response.ok) {
            setGame(response.body);
        } else {
            setFetchError({cause: response.status, message: response.statusText});
        }

    }

    async function putUpdatedGame(updatedGame) {

        const response = await fetchFunc('games', {
            method: 'PUT',
            id: id,
            body: JSON.stringify(updatedGame)
        });

        if (response.ok) {

            setMessages({success: "Game was updated!"});

        } else {

            setMessages({error: response.body.error});

        }

    }

    if (fetchError) {
        return <FetchError error={fetchError}/>
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