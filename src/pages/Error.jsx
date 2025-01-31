import {Link} from "react-router";

function Error() {

    return (
        <>
            <header>
                <nav>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/games'}>Games</Link>
                    <Link to={'/cases'}>Cases</Link>
                    <Link to={'/evidence'}>Evidence</Link>
                    <Link to={'/profiles'}>Profiles</Link>
                </nav>
            </header>

            <main>
                <section id={"errorPage"}>

                    <h1>Something went wrong!</h1>

                    <p>See the console and use the navigation bar to leave</p>

                </section>
            </main>
        </>
    )
}

export default Error;