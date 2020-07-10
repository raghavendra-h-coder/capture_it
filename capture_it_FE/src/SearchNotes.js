import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Component } from 'react';
import Axios from 'axios';
import NotesCard from './NotesCard.js';
import {FaPlus} from 'react-icons/fa';
import './SearchNotesStyle.css';
import NotesCardPagination from './NotesCardsPagination';
import FetchCalls from './FetchNetworkCall';
import DeleteCalls from './DeleteNetworkCall';
import UpdateCalls from './UpdateNetworkCall';
import SearchCalls from './SearchNetworkCall';

class SearchNotes extends Component{
    constructor(){
        super();
        this.state={
            searchkey:'',
            notes:[],
            pagenumber:1,
            pagesize:25
        }
    }

    searchKeyHandler=(e)=>
    {
        this.setState({
            searchkey:e.target.value
        })
        console.log(this.state.searchkey);
    }

    leftArrowHandler=async ()=>{
        if(this.state.pagenumber>1)
        {
            await this.setState(prevState=>({
                pagenumber:prevState.pagenumber-1
            }))
            this.setState({
                notes:await FetchCalls(this.state.pagenumber,this.state.pagesize)
            })
        }
    }

    rightArrowHandler=async ()=>{
        await this.setState(prevState=>({
            pagenumber:prevState.pagenumber+1
        }))

        this.setState({
            notes:await FetchCalls(this.state.pagenumber,this.state.pagesize)
        })
    }

    pageSizeChangeHandler=async (e)=>{
        await this.setState({
            pagesize:e.target.value
        })
        this.setState({
            notes:await FetchCalls(this.state.pagenumber,this.state.pagesize)
        })
    }

    componentDidMount=async ()=>{
        this.setState({
            notes: await FetchCalls(this.state.pagenumber,this.state.pagesize)
        })
    }

    redirectingHomePage=()=>{
        ReactDOM.render(<App />, document.getElementById('root'));
    }

    searchNotesHandler=async ()=>{
        const requestParamSearchKey=this.state.searchkey;
        this.setState({
            notes:await SearchCalls(requestParamSearchKey,this.state.pagenumber,this.state.pagesize)
        })
    }

    deleteNoteHandler=async (id)=>{
        var notesId=Number(id);
        let deleteStatus=await DeleteCalls(notesId);
        if(deleteStatus)
        {
            this.setState({
                notes: await FetchCalls(this.state.pagenumber,this.state.pagesize)
            })
        }
    }

    updateNotesHandler=async (obj)=>{
        console.log("updating notes with id:"+obj.id);
        let updateStatus=await UpdateCalls(obj);
        if(updateStatus!=null)
        {
            this.setState({
                notes:await FetchCalls(this.state.pagenumber,this.state.pagesize)
            })
        }
    }

    render(){

        const notesList=this.state.notes;
        return(
            <div className="Search_Notes">
                <h1>Notes</h1>
                <div>
                    <input className="SearchNotes_Input" value={this.state.searchkey} onChange={this.searchKeyHandler}></input>
                    <button className="SearchNotes_Search" onClick={this.searchNotesHandler}>SEARCH</button>
                    <button className="SearchNotes_Add" onClick={this.redirectingHomePage}><FaPlus /></button>
                </div>
                <div className="NotesCardsDisplay">
                {
                    notesList.map(note=>(<NotesCard className="Notes_Card" key={note.id} name={note} 
                        deletemethod={this.deleteNoteHandler} updateMethod={this.updateNotesHandler} />))
                }
                </div>
                <div>
                    <NotesCardPagination leftpage={this.leftArrowHandler} 
                     rightpage={this.rightArrowHandler} pagesizeonchange={this.pageSizeChangeHandler} 
                     page={this.state.pagenumber} size={this.state.pagesize}/>
                </div>
            </div>
        )
    }
}

export default SearchNotes;