import React, { Component } from 'react'
import TableRow from './components/tableRow'

export class App extends Component {
  state = {
    data: [],
    offset: 0,
  }

  fetchPrevPage() {
    const currentOffset = this.state.offset - 50
    fetch(
      `http://localhost:8080/data/index.php?offset=${encodeURIComponent(
        currentOffset
      )}`,
      {
        // mode: 'no-cors',
        // method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
      }
    )
      .then(resp => {
        console.log(resp)
        return resp.json()
      })
      .then(json => {
        // const data = JSON.parse(text);
        console.log(json)
        console.log(json.length + currentOffset)
        this.setState({
          data: json,
          offset: currentOffset,
        })
        console.log(this.state)
      })
      .catch(e => {
        console.error(e)
      })
  }

  fetchNextPage() {
    const currentOffset = this.state.offset
    fetch(
      `http://localhost:8080/data/index.php?offset=${encodeURIComponent(
        currentOffset
      )}`,
      {
        // mode: 'no-cors',
        // method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
      }
    )
      .then(resp => {
        console.log(resp)
        return resp.json()
      })
      .then(json => {
        // const data = JSON.parse(text);
        console.log(json)
        this.setState({
          data: json,
          offset: json.length + currentOffset,
        })
        console.log(this.state)
      })
      .catch(e => {
        console.error(e)
      })
  }

  componentDidMount() {
    fetch(
      `http://localhost:8080/data/index.php?offset=${encodeURIComponent(
        this.state.offset
      )}`,
      {
        // mode: 'no-cors',
        // method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
      }
    )
      .then(resp => {
        console.log(resp)
        return resp.json()
      })
      .then(json => {
        // const data = JSON.parse(text);
        console.log(json)
        this.setState({
          data: json,
          offset: json.length,
        })
      })
      .catch(e => {
        console.error(e)
      })
  }

  render() {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <th>Customer Id</th>
              <th>Client Id</th>
              <th>Job Id</th>
              <th>Backupset</th>
              <th>Day and Time</th>
            </tr>
            {this.state.data.map((datum, index) => {
              return <TableRow data={datum} key={index} />
            })}
          </tbody>
        </table>
        <div className="pag-buttons">
          {this.state.offset > 50 ? (
            <button
              onClick={() => {
                this.fetchPrevPage()
              }}
            >
              Prev page
            </button>
          ) : null}
          <button
            onClick={() => {
              this.fetchNextPage()
            }}
          >
            Next page
          </button>
        </div>
      </>
    )
  }
}
