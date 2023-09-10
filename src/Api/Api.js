import axios from "axios";
const url = "http://localhost:3004";
const fetchdata = (endpoint, id='')=>{
    return axios.get(`${url}/${endpoint}/${id}`).then((result)=>{
        return result.data;
    })
}

const deletedata = (endpoint,id)=>{
    return axios.delete(`${url}/${endpoint}/${id}`).then((result)=>{
        return result.data;
    })
}

const insertdata = (endpoint,data)=>{
    return axios.post(`${url}/${endpoint}`,data).then((result)=>{
        return result.data;
    })
}

const updatedata = (endpoint,id,data)=>{
    return axios.put(`${url}/${endpoint}`,id,data).then((result)=>{
        return result.data;
    })
}

export default{
    fetchdata,
    deletedata,
    insertdata,
    updatedata
}