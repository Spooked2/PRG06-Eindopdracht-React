import {Link, Outlet} from "react-router";
import './Layout.css';
import {EnvProvider} from "../context/EnvContext.jsx";

function Layout() {

    return (

        <EnvProvider>
            <header>
                <nav>
                    <Link to={'/'}>Home</Link>
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>

            <footer>
                <p>Copyright? nah</p>
            </footer>
        </EnvProvider>
    );

}

export default Layout;