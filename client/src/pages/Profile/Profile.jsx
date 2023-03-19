import React from "react";

const Profile = () => {
    return (
        <div className='row g-4'>
            <div className='col-12 col-md-9'>asd</div>
            <div className='col-12 col-md-3'>
                <div className='d-flex flex-column align-items-center'>
                    <div className='ratio ratio-100x100 rounded-circle overflow-hidden'>
                        <img
                            src='/images/demo.jpg'
                            alt=''
                            className='object-fit-cover'
                        />
                    </div>
                    <button>Upload</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
