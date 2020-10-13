import React, { useState } from 'react'
import { Layout, Form, Radio, Button, Input, Card } from 'antd';

const { Content } = Layout;
const baseUrl = 'http://localhost:8000'

const CreateReceipt = () => {

    const [form] = Form.useForm();
    const [created, setCreated] = useState(false);
    const [receiptData, setReceiptData] = useState('');

    const onFinish = ({journeyType, registrationNumber}) => {
        console.log('Received values of form: ', journeyType,registrationNumber );
        return fetch(`${baseUrl}/create`,{
            method: 'POST',
            headers: {
                ACCEPT: 'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({journeyType, registrationNumber})
        })
        .then(response => {
            response.json()
            .then(values => {
                form.resetFields();
                setCreated(true);
                setReceiptData(values.data);
            })
        })
        .catch(e => {
            console.log(e);
        })
      };

    return (
        <Content>
            <div className="main">
                <Form style={{width: 400} }
                    form={form}
                    name="validate_other"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="registrationNumber"
                        label="Registration Number"
                        rules={[
                        {
                            required: true,
                            message: 'Please Enter The Registration Number',
                        },
                        ]}
                    >
                        <Input placeholder="Please input your name" />
                    </Form.Item>
                    <Form.Item name="journeyType" label="Journey Type">
                        <Radio.Group>
                        <Radio value="One Way">One Way</Radio>
                        <Radio value="Two Way">Two Way</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                {created ? <Card title="Receipt" bordered={true} style={{ width: 400 }}>
                    <p>Toll id: {receiptData.tollnumber}</p>
                    <p>Registration Number: {receiptData.registrationNumber}</p>
                    <p>Journey Type: {receiptData.journeyType}</p>
                    <p>Toll Amount: {receiptData.amount}</p>
                    <p>Bill Issue Date:{receiptData.createdAt} </p>
                </Card> : null}
            </div>
        </Content>
    )
}

export default CreateReceipt
