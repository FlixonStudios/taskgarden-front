import axios from "axios";

export async function isAuth(){
    try{
        let isAuthenticated = await axios.get('/api/check', {
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })
        console.log(isAuthenticated)
        return true
    }catch(e){
        console.log(e.response)
        return false
    }
}

export async function getUser(){
    try{
        let user = await axios.get('/api/user',{
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })
        return user.data
    }catch(e){
        return {message: "Failed to get user"}
    }
}

export async function setUserStats(setAuth, setUser, setAdmin) {
    try {
        let {data} = await axios.get("/api/user", {
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })
        setAuth(true)
        if(data.user.isAdmin) setAdmin(true)
        setUser(data.user)
    } catch (e) {
        setAdmin(false)
        setAuth(false)
        setUser(null)
        await axios.delete("/api/logout", {
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })
        localStorage.removeItem("token")
    }
}
