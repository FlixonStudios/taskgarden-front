
let initialState = {
    tasks: []
}

export function taskReducer(state=initialState, action){
    switch (action.type){
        case "GET_TASKS":
            return{
                ...state
            }
    }
}