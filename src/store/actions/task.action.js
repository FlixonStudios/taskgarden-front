import axios from "axios";

export function setTaskList(tasks){
    return {
                type: "GET_TASKS",
                payload: tasks
            }
}