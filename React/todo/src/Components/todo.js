import React, { Component } from 'react'

export default class todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [{ id: 1, txt: 'First One' }, { id: 2, txt: 'Second One' }],
            currTask: ''
        }
    }
    handleChange = (e) => {
        this.setState({ currTask: e.target.value })
    }
    handleClick = (e) => {
        if (this.state.currTask.trim() !=='') {
            let arr = [...this.state.tasks, { id: this.state.tasks.length + 1, txt: this.state.currTask }]
            this.setState({
                tasks: arr,
                currTask: ''
            })
        }
    }
    onDelete =(id)=>{
        let arr = this.state.tasks.filter(task=>{
            return (task.id !== id);
        })
        this.setState({tasks:arr})
    }
    render() {
        return (
            <div>
                <div className='input-container'>
                    <input onChange={this.handleChange} value={this.state.currTask} type='text'></input>
                    <button onClick={this.handleClick}>Add</button>
                </div>
                <div className='class-list'>
                    <ul>
                        {
                            this.state.tasks.map(task => (
                                <li key={task.id}>
                                    <h1>{task.txt}</h1>
                                    <button onClick={()=>this.onDelete(task.id)}>X</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}