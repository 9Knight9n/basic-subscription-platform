import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Descriptions } from 'antd';


function Profile (props) {
    // const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!props.token)
    //         navigate("/login")
    // }, [props.token]);


    return (
        <>
            <Descriptions column={3} title="User Info" style={{width:'500px'}}>
                <Descriptions.Item label="UserName" span={2}>{props.username}</Descriptions.Item>
                <Descriptions.Item label="Credit">{props.credit}$</Descriptions.Item>
                <Descriptions.Item label="ID" span={2}>{props.id}</Descriptions.Item>
            </Descriptions>
        </>
    );
};
export default Profile;