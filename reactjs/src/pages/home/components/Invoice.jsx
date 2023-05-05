import React, { useState, useEffect } from 'react';
import { Table, Switch  } from 'antd';
import {baseURL} from "../../../components/config";


function Invoice (props) {

    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const [intervalId, setIntervalId] = useState(-1);

    const fetchData = () => {
        // setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("authorization", "token " + props.token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseURL + "/api/subs/customer_invoice_view/?page=" + current, requestOptions)
            .then(response => response.text())
            .then(response => {
                let temp = JSON.parse(response);
                for (let i=0; i<temp.customer_invoices.length; ++i) temp.customer_invoices[i]['key'] = i;
                setData(temp.customer_invoices);
                setTotal(parseInt(temp.count))
                // setLoading(false);
            }).catch(error => console.log('error', error));

    };


    useEffect(() => {
        fetchData(current);
        window.clearInterval(intervalId)
        let interval = window.setInterval(() => {
            fetchData();
        }, 1000);
        setIntervalId(interval)
    }, [current]);


    const columns = [
        {
            title: 'Subscription Name',
            dataIndex: 'customer_subscription__subscription__name',
            key: 'customer_subscription__subscription__name',
        },
        {
            title: 'Price',
            dataIndex: 'customer_subscription__subscription__price',
            key: 'customer_subscription__subscription__price',
            render: (price) => (price+"$"),
        },
        {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Duration',
            dataIndex: 'customer_subscription__subscription__renewal_period',
            key: 'customer_subscription__subscription__renewal_period',
            render: (renewal_period) => (renewal_period+" seconds"),
        },
    ];


    return (
        <>
            <Table
                size={'small'}
                columns={columns}
                dataSource={data}
                pagination={{current:current,total:total,pageSize:5}}
                // loading={loading}
                onChange={(page_) => {
                    setCurrent(page_.current)
                }}/>
        </>
    );
};
export default Invoice;