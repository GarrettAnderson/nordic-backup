import React, { Component } from 'react'

export class App extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    fetch('http://localhost:8080/data/index.php', { mode: 'no-cors'})
      .then(resp => {
        console.log(resp)
        return resp.json()
      })
      .then(data => {
        console.log(data)
        this.setState({
          data: data
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  render() {
    return <>
      
        <table>
          <tr>
            <th>Customer Id</th>
            <th>Client Id</th>
            <th>Job Id</th>
            <th>Backupset</th>
            <th>Day and Time</th>
          </tr>
          {this.state.data.map(datum=>{
            <td>{datum.customer_id}</td>
          })}
        </table>
 
    </>
  }
}
