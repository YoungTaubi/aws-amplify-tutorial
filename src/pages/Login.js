import { useContext, useState } from "react"
import { AuthContext } from "../context/auth"
import ResetPassword from "../components/ResetPassword"
import { Link } from 'react-router-dom';

export default function Login() {

    const { signIn, wrongCredentialsMsg } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false)

    const handleSubit = (e) => {
        e.preventDefault()
        signIn(email, password)
    }

    const closeModal = () => {
        setForgotPasswordModal(false)
    }

    return (
        <>
            <form onSubmit={handleSubit}>
                <input type='text' onChange={e => setEmail(e.target.value)} placeholder='E-mail' />
                <input type='password' onChange={e => setPassword(e.target.value)} placeholder='Password' />
                <button>Login</button>
            </form>
            <p>{wrongCredentialsMsg}</p>
            <p>Don´t have an account yet?</p>
            <button><Link to='/signup'>Sign Up</Link></button>
            <p onClick={() => setForgotPasswordModal(true)}>Did you forget your password?</p> 
            {
                forgotPasswordModal && <ResetPassword 
                email={email} 
                setEmail={setEmail}
                closeModal={closeModal}
                /> 
            }           
        </>
    )
}