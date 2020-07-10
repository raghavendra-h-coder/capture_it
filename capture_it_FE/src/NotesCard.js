import React, { Component } from 'react';
import { FaTrash } from 'react-icons/fa';
import './NotesCardStyle.css';

class NotesCard extends Component{

    constructor(){
        super();
        this.state={
            id:0,
            title:'',
            notes:''
        }
    }

    componentDidMount(){
        this.setState({
            id:this.props.name.id,
            title:this.props.name.title,
            notes:this.props.name.notes
        })
    }

    updateHandler=()=>{
        const updateNotesRequestBody={
            id:this.state.id,
            title:this.state.title,
            notes:this.state.notes
        }
        this.props.updateMethod(updateNotesRequestBody);
    }

    titleChangeHandler=(e)=>{
        this.setState({
            title:e.target.value
        })
    }

    notesChangeHandler=(e)=>{
        this.setState({
            notes:e.target.value
        })
    }
    render(){

        return(
            <div>
                <div>
                    <input className="NotesCard_Title" value={this.state.title} onChange={this.titleChangeHandler}></input>
                    &nbsp;
                    <button className="NotesCard_Delete" onClick={()=>this.props.deletemethod(this.state.id)}><FaTrash /></button>
                </div>
                <div>
                    <textarea className="NotesCard_Notes" value={this.state.notes} onChange={this.notesChangeHandler} ></textarea>
                </div>
                <div>
                    <button className="NotesCard_Update" onClick={this.updateHandler}>Update</button>
                </div>
            </div>
        )
    }
}

export default NotesCard;