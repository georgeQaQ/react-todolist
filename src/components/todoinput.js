import React from 'react';

export default class TodoInpput extends React.Component{
    handleClick = ()=> {
        const len = this.props.nums
        const newId = len > 0 ? new Date() : 0
        let value = this.refs.myText.value
        let obj
        if (value !== ''){
           obj = {
                id: newId,
                name: value,
                status: 0
            }
        }
        this.refs.myText.value = ''
        this.props.addNewTask(obj)
    }
    render() {
        return (
            <div className="dialog">
				<div>
					<h3>添加事项：</h3>
                    {/* React提供的这个ref属性，表示为对组件真正实例的引用 */}
					<input type="text" ref="myText" placeholder="what you wanna do"/> 
				</div>
				<div>
					<input type="button" value="Save Task" onClick={this.handleClick}/>
				</div>
			</div>
        )
    }
}