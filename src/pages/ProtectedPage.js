import { Auth, Storage, API } from 'aws-amplify';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../context/auth"
import placeholderPic from '../assets/1200px-Placeholder_no_text.png'
import UserPic from '../components/UserPic';

const ProtectedPage = () => {

    const { userContext, verifyUser } = useContext(AuthContext)

    const [name, setName] = useState(userContext?.attributes.name)
    const [address, setAddress] = useState(userContext?.attributes.address)
    const [profilePicURL, setProfilePicURL] = useState('')
    const [profilePicFile, setProfilePicFile] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    Storage.configure({
        AWSS3: {
            bucket: 'profilepictures174250-dev',
            region: 'eu-central-1'
        }
    })

    const userPicTitle = 'userPic-' + userContext.id

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await Auth.currentAuthenticatedUser()
        if (profilePicFile) {
            await Storage.put(userPicTitle, profilePicFile, {
                level: 'public'
            })
        }
        await Auth.updateUserAttributes(user, {
            'name': name,
            'address': address,
            'picture': userPicTitle
        });
        e.target.picFile.value = ''
        getProfilePic()
        verifyUser()
    }

    const deleteProfilePic = () => {
        Storage.remove(userPicTitle)
        setProfilePicURL(placeholderPic)
    }

    const getProfilePic = async () => {
        const allPics = await Storage.list('')
        if (userPicTitle) {
            new Promise(resolve => {
                const checkForUserPic = allPics.some(pic => pic['key'] === userPicTitle)
                resolve(checkForUserPic)
            })
                .then((res) => {
                    if (res) {
                        Storage.get(userPicTitle, {
                            level: 'public'
                        })
                            .then(picture => {
                                setProfilePicURL(picture)
                                setIsLoading(false)
                            })
                            .catch(err => console.log(err))
                    }
                    else if (!res) {
                        setProfilePicURL(placeholderPic)
                        setIsLoading(false)
                    }
                })
        }
    }

    let nextToken

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
        return rest;
    }

    useEffect(() => {
        getProfilePic()
    }, [])

    return (
        <>
            <h1>Protected Page</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' onChange={e => { e.target.value.length > 0 && setName(e.target.value) }} placeholder='Name' />
                    <input type='text' onChange={e => { e.target.value.length > 0 && setAddress(e.target.value) }} placeholder='Address' />
                    <input type='file' name='picFile' onChange={e => { e.target.files[0] && setProfilePicFile(e.target.files[0]) }} />
                    <button type='submit'>Save Changes</button>
                </form>
            </div>
            <div>
                <p>User E-mail: {userContext?.attributes.email}</p>
                <p>User Name: {userContext?.attributes.name}</p>
                <p>User Address: {userContext?.attributes.address}</p>
                {isLoading ? <h1>Is loading</h1> :
                    <>
                        <img src={profilePicURL}
                            alt={userContext?.attributes.name + ' Profile Picture'}
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                        />
                    </>
                }

                {profilePicURL && <button onClick={deleteProfilePic}>Remove your profile picture</button>}
            </div>

        </>
    );
}

export default ProtectedPage;