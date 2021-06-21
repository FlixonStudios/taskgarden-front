import axios from "axios";

export function setTaskList(tasks){
    return {
                type: "GET_TASKS",
                payload: tasks
    }
}

export function addTask(task){
    return {
        type: "ADD_TASK",
        payload: task
    }
}