import { Auth, Storage } from 'aws-amplify';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../context/auth"

const ProtectedPage = () => {

    const { userContext, verifyUser } = useContext(AuthContext)

    const [name, setName] = useState(userContext?.attributes.name)
    const [address, setAddress] = useState(userContext?.attributes.address)
    const [profilePicURL, setProfilePicURL] = useState('')
    const [profilePicFile, setProfilePicFile] = useState('')

    Storage.configure({
        AWSS3: {
            bucket: 'profilepictures174250-dev',
            region: 'eu-central-1'
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userPicName = 'userPic-' + userContext.id
        const user = await Auth.currentAuthenticatedUser()
        if (profilePicFile) {
            await Storage.put(userPicName, profilePicFile, {
                level: 'protected'
            })
        }
        await Auth.updateUserAttributes(user, {
            'name': name,
            'address': address,
            'picture': userPicName
        });
        e.target.picFile.value = ''
        getProfilePic()
        verifyUser()
    }

    const getProfilePic = () => {
        Storage.get(userContext.attributes.picture, {
            level: 'protected'
        })
            .then(picture => {
                setProfilePicURL(picture)
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
                    <input type='file' name='picFile' onChange={e => { e.target.files[0] && setProfilePicFile(e.target.files[0]) }} />
                    <button type='submit'>Save Changes</button>
                </form>
            </div>
            <div>
                <h1>Protected Page</h1>
                <p>User E-mail: {userContext?.attributes.email}</p>
                <p>User Name: {userContext?.attributes.name}</p>
                <p>User Address: {userContext?.attributes.address}</p>
                <img src={profilePicURL}
                    alt={userContext?.attributes.name + ' Profile Picture'}
                    style={{ border: "red 2px solid", width: "200px", height: "200px", objectFit: "cover" }}
                />
            </div>
        </>
    );
}

export default ProtectedPage;