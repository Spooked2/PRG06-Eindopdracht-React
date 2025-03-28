import {Link, Outlet} from "react-router";
import './Layout.css';
import {EnvProvider} from "../context/EnvContext.jsx";

function Layout() {

    return (

        <EnvProvider>
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
                <Outlet/>
            </main>
        </EnvProvider>
    );

}

export default Layout;