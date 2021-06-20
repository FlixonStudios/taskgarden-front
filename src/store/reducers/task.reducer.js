
let initialState = {
    tasks: [{
        name: "test",
        description: "what is redux, what is life?"
    }]
}

export function taskReducer(state=initialState, action){
    switch (action.type){
        case "GET_TASKS":
            console.log("get tasks reducer hit")
            return{
                ...state
            }
    }
}