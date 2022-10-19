import { Auth, API } from "aws-amplify";
import React, { useEffect, useState } from "react";

import { AuthContext } from "./auth";

const UserInfoContext = React.createContext()

function UserInfoProviderWrapper(props) {

    const [isLoading, setIsLoading] = useState(true)
    const [allUsers, setAllUsers] = useState([])
    

    const getAllUsers = async () => {
        let apiName = 'AdminQueries';
        let path = '/listUsers';
        let myInit = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        API.get(apiName, path, myInit)
            .then(resFromApi => {
                setAllUsers(resFromApi.Users)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }    

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <UserInfoContext.Provider value={{ isLoading, allUsers }}>
            {props.children}
        </UserInfoContext.Provider>
    )
}

export { UserInfoProviderWrapper, UserInfoContext }

 