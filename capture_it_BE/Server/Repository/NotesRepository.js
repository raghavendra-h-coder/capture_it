const mysql=require('mysql');

const pool=mysql.createPool({
    connectionLimit:10,
    password:'root',
    user:'root',
    database:'capturenotes',
    host:'localhost',
    port:'3306'
});

let notesDB={};

notesDB.all=(page,size)=>{
    return new Promise((resolve,reject)=>{
        pool.query('select * from notes LIMIT ?, ?',[page,size],(err,results)=>{
            if(err){
                console.log("error:"+err.message);
                return(reject(err.message));
            }
            return resolve(results);
        });
    });
};

notesDB.searchNotes=(searchKey,page,size)=>{
    let serachArg='%'+searchKey+'%';
    return new Promise((resolve,reject)=>{
        pool.query("select * from notes where title like ? or notes like ? limit ?, ?",[serachArg,serachArg,page,size],(err,results)=>{
            if(err){
                console.log("error in query:"+err.message);
                return(reject(err));
            }
            return resolve(results);
        });
    });
}

notesDB.saveNotes=(notesObj)=>{
    return new Promise((resolve,reject)=>{
        pool.query("insert into notes set ?",notesObj,(err,results)=>{
            if(err){
                console.log("error in query:"+err.message);
                return(reject(err));
            }
            return resolve(results);
        });
    });
}

notesDB.updateNotes=(notesObj)=>{
    return new Promise((resolve,reject)=>{
        pool.query("update notes set ? " +
        "where id=?",[notesObj,notesObj.id],(err,results)=>{
            if(err){
                console.log("error in query:"+err.message);
                return(reject(err));
            }
            return resolve(results);
        });
    });
}

notesDB.deleteNotes=(id)=>{
    return new Promise((resolve,reject)=>{
        pool.query("delete from notes where id=?",id,(err,results)=>{
            if(err){
                console.log("error in query:"+err.message);
                return(reject(err));
            }
            return resolve(results);
        });
    });
}

module.exports=notesDB;