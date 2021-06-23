
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

export function setDailies(dailies){
    return{
        type: "SET_DAILIES",
        payload: dailies
    }
}

export function archiveDaily(id){
    return{
        type: "ARCHIVE_DAILY",
        payload: id
    }
}


