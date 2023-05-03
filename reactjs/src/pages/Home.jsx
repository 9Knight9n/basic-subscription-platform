import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";


function Home (props) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!props.token)
    //         navigate("/login")
    // }, [props.token]);


    return (<p>Home</p>);
};
export default Home;