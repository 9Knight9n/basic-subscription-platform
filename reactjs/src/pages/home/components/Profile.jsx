import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Descriptions, Space, Button, InputNumber  } from 'antd';
import {baseURL} from "../../../components/config";


function Profile (props) {
    const [loading, setLoading] = useState(false);
    const [credit, setCredit] = useState(props.credit);
    // const navigate = useNavigate();

    useEffect(() => {
        var intervalId = window.setInterval(function(){
            addCredit(0)
        }, 1000);
    }, []);

    function addCredit(addCredit) {
        if (!Number.isInteger(addCredit)) {
            setLoading(true)
            addCredit = parseInt(document.getElementById('add-credit').value.replace("$", "").replace(",", ""))
        }
        var myHeaders = new Headers();
        myHeaders.append("authorization", "token " + props.token);

        var formdata = new FormData();
        formdata.append("credit", addCredit.toString());

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(baseURL + "/api/subs/add_credit_view/", requestOptions)
            .then(response => response.text())
            .then(response => {
                let temp = JSON.parse(response);
                setCredit(temp.new_credit)
                setLoading(false)
            }).catch(error => console.log('error', error));
    }

    return (
        <>
            <Descriptions column={3} title="User Info">
                <Descriptions.Item label="UserName" span={2}>{props.username}</Descriptions.Item>
                <Descriptions.Item label="Credit">{credit}$</Descriptions.Item>
                <Descriptions.Item label="ID" span={2}>{props.id}</Descriptions.Item>
                <Descriptions.Item >
                    <Space.Compact
                        style={{
                            width: '100%',
                        }}
                    >
                        <InputNumber id={"add-credit"} min={10} max={10000} step={100} defaultValue={1000}
                                     formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                     parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                        <Button loading={loading} type="primary" onClick={addCredit}>Add Credit</Button>
                    </Space.Compact>
                </Descriptions.Item>
            </Descriptions>
        </>
    );
};
export default Profile;