import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Profile from "./components/Profile";
import { Tabs } from 'antd';
import Subscription from "./components/Subscription";


function Home (props) {
    const [loading, setLoading] = useState(false);
    // const [tab, setTab] = useState(1);
    const navigate = useNavigate();

    const items = [
        {
            key: '1',
            label: 'Subscriptions',
            children: <Subscription token={props.token} id={props.id}/>,
        },
        {
            key: '2',
            label: 'Invoices',
            children: `Content of Tab Pane 2`,
        },
    ];

    // useEffect(() => {
    //     if (!props.token)
    //         navigate("/login")
    // }, [props.token]);


    return (
        <div style={{display:'flex',flexDirection:'column'}}>
            <Profile id={props.id} username={props.username} credit={props.credit}/>
            <Tabs style={{width:'500px'}} defaultActiveKey="1" items={items}/>
        </div>
    );
};
export default Home;