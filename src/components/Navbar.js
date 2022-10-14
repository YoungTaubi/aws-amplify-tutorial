import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const Navbar = () => {

    const { isLoggedIn, logOutUser, setRedirectTo } = useContext(AuthContext)

    return (
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li onClick={() => { setRedirectTo('/all-users') }}><Link to='/all-users'>All Users</Link></li>
                <li onClick={() => { setRedirectTo('/protected-page') }}><Link to='/protected-page'>Protected Page</Link></li>
                {
                    isLoggedIn ? <li><button onClick={logOutUser}>Logout</button></li> :
                        <li><Link to='/Login'>Login</Link></li>
                }
            </ul>
        </div>
    );
};

export default Navbar;