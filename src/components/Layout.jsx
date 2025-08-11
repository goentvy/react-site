import { Link, Outlet } from 'react-router-dom';


function Layout() {
    return (
        <div>
            <h2>홈페이지</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}

export default Layout;