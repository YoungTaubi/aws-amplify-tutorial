import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {

    const [userContext, setContextUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [redirectTo, setRedirectTo] = useState('/')
    const [wrongCredentialsMsg, setWrongCredentialsMsg] = useState('')

    const navigate = useNavigate()

    const logOutUser = () => {
        Auth.signOut()
        setIsLoggedIn(false)
        setContextUser(null)
    }

    const signUp = async (email, password) => {
        try {
            await Auth.signUp({ username: email, password })
        }
        catch (err) {
            console.log(err);
        }
    }

    const confirmSignUp = async (email, password, authCode) => {
        await Auth.confirmSignUp(email, authCode)
        signIn(email, password)
    }

    const signIn = async (email, password) => {
        try {
            await Auth.signIn(email, password)
            const currentUser = await Auth.currentAuthenticatedUser()
            if (currentUser) {
                setWrongCredentialsMsg('')
                verifyUser()
                .then(() => {
                    navigate(redirectTo)
                })
            }
        }
        catch (err) {
            console.log(err);
            setWrongCredentialsMsg('Sry, either E-Mail or Password are not correct!')
        }
    }

    const verifyUser = async () => {
        console.log('verifying');
        try {
            const currentUser = await Auth.currentAuthenticatedUser()
            if (currentUser) {
                const userInfo = await Auth.currentUserInfo()
                setContextUser(userInfo)
                setIsLoggedIn(true)
                setIsLoading(false)
                console.log('user logged in');
            }
        }
        catch {
            setContextUser(null)
            setIsLoggedIn(false)
            setIsLoading(false)
            console.log('no user');
        }
    }

    useEffect(() => {
        verifyUser()
    }, [])

    // useEffect(() => {
    //     console.log(userContext);
    // }, [userContext])

    return (
        <AuthContext.Provider value={{ isLoggedIn, userContext, isLoading, logOutUser, verifyUser, signUp, signIn, confirmSignUp, setRedirectTo, wrongCredentialsMsg }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }

