import { Auth } from 'aws-amplify';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth"

export default function SignUp() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [evalPwdMsg, setEvalPwdMsg] = useState('')
    const [evaluateMatchingPwdMsg, setEvaluateMatchingPwdMsg] = useState('')
    const [enableSubmitButton, setEnableSubmitButton] = useState(true)
    const [signUpState, setSignUpState] = useState('enterEmail')
    const [confCode, setConfcode] = useState('')

    const { signUp, confirmSignUp } = useContext(AuthContext)

    const handelSubmit = (e) => {
        e.preventDefault()
        signUp(email, password)
        setSignUpState('enterConfCode')
    }

    const handelConfCodeSubmit = (e) => {
        e.preventDefault()
        confirmSignUp(email, password, confCode)
    }

    const evaluateMatchingPassword = () => {
        if (password === confirmPassword && confirmPassword.length !== 0) {
            setEvaluateMatchingPwdMsg('Password matches')
            setEnableSubmitButton(false)
        } else if (confirmPassword.length > 0) {
            setEvaluateMatchingPwdMsg('Password does not match')
            setEnableSubmitButton(true)
        }
    }

    const evaluatePassword = () => {
        const required = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );
        if (password) {
            if (required.test(password) && password.length > 8) {
                setEvalPwdMsg('Password fits the requirements')
            } else {
                setEvalPwdMsg('The password must be at least 8 characters long and contain a capital letter, special characters and a number')
            }
        }
    }

    useEffect(() => {
        evaluateMatchingPassword()
    }, [confirmPassword])

    useEffect(() => {
        evaluatePassword()
    }, [password])

    return (
        <>
            <h1>Sign Up</h1>

            { signUpState === 'enterEmail' &&
                <div>
                    <form onSubmit={handelSubmit}>
                        <input type='email' onChange={e => setEmail(e.target.value)} placeholder='E-mail' />
                        <input type='text' onChange={e => setUsername(e.target.value)} placeholder='Username' />
                        <input type='password' onChange={e => setPassword(e.target.value)} placeholder='Password' />
                        <input type='password' onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
                        <button disabled={enableSubmitButton}>Sign Up</button>
                    </form>
                    <p>{evalPwdMsg}</p>
                    <p>{evaluateMatchingPwdMsg}</p>
                </div>
            }
            { signUpState === 'enterConfCode' &&
                <div>
                    <form onSubmit={handelConfCodeSubmit}>
                        <input type='number' onChange={e => setConfcode(e.target.value)} placeholder='Confirmation Code' />
                        <button disabled={enableSubmitButton}>Sign Up</button>
                    </form>
                </div>
            }

            <p>Do you have an account already?</p>
            <button><Link to='/login'>Login</Link></button>
        </>
    )
}