import React, { useContext, useEffect, useState } from 'react';
import { resolvePath } from 'react-router-dom';
import UserPic from './UserPic';
import { UserInfoContext } from '../context/userInfo';

const UserCard = ({ user }) => {

    // const [userName, setUserName] = useState('')
    // const [userPictureTitle, setUserPictureTitle] = useState('')
    // const [userEmail, setUserEmail] = useState('')
    // const [userAdress, setAdress] = useState('')
    const [isLoading, setIsLoading] = useState(true) //not working

    // getUserAttributes(user)

    // console.log(userAttributes);



    const [userAttributes, setUserAttributes] = useState({
        userName: '',
        userPictureTitle: '',
        userEmail: '',
        userAdress: ''
    })

    const { userName, userEmail, userAdress, userPictureTitle } = userAttributes

    const getUserAttributes = (user) => {
        for (const [key, value] of Object.entries(user.Attributes)) {
            if (value['Name'] === 'name') {
                setUserAttributes(prevState => ({ ...prevState, userName: (value['Value']) }))
            }
            if (value['Name'] === 'picture') {
                setUserAttributes(prevState => ({ ...prevState, userPictureTitle: (value['Value']) }))
            }
            if (value['Name'] === 'email') {
                setUserAttributes(prevState => ({ ...prevState, userEmail: (value['Value']) }))
            }
            if (value['Name'] === 'address') {
                setUserAttributes(prevState => ({ ...prevState, userAdress: (value['Value']) }))
            }
        }
    }

    // const userAttributes = () => {
    //     // userInfo.Attributes.forEach(obj => {
    //     //     console.log(obj['value']);
    //     //     for (const [key, value] of Object.entries(userInfo.Attributes)) {
    //     //         // console.log(value['Name']);
    //     //         if (value['Name'] === 'name') {
    //     //             console.log(value['Value']);
    //     //             return
    //     //         }
    //     //     }
    //     // })  

    //     new Promise ((resolve) => {for (const [key, value] of Object.entries(userInfo.Attributes)) {

    //         if (value['Name'] === 'name') {
    //             setUserName(value['Value'])
    //         }
    //         if (value['Name'] === 'picture') {
    //             setUserPictureTitle(value['Value'])
    //         }
    //         if (value['Name'] === 'email') {
    //             setUserEmail(value['Value'])
    //         }
    //         if (value['Name'] === 'address') {
    //             setAdress(value['Value'])
    //         }}
    //         resolve('test')
    //     })
    //     .then((x) => {
    //         console.log('test', x);
    //         // setIsLoading(false)
    //     })
    // }

    useEffect(() => {
        getUserAttributes(user)
    }, [])

    return (
        <>
            {/* {isLoading ? <h1>Loading</h1> : 
                <div>
                    <UserPic picTitle={userPictureTitle} userName={userName} />
                    <p>{userName}</p>
                    <p>{userEmail}</p>
                    <p>{userAdress}</p>
                </div>
            } */}
            <div>
                <UserPic picTitle={userPictureTitle} userName={userName} />
                <p>{userName}</p>
                <p>{userEmail}</p>
                <p>{userAdress}</p>
            </div>
        </>
    );
};

export default UserCard;