import fetchFunc from "../../util/fetchFunc.jsx";
import {useState} from "react";

function ProfileCreate() {

    const [messages, setMessages] = useState({});

    const [formData, setFormData] = useState({
        names: [],
        ages: [],
        descriptions: [],
        images: [],
        cases: []
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

        await postNewProfile(formData);

    }

    const clearFormData = () => {
        setFormData({
            names: [],
            ages: [],
            descriptions: [],
            images: [],
            cases: []
        })
    }

    async function postNewProfile(newProfile) {

        const response = await fetchFunc('profiles', {
            method: 'POST',
            body: JSON.stringify(newProfile)
        });

        if (response.ok) {

            setMessages({success: "Profile was created!"});
            clearFormData();

        } else {

            setMessages({error: response.body.error});

        }

    }

    return (
        <section>

            <h1>Create a new profile</h1>

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

                <button type={'submit'}>Create profile</button>

            </form>

        </section>
    )
}

export default ProfileCreate;