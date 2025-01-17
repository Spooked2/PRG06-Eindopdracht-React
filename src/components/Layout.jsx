import {Link, Outlet} from "react-router";
import './Layout.css';

function Layout() {

    return (
        <>
            <header>
                <nav>
                    <Link to={'/'}>Home</Link>
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>

            <footer>
                <p>Don't forget to update your autopsy report</p>
            </footer>
        </>
    );
}

export default Layout;