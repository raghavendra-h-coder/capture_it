const express = require('express');
const bodyParser=require('body-parser');
const notesService=require('../Service/NotesService');

const notesResource=express.Router();

const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

notesResource.get('/fetch',async(req,res)=>{
    try{
        let pageNumber=req.query.page;
        let pageSize=req.query.size;
        pageNumber=(pageNumber-1)*pageSize;
        let notes= await notesService.all(Number(pageNumber),Number(pageSize));
        res.json(notes);
    }
    catch(err)
    {
        res.sendStatus(500);
    }
});

notesResource.get('/search',async(req,res)=>{
    try{
        let pageNumber=req.query.page;
        let pageSize=req.query.size;
        pageNumber=(pageNumber-1)*pageSize;
        let notes= await notesService.find(req.query.searchkey,Number(pageNumber),Number(pageSize));
        res.json(notes);
    }
    catch(err)
    {
        res.sendStatus(500);
    }
});

notesResource.post('/save', async(req,res)=>{
    try{
        let result= await notesService.save(req.body);
        res.json(result);
    }
    catch(err)
    {
        res.sendStatus(500);
    }
});

notesResource.put('/update', async(req,res)=>{
    try{
        let result= await notesService.update(req.body);
        res.json(result);
    }
    catch(err)
    {
        res.sendStatus(500);
    }
});

notesResource.get('/delete',async(req,res)=>{
    try{
        let result=await notesService.delete(req.query.notesid);
        res.json(result);
    }
    catch(err)
    {
        res.sendStatus(500);
    }
});



module.exports=notesResource;