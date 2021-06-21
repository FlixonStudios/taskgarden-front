
let initialState = {
    tasks: []
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
        default:
            return state
    }
}