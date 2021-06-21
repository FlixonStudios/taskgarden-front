
let initialState = {
    tasks: []
}

export function taskReducer(state=initialState, action){
    switch (action.type){
        case "GET_TASKS":
            return{
                ...state, tasks: action.payload
            }
        case "ADD_TASK":

            let newArrayWithAddedItem = state.tasks
            newArrayWithAddedItem.push(action.payload)
            console.log(newArrayWithAddedItem)
            return {
                ...state, tasks: newArrayWithAddedItem
            }
        default:
            return state
    }
}