import React, { useState, useEffect } from 'react';
import { Table, Switch  } from 'antd';
import {baseURL} from "../../../components/config";


function Subscription (props) {

    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState([]);
    const [dataActive, setDataActive] = useState([]);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("authorization", "token " + props.token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseURL + "/api/subs/customer_available_subscription_view/", requestOptions)
            .then(response => response.text())
            .then(response => {
                let temp = JSON.parse(response);
                let n = temp.available_subscription.length
                let a = new Array(n); for (let i=0; i<n; ++i) a[i] = false;
                setDataLoading(a)
                let b = new Array(n); for (let i=0; i<n; ++i) b[i] = temp.available_subscription[i]['is_active'];
                setDataActive(b)
                for (let i=0; i<n; ++i) temp.available_subscription[i]['key'] = i;
                setData(temp.available_subscription)
            }).catch(error => console.log('error', error));
    }, []);


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (price+"$"),
        },
        {
            title: 'Duration',
            dataIndex: 'renewal_period',
            key: 'renewal_period',
            render: (renewal_period) => (renewal_period+" seconds"),
        },
        {
            title: 'Status',
            dataIndex: 'key',
            key: 'status',
            render: (_,record) => (<Switch loading={dataLoading[_]} checked={dataActive[_]} onChange={async () => {
                await changeSubscriptionStatus(record['id'],_)
            }} defaultChecked />),
        },
    ];

    function changeSubscriptionStatus(id,index) {
        setDataLoading([
            ...dataLoading.slice(0,index),
            true,
            ...dataLoading.slice(index+1,dataLoading.length)]
        )


        var myHeaders = new Headers();
        myHeaders.append("authorization", "token " + props.token);

        var formdata = new FormData();
        formdata.append("subscription__id", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(baseURL + "/api/subs/activate_subscription_view/", requestOptions)
            .then(response => response.text())
            .then(response => {
                let temp = JSON.parse(response);
                setDataActive([
                    ...dataActive.slice(0,index),
                    temp.is_active,
                    ...dataActive.slice(index+1,dataActive.length)]
                )
            }).catch(error => console.log('error', error));


        setDataLoading([
            ...dataLoading.slice(0,index),
            false,
            ...dataLoading.slice(index+1,dataLoading.length)]
        )

    }

    return (
        <>
            <Table size={'small'} pagination={
                {
                    position: ['none', 'none'],
                }
            } columns={columns} dataSource={data} />
        </>
    );
};
export default Subscription;