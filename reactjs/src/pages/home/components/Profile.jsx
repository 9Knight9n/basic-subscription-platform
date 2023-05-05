import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Descriptions, Space, Button, InputNumber  } from 'antd';


function Profile (props) {
    // const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!props.token)
    //         navigate("/login")
    // }, [props.token]);


    return (
        <>
            <Descriptions column={3} title="User Info">
                <Descriptions.Item label="UserName" span={2}>{props.username}</Descriptions.Item>
                <Descriptions.Item label="Credit">{props.credit}$</Descriptions.Item>
                <Descriptions.Item label="ID" span={2}>{props.id}</Descriptions.Item>
                <Descriptions.Item >
                    <Space.Compact
                        style={{
                            width: '100%',
                        }}
                    >
                        <InputNumber step={100} defaultValue={1000}
                                     formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                     parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                        <Button type="primary" >Add Credit</Button>
                    </Space.Compact>
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};
export default Profile;