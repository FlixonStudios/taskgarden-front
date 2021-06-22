import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Task from "./Task";

function SubBoard({tasks, isImportant, isUrgent, color, title}) {


    const style = {
        ...color,
        height: "35vh",
        boxShadow: "10px 10px 4px 0 rgba(0, 0, 0, 0.25)"
    }
    const titleStyle = {
        backgroundColor: "rgba(65, 90, 95, 0.25)",
        color: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)"
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
            {tasks.length > 0 && tasks.map(task => (
                    (task.isImportant === isImportant && task.isUrgent === isUrgent) &&
                    <Col md={6} key={task._id}>
                        <Task task={task}/>
                    </Col>

                )
            )}
            </Row>
        </Container>
    );
}

export default SubBoard;
