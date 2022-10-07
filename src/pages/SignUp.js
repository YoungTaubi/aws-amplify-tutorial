import { Link } from 'react-router-dom';

export default function SignUp() {

    return (
        <>
            <h1>Sign Up</h1>
            <p>Do you have an account already?</p>
            <button><Link to='/login'>Login</Link></button>
        </>
    )
}