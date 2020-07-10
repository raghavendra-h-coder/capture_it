import Axios from 'axios';

export default async function SearchNotes(searchkey,page,size){
    let searchResult=[]
    await Axios.get(`http://localhost:8081/api/capturenotes/search?searchkey=${searchkey}&page=${page}&size=${size}`).
    then(response=>{
        searchResult=response.data;
    }).
    catch(err=>{
        console.log("something went wrong in searching notes with:"+searchkey+" bcz:"+err);
    });
    return searchResult;
}