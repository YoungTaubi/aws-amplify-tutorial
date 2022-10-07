import React from 'react';
import { useContext, useState } from "react"
import { Auth } from 'aws-amplify';

const ResetPassword = ({ email, setEmail }) => {

    const [resetPasswordModal, setResetPasswordModal] = useState('requestCode')
    const [confCode, setConfcode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordMatchMsg, setPasswordMatchMsg] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const handeRequestCode = (e) => {
        e.preventDefault()
        Auth.forgotPassword(email)
            .then(data => {
                console.log(data);
                setResetPasswordModal('setNewPassword')
            })
            .catch(err => console.log(err));
    }

    const handelSubmitNewPassword = (e) => {
        e.preventDefault()
        Auth.forgotPasswordSubmit(email, confCode, newPassword)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }


    return (
        <div>
            {
                resetPasswordModal === 'requestCode' &&
                <div>
                    <form onSubmit={handeRequestCode}>
                        <input type='text' onChange={e => setEmail(e.target.value)} placeholder='E-mail' />
                        <button>Reset Password</button>
                    </form>
                </div>
            }
            {
                resetPasswordModal === 'setNewPassword' &&
                <div>
                    <form onSubmit={handelSubmitNewPassword}>
                        <input type='number' onChange={e => setConfcode(e.target.value)} placeholder='Confirmation Code' />
                        <input type='password' onChange={e => setNewPassword(e.target.value)} placeholder='New Password' />
                        <input type='password' onChange={e => setConfirmNewPassword(e.target.value)} placeholder='New Password' />
                        <button>Set new Password</button>
                    </form>
                </div>
            }

        </div>
    );
};

export default ResetPassword;