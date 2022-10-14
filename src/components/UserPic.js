import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

const UserPic = ({ userName, picTitle }) => {

    const [profilePicURL, setProfilePicURL] = useState('')

    Storage.configure({
        AWSS3: {
            bucket: 'profilepictures174250-dev',
            region: 'eu-central-1'
        }
    })

    const getProfilePic = () => {
        Storage.get(picTitle, {
            level: 'public'
        })
            .then(picture => {
                setProfilePicURL(picture)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getProfilePic()
    }, [])

    useEffect(() => {
        getProfilePic()
    }, [profilePicURL])

    return (
        <div>
            <img
                src={profilePicURL}
                alt={userName + ' Profile Picture'}
                style={{ border: "red 2px solid", width: "200px", height: "200px", objectFit: "cover" }}
            />

        </div>
    );
};

export default UserPic;