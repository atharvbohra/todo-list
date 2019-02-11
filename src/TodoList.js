import React from 'react';

const TodoItems = (props) => {
    const content = props.listItems.map((item, index) => {
        return (
            <div
                key={index} id={props.listIdx}
                className = 'listText'
                onClick={() => props.updateListItem(props.listIdx,index)}
                onDragStart={(event)=>props.onDragStart(event, props.listIdx, index)}
                draggable
            >
                <span className='heading'>{item.heading}</span>
                <input id={props.listIdx}
                    type='button'
                    value='DEL'
                    style={{float:'right',background:'red',padding:'3px',color:'white'}}
                    onClick={(event) => {
                        event.stopPropagation();
                        props.deleteListItem(props.listIdx, index);
                    }}
                />
                <div className='description'>{item.description}</div>
            </div>
        )
    })

    return (
        <div className='listContainer'
            onDragOver={(event)=>props.onDragOver(event, props.listIdx)}
            onDrop={(event)=>props.onDrop(event, props.listIdx)}
        >
            {content}
            <input id={props.listIdx} 
                style={{display:'table',margin:'0.7rem auto',background:'green',padding:'4px',color:'white'}}
                type='button' value='+' onClick={(event)=>props.handleAddItemClick(event)} />
        </div>
    )
}

class TodoList extends React.Component {
    render() {
        return (
            <TodoItems
                {...this.props}
            />
        )
    }
}

export default TodoList;