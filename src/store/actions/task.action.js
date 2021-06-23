
export function setTaskList(tasks){
    return {
                type: "GET_TASKS",
                payload: tasks
    }
}

export function removeTask(id){
    return{
        type: "DELETE_TASK",
        payload: id
    }
}
