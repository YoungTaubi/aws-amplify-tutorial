import { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([])

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
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllUsers()
        setTimeout(() => console.log(allUsers), 500)
    }, [])

    return (
        <div>
            {allUsers.map(user => (
                <UserCard key={user.Username} userInfo={user}/>
            ))}

        </div>
    );
};

export default AllUsers;