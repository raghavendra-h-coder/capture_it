import Axios from 'axios';

export default async function fetchNotes(page,size){
    const result={
        notes:[]
    }
    await Axios.get(`http://localhost:8081/api/capturenotes/fetch?page=${page}&size=${size}`)
    .then(response=>{
            result.notes=response.data;
    })
    .catch(error=>{
        console.log("could not fetch notes");
    });
    return result.notes;
    
}