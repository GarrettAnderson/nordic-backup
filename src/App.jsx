import React, { Component } from 'react'

export class App extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    fetch('http://localhost/8080/data/index.php')
      .then(resp => resp.json)
      .then(data => {
        console.log(data)
        this.setState({
          data: data
        })
      })
  }

  render() {
    return <div>Hello, World!</div>
  }
}
