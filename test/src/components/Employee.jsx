import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [ctc, setCtc] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get('/api/employees/getEmp')
            .then(response => setEmployees(response.data));
    }, []);

    const addEmployee = () => {
        const axiosConfig={
            headers:{
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin":"*",
        }
    };
        axios.post('http://localhost:8080/api/postEmployee', { name, designation, ctc, email },axiosConfig )
            .then(response => {
                console.log(response,"RES")
                setEmployees([...employees, response.data]);
                setName('');
                setDesignation('');
                setCtc('');
                setEmail('');
            });
    };

    return (
        <div>
            <h2>Employees</h2>
            <div>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                <input value={designation} onChange={e => setDesignation(e.target.value)} placeholder="Designation" />
                <input value={ctc} onChange={e => setCtc(e.target.value)} placeholder="CTC" />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <button onClick={addEmployee}>Add Employee</button>
            </div>
            <ul>
                {employees.map(emp => (
                    <li key={emp.email}>{emp.name} - {emp.designation} - {emp.ctc} - {emp.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeComponent;
