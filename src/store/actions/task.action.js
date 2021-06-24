
export function setTaskList(tasks){
    return {
                type: "GET_TASKS",
                payload: tasks
    }
}

export function archiveTask(id) {
    return {
        type: "ARCHIVE_TASK",
        payload: id
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

export function updateCoins(coins){
    return{
        type: "UPDATE_COINS",
        payload: coins
    }
}
