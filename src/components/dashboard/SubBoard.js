import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Task from "./Task";
import TaskView from "./TaskView";

function SubBoard({tasks, getTasks, isImportant, isUrgent, color, title, border}) {
    // CSS
    const style = {
        ...color,
        height: "35vh",
        boxShadow: "10px 10px 4px 0 rgba(0, 0, 0, 0.25)",
        ...border
    }
    const titleStyle = {
        backgroundColor: "rgba(65, 90, 95, 0.25)",
        color: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)"
    }

    // Edit Task Modal
    const [editTaskShow, setEditTaskShow] = useState(false);

    // Clicked task state
    const [clickedTask, setClickedTask] = useState({})


    useEffect(()=>{
        console.log(tasks)
    },[])

    function handleEditTask(e, task) {
        setEditTaskShow(true)
        setClickedTask(task)
    }

    return (
        <Container style={style}>
            <Row className="mx-auto" style={{height: "15%"}}>
                <Col md={5}></Col>
                <Col md={2} style={titleStyle} className="px-0 py-1 my-auto">
                    {title}
                </Col>
            </Row>
            <Row className="mt-3">
                <RenderTasks tasks={tasks} isImportant={isImportant} isUrgent={isUrgent} handleEditTask={handleEditTask}/>
            </Row>
            <TaskView editTaskShow={editTaskShow}
                      setEditTaskShow={setEditTaskShow}
                      clickedTask={clickedTask}
                      setClickedTask={setClickedTask}
                      getTasks={getTasks}/>
        </Container>
    );
}

function RenderTasks({tasks, isImportant, isUrgent, handleEditTask}){
    if (tasks === undefined){
        return(
            <>
                Error unable to get Tasks...
            </>
        )
    }
    if (tasks.length >= 0){
        return(
            <>
                {tasks.map(task => (
                        (task.isImportant === isImportant && task.isUrgent === isUrgent) &&
                        <Col md={6} key={task._id} onClick={(e) => handleEditTask(e, task)}>
                            <Task task={task}/>
                        </Col>
                    )
                )}
            </>
        )
    }
    return(
        <></>
    )
}

export default SubBoard;
