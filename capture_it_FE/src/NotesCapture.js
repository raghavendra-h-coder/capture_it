import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './NotesCapture.css';
import Axios from 'axios';
import SearchNotes from './SearchNotes.js';

class NotesCapture extends Component{

    constructor()
    {
        super();
        this.state={
            title:'Place Your Title',
            notes:'Place Your Notes'
        }
    }

    titleChangeHandler=(e)=>{
        this.setState({
            title:e.target.value
        })
    };

    notesChangeHandler=(e)=>{
        this.setState({
            notes:e.target.value
        })
    };

    saveNotes=()=>{
        const CaptureNotes={
            title:this.state.title,
            notes:this.state.notes
        }
        console.log(CaptureNotes.title);
        console.log(CaptureNotes.notes);
        Axios.post(`http://localhost:8081/api/capturenotes/save`, CaptureNotes )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    viewNotesHandler=()=>{
        ReactDOM.render(<SearchNotes />, document.getElementById('root'));
    }

    render()
    {
        return (
            <div>
                <div>
                    <h2>Capture Your Notes</h2>
                    <br></br>
                    <button className="View_Button" onClick={this.viewNotesHandler}>View All</button>
                </div>
                <div>
                    <br></br>
                    Title:
                    <input className="Notes_Title" value={this.state.title} onChange={this.titleChangeHandler}></input>
                </div>
                <div >
                    <br></br>
                    <textarea className="Notes" value={this.state.notes} onChange={this.notesChangeHandler}></textarea>
                </div>
                <div>
                    <br></br>
                    <button className="Save_Button" onClick={this.saveNotes}>SAVE</button>
                </div>
            </div>
        )
    }
}

export default NotesCapture;