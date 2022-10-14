import React, { useEffect, useState } from 'react';
import UserPic from './UserPic';

const UserCard = ({ userInfo }) => {

    const [userName, setUserName] = useState('')
    const [userPictureTitle, setUserPictureTitle] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userAdress, setAdress] = useState('')

    const userAttributes = () => {
        // userInfo.Attributes.forEach(obj => {
        //     console.log(obj['value']);
        //     for (const [key, value] of Object.entries(userInfo.Attributes)) {
        //         // console.log(value['Name']);
        //         if (value['Name'] === 'name') {
        //             console.log(value['Value']);
        //             return
        //         }
        //     }
        // })  

        for (const [key, value] of Object.entries(userInfo.Attributes)) {
            // console.log(value['Value']);
            if (value['Name'] === 'name') {
                setUserName(value['Value'])
            }
            if (value['Name'] === 'picture') {
                setUserPictureTitle(value['Value'])
            }
            if (value['Name'] === 'email') {
                setUserEmail(value['Value'])
            }
            if (value['Name'] === 'address') {
                setAdress(value['Value'])
            }
        }
    }

    useEffect(() => {
        userAttributes()
    }, [])

    return (
        <div>
            <UserPic picTitle={userPictureTitle} userName={userName} />
            <p>{userName}</p>
            <p>{userEmail}</p>
            <p>{userAdress}</p>
        </div>
    );
};

export default UserCard;