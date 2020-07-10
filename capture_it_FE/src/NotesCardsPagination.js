import React, { Component } from 'react';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {MdKeyboardArrowLeft} from 'react-icons/md';
import './NotesCardPaginationStyle.css';

class NotesCardPagination extends Component{

    render(){
        return(
            <div>
                <button className="LeftArrow" onClick={this.props.leftpage}><MdKeyboardArrowLeft /></button>
                {this.props.page}
                <button className="RightArrow" onClick={this.props.rightpage}><MdKeyboardArrowRight /></button>
                <input className="PageInput" value={this.props.size} onChange={this.props.pagesizeonchange}></input>
            </div>
        )
    }
}

export default NotesCardPagination;