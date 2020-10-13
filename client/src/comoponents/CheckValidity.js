import React, { useState } from 'react'
import { Input } from 'antd';
import { Layout, Card } from 'antd';

import '../App.css'

const baseUrl = 'http://localhost:8000'

const { Content } = Layout;

const { Search } = Input;

const CheckValidity = () => {

    const [valid, setValid] = useState(false)
    const[message, setMessage] = useState('');
    const [searched, setSearched] = useState(false);

    const onSearch = (registrationNumber) => {
        setSearched(true);
        return fetch(`${baseUrl}/${registrationNumber}`,{
            method: 'GET',
            headers: {
                ACCEPT: 'application/json',
                'Content-Type':'application/json',
            }
        })
        .then(response => {
            response.json()
            .then(data => {
                if(data.valid) {
                    setValid(true);
                    setMessage(data.message);
                }
                else {
                    setValid(false);
                    setMessage(data.error);
                }
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    return (
        <Content>
            <div className="main">
            <Search
                placeholder="input search text"
                onSearch={value => onSearch(value)}
                style={{ width: 400 }}
            />
            {valid && searched ? (<Card title="Valid" bordered={false} style={{ width: 400, marginTop: '16px'}}>
                        <p>{message}</p>
                </Card>) : null}
            {!valid && searched ? (<Card title="Invalid" bordered={false} style={{ width: 400, marginTop: '16px' }}>
                    <p>{message}</p>
            </Card>): null}    
                
            </div>
        </Content>
    )
}

export default CheckValidity
