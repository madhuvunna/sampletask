// VendorComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorComponent = () => {
    const [vendors, setVendors] = useState([]);
    const [name, setName] = useState('');
    const [upi, setUpi] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const axiosConfig={
            headers:{
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*",
        }
    };
        axios.get('/vendors',axiosConfig)
            .then(response => setVendors(response.data));
    }, []);

    const addVendor = () => {
        axios.post('/vendors/', { name, upi, email })
            .then(response => {
                setVendors([...vendors, response.data]);
                setName('');
                setUpi('');
                setEmail('');
            });
    };

    const sendEmails = () => {
        const emails = vendors.map(vendor => vendor.email);
        axios.post('/vendors/send-email', emails)
            .then(() => alert('Emails sent!'));
    };

    return (
        <div>
            <h2>Vendors</h2>
            <div>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                <input value={upi} onChange={e => setUpi(e.target.value)} placeholder="UPI" />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <button onClick={addVendor}>Add Vendor</button>
            </div>
            
            <button onClick={sendEmails}>Send Emails</button>
            
            <ul>
                {vendors.map(vendor => (
                    <li key={vendor.email}>{vendor.name} - {vendor.upi} - {vendor.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default VendorComponent;
