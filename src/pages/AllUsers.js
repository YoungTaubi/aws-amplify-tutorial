import { API, Auth } from 'aws-amplify';
import React, { useContext, useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { UserInfoContext } from '../context/userInfo';

const AllUsers = () => {

    // const [allUsers, setAllUsers] = useState([])

    const { allUsers, isLoading, setIsLoading } = useContext(UserInfoContext)


    // let nextToken

    // async function listEditors() {
    //     let apiName = 'AdminQueries';
    //     let path = '/listUsers';
    //     let myInit = {
    //         queryStringParameters: {
    //             "groupname": "Editors",
    //             "limit": 20,
    //             "token": nextToken
    //         },
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
    //         }
    //     }
    //     const { NextToken, ...rest } = await API.get(apiName, path, myInit);
    //     nextToken = NextToken;
    //     console.log(rest);
    //     return rest;
    // }

    // const getAllUsers = async () => {
    //     let apiName = 'AdminQueries';
    //     let path = '/listUsers';
    //     let myInit = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
    //         }
    //     }
    //     API.get(apiName, path, myInit)
    //         .then(resFromApi => {
    //             setAllUsers(resFromApi.Users)
    //         })
    //         .catch(err => console.log(err))
    // }

    // useEffect(() => {
    //     getAllUsers()
    //     setTimeout(() => console.log(allUsers), 500)
    // }, [])

    return (
        <div>
            <h1>All Users</h1>
            {isLoading ? <h1>Is Loading</h1> :
                
                    allUsers.map(user => (
                        <UserCard key={user.Username} user={user} />
                    ))
                
            }


        </div>
    );
};

export default AllUsers;