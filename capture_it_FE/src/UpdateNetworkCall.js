import Axios from 'axios';

export default async function UpdateNetworkCall(notesObj){
    let result;
    await Axios.put(`http://localhost:8081/api/capturenotes/update`,notesObj)
        .then(Response=>{
            result=Response.data;
        }).
        catch(err=>{
            console.log("something went wrong in updating notes id:"+notesObj.id+" bcz:"+err);
        })
    return result;
}