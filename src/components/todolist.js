import React from 'react';
import TodoItem from './todoitem';
export default class TodoList extends React.Component{
    render() {
        let list =  this.props.data.map(item=>
            <TodoItem item={item} key={item.id} removeTask ={this.props.rT} finishedHandle={this.props.fH}
            />
        )

        return (
                list
        )
    }
}
