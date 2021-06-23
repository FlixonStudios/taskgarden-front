
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
        case "UPDATE_COINS":
            return {
                ...state, coins: action.payload
            }
        case "SET_DAILIES":
            return{
                ...state, dailies: action.payload
            }
        case "ARCHIVE_DAILY":
            let dailiesArr = state.dailies
            let index = dailiesArr.findIndex(el => el._id === action.payload)
            dailiesArr[index] = !dailiesArr[index]
            console.log("daily arr hit")
            console.log(dailiesArr)
            return{
                ...state, dailies: dailiesArr
            }
        default:
            return state
    }
}

