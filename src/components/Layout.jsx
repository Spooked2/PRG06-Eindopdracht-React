import {Link, Outlet} from "react-router";
import './Layout.css';
import {EnvProvider} from "../context/EnvContext.jsx";

function Layout() {

    return (

        <EnvProvider>
            <header>
                <nav>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/cases'}>All cases</Link>
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
        </EnvProvider>
    );

}

export default Layout;