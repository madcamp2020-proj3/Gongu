import React from 'react';

export default function Contact({ room }) {
    console.log("방 정보: ", room);
    return (
        <div className='container'>
            <div className='flex flex-col'>
                {/* <div>{room['title']}</div> */}
            </div>
            {/* <div className='row'>
                <div className='ml-3 mt-1'>
                    <textarea className='form-control' rows='35' />
                </div>
                <div className='col-sm-6'>
                </div>
            </div> */}
        </div>
    )
}
