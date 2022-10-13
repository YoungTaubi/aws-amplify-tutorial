import React, { useEffect } from 'react';
import { useState } from "react"
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { GrClose } from 'react-icons/gr'

const ResetPassword = ({ email, setEmail, closeModal }) => {

    const [resetPasswordModal, setResetPasswordModal] = useState('requestCode')
    const [confCode, setConfcode] = useState('')
    const [requestCodeMsg, setRequestCodeMsg] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [evalPwdMsg, setEvalPwdMsg] = useState('')
    const [evaluateMatchingPwdMsg, setEvaluateMatchingPwdMsg] = useState('')
    const [enableSubmitButton, setEnableSubmitButton] = useState(true)

    const handeRequestCode = (e) => {
        e.preventDefault()
        Auth.forgotPassword(email)
            .then(() => {
                setResetPasswordModal('setNewPassword')
            })
            .catch(err => {
                console.log(err)
                setRequestCodeMsg(err.message)
            });
    }

    const handelSubmitNewPassword = (e) => {
        e.preventDefault()
        Auth.forgotPasswordSubmit(email, confCode, newPassword)
            .then((data) => {
                console.log('changed Pwd', data);
                setResetPasswordModal('pwdWasChanged')
            })
            .catch(err => console.log(err));
    }

    const evaluateMatchingPassword = () => {
        if (newPassword === confirmNewPassword && confirmNewPassword.length !== 0) {
            setEvaluateMatchingPwdMsg('Password matches')
            setEnableSubmitButton(false)
        } else if (confirmNewPassword.length > 0) {
            setEvaluateMatchingPwdMsg('Password does not match')
            setEnableSubmitButton(true)
        }
    }

    const evaluateNewPassword = () => {
        const required = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );
        if (newPassword) {
            if (required.test(newPassword) && newPassword.length > 8) {
                setEvalPwdMsg('Password fits the requirements')
            } else {
                setEvalPwdMsg('The password must be at least 8 characters long and contain a capital letter, special characters and a number')
            }
        }
    }

    useEffect(() => {
        evaluateMatchingPassword()
    }, [confirmNewPassword])

    useEffect(() => {
        evaluateNewPassword()
    }, [newPassword])


    return (
        <div>
            <GrClose onClick={() => closeModal(false)}/>
            {
                resetPasswordModal === 'requestCode' &&
                <div>
                    <form onSubmit={handeRequestCode}>
                        <input type='text' onChange={e => setEmail(e.target.value)} placeholder='E-mail' />
                        <button>Reset Password</button>
                    </form>
                    <p>{requestCodeMsg}</p>
                </div>
            }
            {
                resetPasswordModal === 'setNewPassword' &&
                <div>
                    <form onSubmit={handelSubmitNewPassword}>
                        <input type='number' onChange={e => setConfcode(e.target.value)} placeholder='Confirmation Code' />
                        <input type='password' onChange={e => setNewPassword(e.target.value)} placeholder='New Password' />
                        <input type='password' onChange={e => setConfirmNewPassword(e.target.value)} placeholder='Confirm New Password' />
                        <button disabled={enableSubmitButton}>Set new Password</button>
                    </form>
                    <p>{evalPwdMsg}</p>
                    <p>{evaluateMatchingPwdMsg}</p>
                </div>
            }
            {
                resetPasswordModal === 'pwdWasChanged' &&
                <div>
                    <p>Password was changed successfully</p>
                    <button onClick={() => closeModal(false)}><Link to='/login'>Back to Login</Link></button>
                </div>
            }
        </div>
    );
};

export default ResetPassword;