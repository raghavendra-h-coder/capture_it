const notesRepository=require('../Repository/NotesRepository.js');

let notesServices={};

notesServices.all= async(page,size)=>{
    let result= await notesRepository.all(page,size);
    return result;
}

notesServices.find= async(searchKey,page,size)=>{
    let result=await notesRepository.searchNotes(searchKey,page,size);
    return result;
}

notesServices.save= async(notesObj)=>{
    let result= await notesRepository.saveNotes(notesObj);
    return result;
}

notesServices.update= async(notesObj)=>{
    let result= await notesRepository.updateNotes(notesObj);
    return result;
}

notesServices.delete= async(id)=>{
    let result= await notesRepository.deleteNotes(id);
    return result;
}
module.exports=notesServices;