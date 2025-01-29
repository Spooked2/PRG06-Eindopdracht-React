import {useEnv} from "../context/EnvContext.jsx";

function Home() {

    const env = useEnv();

    return (
        <section>
            <h1>Court record</h1>
            <p>{env.baseApiUrl}</p>
        </section>
    );
}

export default Home;