
let initialState = {
    tasks: [],
    task: {},
    dailies: [],
    coins: Number
}

export function taskReducer(state=initialState, action){
    let taskList = state.tasks

    switch (action.type){
        case "GET_TASKS":
            return{
                ...state, tasks: action.payload
            }

        case "ARCHIVE_TASK":
            let index = taskList.findIndex(el => el._id.toString() === action.payload)

            taskList[index].isArchived = true

            return {
                ...state, tasks: taskList
            }

        case "DELETE_TASK":
            let afterDeleteLIst = taskList.filter(el => el._id !== action.payload)
            return {
                ...state, tasks: afterDeleteLIst
            }
        case "UPDATE_COINS":
            return {
                ...state, coins: action.payload
            }
        case "SET_DAILIES":
            return{
                ...state, dailies: action.payload
            }

        default:
            return state
    }
}

