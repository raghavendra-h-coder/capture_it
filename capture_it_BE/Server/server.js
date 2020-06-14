const express = require('express');
const cors=require('cors');
const notesResource=require('./Resources/NotesResource');

const app=express();

app.use(express.json());
app.use(cors());

app.use('/api/capturenotes',notesResource);

app.listen(process.env.PORT || '8081', () => {
    console.log(`Server is running on ${process.env.PORT || '8081'}`);
})