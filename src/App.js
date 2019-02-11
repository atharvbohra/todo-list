import React, { Component } from 'react';
import TodoList from './TodoList';
import Form from './Form';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listData: [[]],
      listSelected: 0,
      listItemSel: -1,
      bshowInput: false
    }
    this.updateListItem = this.updateListItem.bind(this);
    this.deleteListItem = this.deleteListItem.bind(this);
    this.handleAddItemClick = this.handleAddItemClick.bind(this);
    this.handleListItemSubmit = this.handleListItemSubmit.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  addNewList = () => {
    this.setState({
      listData: [...this.state.listData, []],
    })
  }

  handleAddItemClick = (evt) => {
    this.setState({
      bshowInput: true,
      listSelected: evt.target.id,
    })
  }

  updateListItem = (listIdx, listItemIdx) => {
    this.setState({
      bshowInput: true,
      listSelected: listIdx,
      listItemSel: listItemIdx,
    })
  }

  deleteListItem = (listIdx, listItemIdx) => {
    this.state.listData[listIdx].splice(listItemIdx,1);
    this.setState({
      listData: this.state.listData
    })
  }

  handleListItemSubmit = (listItem) => {
    console.log("Submit");
    let updatedListArr = [];
    if (this.state.listItemSel !== -1) {
      let temp = this.state.listData;
      temp[this.state.listSelected][this.state.listItemSel] = listItem;
      this.setState({
        listData: temp,
        bshowInput: false,
        listItemSel: -1,
      })
    } else {
      updatedListArr = [...this.state.listData[this.state.listSelected], listItem];
      this.state.listData.splice(this.state.listSelected,1,updatedListArr);
      this.setState({
        listData: this.state.listData,
        bshowInput: false,
        listItemSel: -1,
      })
    }
  }

  onDragStart = (evt, listId, listItemId) => {
    evt.dataTransfer.setData("dragListId", listId);
    evt.dataTransfer.setData("dragItemId", listItemId);
  }

  onDragOver = evt => {
    evt.preventDefault();
  }

  onDrop = (evt,dropListId) => {
    evt.stopPropagation();
    let dragListId = evt.dataTransfer.getData('dragListId');
    let dragItemId = evt.dataTransfer.getData('dragItemId');
    let listItem = this.state.listData[dragListId][dragItemId];
    let updatedListArr = [...this.state.listData[dropListId],listItem];
    this.state.listData.splice(dropListId,1,updatedListArr);
    this.deleteListItem(dragListId,dragItemId);
    this.setState({
      listData: this.state.listData
    });
  }

  render() {
    if (!this.state.bshowInput) {
      const todoLists = this.state.listData.map((item,index) => {
        return (
          <TodoList
            key = {index}
            listIdx = {index}
            listItems = {this.state.listData[index]}
            updateListItem = {this.updateListItem}
            deleteListItem = {this.deleteListItem}
            handleAddItemClick = {this.handleAddItemClick}
            onDragStart = {this.onDragStart}
            onDrop = {this.onDrop}
            onDragOver = {this.onDragOver}
          />
        )
      })

      return (
        <div>
          <input style={{margin:'0rem 90vw',background:'blue',padding:'4px',color:'white'}} 
            type='button' value='Add List' onClick={()=>this.addNewList()} />
          {todoLists}
        </div>
      )
    } else {
      return <Form handleSubmit={this.handleListItemSubmit} /> 
    }
  }
}

export default App;
