import { Auth } from 'aws-amplify';
import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/auth"

const ProtectedPage = () => {

    const { userContext, verifyUser } = useContext(AuthContext)

    // const [name, setName] = useState(userContext?.attributes.name)
    // const [address, setAddress] = useState(userContext?.attributes.address)

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     await Auth.updateUserAttributes(userContext, {
    //         'name': name,
    //         'address': address
    //     });

    //     verifyUser()
    // }

    return (
        <>
            {/* <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' onChange={e => {e.target.value.length > 0 && setName(e.target.value)}} placeholder='Name' />
                    <input type='text' onChange={e => {e.target.value.length > 0 && setAddress(e.target.value)}} placeholder='Address' />
                    <button type='submit'>Save Changes</button>
                </form>
            </div> */}
            <div>
                <h1>Protected Page</h1>
                {/* <p>User E-mail: {userContext?.attributes.email}</p>
                <p>User Name: {userContext?.attributes.name}</p>
                <p>User Address: {userContext?.attributes.address}</p> */}
            </div>
        </>
    );
};

export default ProtectedPage;