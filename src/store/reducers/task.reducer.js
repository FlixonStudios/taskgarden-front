
let initialState = {
    tasks: [],
    dailies: [],
}

export function taskReducer(state=initialState, action){
    switch (action.type){
        case "GET_TASKS":
            return{
                ...state, tasks: action.payload
            }

        case "DELETE_TASK":
            let arr = state.tasks
            arr = arr.filter(el => el._id !== action.payload)
            return {
                ...state, tasks: arr
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
