import React from 'react';
import { useContacts } from '../contexts/ContactsProvider';

export default function Contact() {
    const { contacts } = useContacts();

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-6'>
                    <textarea className='form-control' rows='35' />
                </div>
                <div className='col-sm-6'>
                </div>
            </div>
        </div>
    )
}
