import React, { useEffect, useState } from 'react';
import Storage from '@aws-amplify/storage';
import { Auth, API } from 'aws-amplify';

const ProtectedPage = () => {

    const [adress, setAdress] = useState('')
    const [profilePic, setProfilePic] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    Storage.configure({
        AWSS3: {
            bucket: 'profile-pics152455-deloris',
            region: 'eu-central-1'
        }
    })

    const getCurrentUser = () => {
        // Auth.currentUserCredentials()
        // Auth.userData()
        Auth.currentUserInfo()
        .then(userData => {
            setCurrentUser(userData)
            console.log(userData);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const onChange = async (file) => {
        const { key } = await Storage.put('example.png', file, {
            contentType: 'image/png'
        })

        console.log('S3 Object key', key)
    }

    const handleSubmit = async (e) => { 
        e.preventDefault()
        const userPicName = 'userPic//'+currentUser.id     
        const user = await Auth.currentAuthenticatedUser();
        await Storage.put(userPicName, profilePic, {
            // level: 'protected'
        })
        await Auth.updateUserAttributes(user, {
            'address': adress,
            'picture': userPicName
        });
        console.log(user);

    }

    let nextToken;

    async function listEditors() {
        let apiName = 'AdminQueries';
        let path = '/listUsers';
        let myInit = {
            queryStringParameters: {
                "groupname": "Editors",
                "limit": 20,
                "token": nextToken
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        const { NextToken, ...rest } = await API.get(apiName, path, myInit);
        nextToken = NextToken;
        console.log(rest);
        return rest;
    }

    listEditors()

    useEffect(() => {
        getCurrentUser()
    }, [])



    return (
        <div>
            <h1>Protected Page</h1>

            <form onSubmit={handleSubmit}>
                <input type='text' onChange={e => setAdress(e.target.value)} placeholder='Adress' />
                <input type='file' onChange={e => setProfilePic(e.target.file)} placeholder='Select Image' />
                <button type='submit'>Save Changes</button>
            </form>

            <p>{currentUser?.attributes.picture}</p>
            <p>{currentUser?.attributes.address}</p>

            <input
                type='file'
                onChange={(e) => onChange(e.target.files[0])}
            /> 
        </div>
    );

}

export default ProtectedPage;