import React from 'react';
import {Col} from "react-bootstrap";
import Task from "./Task";

function SubBoard({tasks, isImportant, isUrgent, color}) {

    const style = {...color, ...{"height":"100%"}}

    return (
        <div style={style}>
            {tasks.length > 0 && tasks.map(task => {
                if (task.isImportant === isImportant && task.isUrgent === isUrgent){
                    return(
                        <Col md={6} key={task._id}>
                            <Task task={task}/>
                        </Col>
                    )
                }
            })}
        </div>
    );
}

export default SubBoard;