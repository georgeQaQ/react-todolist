import React from 'react'
import ReactDOM from 'react-dom'
import TodoBox from './components/todobox'
import './css/index.css'


class App extends React.Component{
    render() {
        return <TodoBox />
    }
}


ReactDOM.render(<App/>,document.getElementById('root'))

