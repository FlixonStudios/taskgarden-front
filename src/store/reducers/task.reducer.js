
let initialState = {
    tasks: []
}

export function taskReducer(state=initialState, action){
    switch (action.type){
        case "GET_TASKS":
            //console.log(action.payload)

            return{
                ...state, tasks: action.payload
            }
        default:
            return state    }

}