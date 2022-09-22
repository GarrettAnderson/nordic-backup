import React from 'react'
import TableRow from './components/tableRow'

const apiHostname = process.env.REACT_APP_API_HOSTNAME
console.log(apiHostname)

function fetchData({ offset, fetching }) {
  console.log(fetching)
  return fetch(
    `http://${apiHostname}/data/index.php?offset=${encodeURIComponent(offset)}`,
    {
      mode: 'cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then(resp => {
      console.log(resp)
      return resp.json()
    })
    .then(json => {
        console.log(`json: ${json}`)
        return json
    })
    .catch(e => {
      console.error(e)
    })
}

function App() {
  const [data, setData] = React.useState([])
  const [offset, setOffset] = React.useState(0)

  const fetchPrevPage = () => {
    const currentOffset = offset - 50
    fetchData({
      offset: currentOffset,
      fetching: 'fetching previous page',
    }).then(json => {
      setData(json)
      setOffset(currentOffset)
    })
  }

  const fetchNextPage = () => {
    const currentOffset = offset
    fetchData({
      offset: currentOffset,
      fetching: 'fetching next page',
    }).then(json => {
      setData(json)
      setOffset(json.length + currentOffset)
    })
  }

  let cchangedValue = 0
  React.useEffect(() => {
    console.log(cchangedValue)
    console.log('value changed')
  }, [cchangedValue])

  React.useEffect(() => {
    const currentOffset = offset
    fetchData({
      offset: currentOffset,
      fetching: 'fetching initial page',
    }).then(json => {
      setData(json)
      setOffset(json.length + currentOffset)
    })
    // empty dependency list - will not run except initially
    // if there was a dependency, this will run again
  }, [])

  return (
    <>
      <button onClick={() => cchangedValue++}>click me</button>
    </>
  )
}

export { App }
