
let initialState = {
    tasks: [],
    task: {}
}

export function taskReducer(state=initialState, action){
    let taskList = state.tasks

    switch (action.type){
        case "GET_TASKS":
            return{
                ...state, tasks: action.payload
            }

        case "GET_TASK":
            let task = taskList.find(el => el._id === action.payload)
            return {
                ...state, tasks: task
            }

        case "DELETE_TASK":
            let afterDeleteLIst = taskList.filter(el => el._id !== action.payload)
            return {
                ...state, tasks: afterDeleteLIst
            }
        default:
            return state
    }
}
