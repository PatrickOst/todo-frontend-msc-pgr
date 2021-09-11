import React, { Component } from 'react'
import { ToDoOutput } from './ToDoOutput'

class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 3,
      text: '1234',
        users: 'users'
    }
  }

  render() {
    const { text, count } = this.state

    return (
        <div>
          <button onClick={this.decrement} disabled={count <= 0}>
            -
          </button>
          <span>{this.state.count}</span>
          <button onClick={this.increment}>+</button>
          <div>
            <input onChange={this.updateText} value={this.state.text} />
          </div>
          <button id="my-button" className="button">Connect Backend</button>
          <ToDoOutput text={this.state.users} count={count} />
        </div>
    )
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }

  decrement = () => {
    this.setState(prevState => ({ count: prevState.count - 1 }))
  }

  updateText = event => {
    const value = event.target.value
    this.setState({ text: value })
  }

  async componentDidMount(){
      const response = await fetch('/api/todos')
      const users = await response.json()
      if(response.ok) this.setState({users: users})
  }


}

export default App

