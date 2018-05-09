import React from 'react'
import {Row, Col, Checkbox, Button} from 'antd'

export default class TodoItem extends React.Component{
    
    //处理删除按钮点击事件
    handleDelete = () => {
        this.props.removeTask(this.props.item)
    }

    //处理checkbox选中事件
    handleFinished = () =>{
        let status = this.props.item.status
        status = (status === 0 ? 1 : 0)
        let obj = {
            id: this.props.item.id,
            name: this.props.item.name,
            status: status
        }
        this.props.finishedHandle(obj)
    }

    render() {
        let item = this.props.item
        const unfinish = {
            backgroundColor: '#DFFCB5',
            color: '#2EB872',
        };

        const finish = {
            backgroundColor: '#FFFA9D',
            color: '#FF9A3C',
            textDecoration: 'line-through'
        }

        var itemStyle = item.status === 0 ? unfinish : finish;

        return (
            <li style={itemStyle}>
                <span id={item.id} className='check-btn' onClick={this.handleFinished} 
                style= {{backgroundColor: item.status===0 ? '#FFF': '#A1EAFB'}}
                ></span>
                <span>{item.name}</span>
                <span className='delete-btn' onClick={this.handleDelete} >删除</span>
            </li>
        )
    }

}