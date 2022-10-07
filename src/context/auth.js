import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {

    const [userContext, setContextUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    const logOutUser = () => {
        Auth.signOut()
        setIsLoggedIn(false)
        setContextUser(null)
    }

    const signUp = async (email, password, username) => {
        await Auth.signUp({ email, password, username })
    }

    const confirmSignUp = async (email, password, authCode) => {
        await Auth.confirmSignUp(email, authCode)
        await Auth.signIn(email, password)

    }

    const signIn = async (email, password) => {
        await Auth.signIn(email, password)
    }

    const verifyUser = async () => {
        console.log('verifying');
        try {
            const currentUser = await Auth.currentAuthenticatedUser()
            if (currentUser) {
                setContextUser(currentUser)
                setIsLoggedIn(true)
                setIsLoading(false)
            }
        }
        catch {
            setContextUser(null)
            setIsLoggedIn(false)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyUser()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, userContext, isLoading, logOutUser, verifyUser, signUp, signIn, confirmSignUp}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }

