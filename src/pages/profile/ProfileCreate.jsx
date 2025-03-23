import fetchFunc from "../../util/fetchFunc.jsx";
import {useEffect, useState} from "react";
import ArrayInput from "../../components/ArrayInput.jsx";
import ArrayInputCases from "../../components/ArrayInputCases.jsx";
import FetchError from "../../components/FetchError.jsx";
import {useNavigate} from "react-router";

function ProfileCreate() {

    const navigate = useNavigate();

    const [messages, setMessages] = useState({});

    const [names, setNames] = useState([]);
    const [ages, setAges] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [images, setImages] = useState([]);
    const [gameCases, setGameCases] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [readyToSend, setReadyToSend] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const res = await fetchFunc('cases', {
            method: 'GET'
        });

        if (res.ok) {
            setGameCases(res.body.items);
        } else {
            setFetchError({cause: res.status, message: res.statusText});
        }
    }

    const [formData, setFormData] = useState({
        names: [],
        ages: [],
        descriptions: [],
        images: [],
        cases: []
    });

    const submitHandler = async (e) => {

        e.preventDefault();

        const caseIds = [];

        for (const description of descriptions) {
            if (!caseIds.includes(description.case)) {
                caseIds.push(description.case);
            }
        }

        setFormData({
            names: names,
            ages: ages,
            descriptions: descriptions,
            images: images,
            cases: caseIds
        });

        setReadyToSend(true);

    }

    useEffect(() => {

        for (const [key, value] of Object.entries(formData)) {

            if (!Array.isArray(value)) {
                setMessages({error: `${key} is not an array`});
                return;
            }

            if (value.length <= 0) {
                setMessages({error: `${key} can not be empty`});
                return;
            }

        }

        postNewProfile(formData);

    }, [readyToSend])

    async function postNewProfile(newProfile) {

        const response = await fetchFunc('profiles', {
            method: 'POST',
            body: JSON.stringify(newProfile)
        });

        if (response.ok) {

            setMessages({success: "Profile was created!"});

            navigate('/profiles/' + response.body.profile.id);

        } else {

            setMessages({error: response.body.error});

        }

    }

    function handleFileChange(e) {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {

            const newImage = {
                mime: file.type,
                data: reader.result.split(',')[1]
            }

            setImages([...images, newImage]);
        }

    }

    function removeImage(e) {
        setImages(images.toSpliced(e.target.id, 1));
    }

    if (fetchError) {
        return <FetchError error={fetchError}/>
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

                <ArrayInput name={'name'} array={names} setArray={setNames}/>

                <ArrayInput name={'age'} array={ages} setArray={setAges}/>

                {gameCases.length > 0 ?
                    (<ArrayInputCases name={'description'} array={descriptions} setArray={setDescriptions}
                                      gameCases={gameCases}/>)
                    : <h3>Loading...</h3>
                }

                <div className={'fileUpload'}>
                    <label htmlFor="images">Images</label>
                    <input type="file" name={'images'} id={'images'} onChange={handleFileChange}/>

                    <div className={'imageDisplay'}>
                        {images.length > 0 ? images.map(image =>
                            (<div key={images.indexOf(image)} id={`${images.indexOf(image)}`} onClick={removeImage}>
                                <img src={`data:${image.mime};base64, ${image.data}`}
                                     alt={"Uploaded Image"}/>
                            </div>)
                        ) : ''}
                    </div>
                </div>

                <button type={'submit'}>Create profile</button>

            </form>

        </section>
    )
}

export default ProfileCreate;