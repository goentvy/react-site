import { Link, Outlet } from 'react-router-dom';


function Layout() {
    return (
        <div>
            <h2>홈페이지</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/react-site/">Home</Link>
                    </li>
                    <li>
                        <Link to="/react-site/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/react-site/fetch">Fetch</Link>
                    </li>
                    <li>
                        <Link to="/react-site/width">Width</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}

export default Layout;