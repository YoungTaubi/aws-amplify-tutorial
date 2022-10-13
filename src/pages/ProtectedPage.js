import { Auth, Storage } from 'aws-amplify';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../context/auth"

const ProtectedPage = () => {

    const { userContext, verifyUser } = useContext(AuthContext)

    const [name, setName] = useState(userContext?.attributes.name)
    const [address, setAddress] = useState(userContext?.attributes.address)
    const [profilePic, setProfilePic] = useState(null)

    Storage.configure({
        AWSS3: {
            bucket: 'profilepictures174250-dev',
            region: 'eu-central-1'
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await Auth.currentAuthenticatedUser()
        const userPicName = 'userPic-'+userContext.id  
        await Storage.put(userPicName, profilePic, {
            level: 'protected'
        })
        await Auth.updateUserAttributes(user, {
            'name': name,
            'address': address,
            'picture': userPicName
        });
        verifyUser()
    }

    const getProfilePic = () => {
        Storage.get(userContext.attributes.picture, {
            level: 'protected'
        })
        .then(picture => {
            setProfilePic(picture)
            console.log(picture);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getProfilePic()
    }, [])

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' onChange={e => { e.target.value.length > 0 && setName(e.target.value) }} placeholder='Name' />
                    <input type='text' onChange={e => { e.target.value.length > 0 && setAddress(e.target.value) }} placeholder='Address' />
                    <input type='file' onChange={e => setProfilePic(e.target.files[0])} />
                    <button type='submit'>Save Changes</button>
                </form>
            </div>
            <div>
                <h1>Protected Page</h1>
                <p>User E-mail: {userContext?.attributes.email}</p>
                <p>User Name: {userContext?.attributes.name}</p>
                <p>User Address: {userContext?.attributes.address}</p>
                <p>Pic Address: {userContext?.attributes.picture}</p>
                <img src={profilePic}/>
            </div>
        </>
    );
}

export default ProtectedPage;