import axios from "axios";

export function getTasks(){
    return async function(dispatch){
        try{
            let {data} = await axios.get(`/api/`,{
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }})
            dispatch({
                type: "GET_TASKS",
                payload: data.tasks
            })
        }catch(e){
            console.log(e)
        }
    }
}