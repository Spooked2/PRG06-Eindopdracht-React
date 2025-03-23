import {Link} from "react-router";
import './Home.css';

function Home() {

    return (
        <section>
            <h1>Court record</h1>

            <div className={'homeButtons'}>
                <Link to={'/games'}>Games</Link>
                <Link to={'/cases'}>Cases</Link>
                <Link to={'/evidence'}>Evidence</Link>
                <Link to={'/profiles'}>Profiles</Link>
            </div>
        </section>
    );
}

export default Home;