import React from 'react';
import TodoList from './todolist';
import TodoInput from './todoinput';
import {Button, Icon, Row, Col} from 'antd';

export default class TodoBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
              {
                "id": 0,
                "name": "做一个TodoList Demo",
                "status": 0
              }, {
                "id": 1,
                "name": "学习ES6",
                "status": 0
              }, {
                "id": 2,
                "name": "Hello React",
                "status": 0
              }, {
                "id": 3,
                "name": "找工作",
                "status": 0
              }
            ],
            finished: 0
          }
    }

    //添加代办事项
    addNewTask = (newItem) => {
        const newData = this.state.data.concat(newItem)
        this.setState({
            data: newData
        })
    }
    //删除待办事项
    removeTask = (Item) => {
        let obj = []
        let sum = 0 //用于更新已完成事项总数
        // let index = obj.indexOf(Item)
        // if(index > -1){
        //     obj.splice(index,1)
        // }
        this.state.data.forEach((item)=>{
            if(item.id !== Item.id){
                obj.push(item)
            if(item.status === 1) {
                sum++;
            }
            }
         
        })
        this.setState(
            {
                data: obj,
                finished: sum
            }
        )
    }

    //选中待办事项处理事件
    finishedHandle = (Item) =>{
        let sum = 0 //完成总数，每次点击checkbox重新计算
        this.state.data.forEach((item)=>{
            if(item.id === Item.id){
                item.status = Item.status
            }
            if(item.status === 1) {
                sum++
            }
            
        })
        this.setState({
            finished: sum 
        })
    }

    //清除已完成事项
    ClearFinished = () =>{
        let sum = 0
        let obj = []
        this.state.data.forEach((item)=>{
            if(item.status !== 1){
                obj.push(item)
            }
        })
        this.setState({
            data: obj,
            finished: sum
        })
    }

    render() {
        return (
           <div className="container">
                <h1>React TodoList</h1>
                <ul>
                <TodoList data={this.state.data} rT={this.removeTask} fH={this.finishedHandle}/>
                <li key='commmon'>{this.state.finished}已完成 / {this.state.data.length}总数 <span className='delete-btn' onClick={this.ClearFinished} >清除已完成事项</span></li>
                </ul>
                <TodoInput nums={this.state.data.length} addNewTask={this.addNewTask} />
           </div>
        )
    }
}