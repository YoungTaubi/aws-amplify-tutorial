import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const Navbar = () => {

    const { isLoggedIn, logOutUser } = useContext(AuthContext)

    return (
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/protected-page'>Protected Page</Link></li>
                <li><Link to='/Login'>Login</Link></li>
                <li><button onClick={logOutUser}>Logout</button></li>
            </ul>

        </div>
    );
};

export default Navbar;