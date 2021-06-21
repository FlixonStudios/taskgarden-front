import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getTaskList} from "../../store/actions/task.action";

function Dashboard(props) {
    const [taskList, setTaskList] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTaskList())
    },[])
    let store = useSelector(state => state)
    console.log(store)

    return (
        <>
        <div>Dashboard</div>
        <div>Dashboard</div>
        <div>Dashboard</div>
        </>
    );
}

export default Dashboard;
