import React from 'react';
import {Button} from "react-bootstrap";

function RemoveDoneTaskButton(props) {

    

    return (
        <div>
            <Button variant={"success"}>
                Archive Done Tasks
            </Button>
        </div>
    );
}

export default RemoveDoneTaskButton;