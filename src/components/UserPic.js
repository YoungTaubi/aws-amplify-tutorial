import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import placeholderPic from '../assets/1200px-Placeholder_no_text.png'

const UserPic = ({ userName, picTitle }) => {

    const [profilePicURL, setProfilePicURL] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    Storage.configure({
        AWSS3: {
            bucket: 'profilepictures174250-dev',
            region: 'eu-central-1'
        }
    })

    const getProfilePic = async () => {
        const allPics = await Storage.list('')
        if (picTitle) {
            new Promise(resolve => {
                const checkForUserPic = allPics.some(pic => pic['key'] === picTitle)
                resolve(checkForUserPic)
            })
                .then((res) => {
                    if (res) {
                        Storage.get(picTitle, {
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

    useEffect(() => {
        getProfilePic()
    }, [])

    useEffect(() => {
        getProfilePic()
    }, [profilePicURL, picTitle])

    return (
        <div>
            {isLoading ? <h1>Is loading</h1> :
                <>
                    <img src={profilePicURL}
                        alt={userName + ' Profile Picture'}
                        style={{ width: "200px", height: "200px", objectFit: "cover" }}
                    />
                </>
            }
        </div>
    );
};

export default UserPic;