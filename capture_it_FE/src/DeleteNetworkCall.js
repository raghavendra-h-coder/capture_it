import Axios from 'axios';

export default async function deleteNotes(notesid){
    let status;
    await Axios.get(`http://localhost:8081/api/capturenotes/delete?notesid=${notesid}`).
    then(response=>{
        status=response.data;
    }).
    catch(err=>{
        console.log("Something went wrong in deleting notes with id:"+notesid);
    });
    return status;
}