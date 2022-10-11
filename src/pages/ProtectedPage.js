import React from 'react';
import Storage from '@aws-amplify/storage';

const ProtectedPage = () => {

    Storage.configure({
        AWSS3: {
            bucket: 'profile-pics174250-dev',
            region: 'eu-central-1'
        }
    })

    const S3ImageUpload = () => {
        
    }
    
    const onChange = async (file) => {
            const { key } = await Storage.put('example.png', file, {
                contentType: 'image/png'
            })

            console.log('S3 Object key', key)
        }


    return (
        <div>
            <h1>Protected Page</h1>

            <input
                type='file'
                accept='image/png'
                onChange={(e) => onChange(e.target.files[0])}
            />
        </div>
    );

}

export default ProtectedPage;