import React from 'react';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

function RemoveDoneTaskButton({getTasks}) {
    let tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    async function archiveTasks(){
        try{
            let tasksToArchive = []
            let tasks = await getTasks()

            tasksToArchive = tasks.filter(el => {
                return (el.status === "Completed")
            })

            for(let i = 0; i < tasksToArchive.length; i++){
                await setTaskIsArchived(tasksToArchive[i]._id)
            }
        }catch(e){
            console.log(e)
        }

    }
    async function setTaskIsArchived(id){
        try{
            let task = await axios.post(`/api/tasks/edit/${id}`, {isArchived: true} ,{
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            console.log(task.data)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div>
            <Button variant={"success"} onClick={archiveTasks}>
                Archive Done Tasks
            </Button>
        </div>
    );
}

export default RemoveDoneTaskButton;