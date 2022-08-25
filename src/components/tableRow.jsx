import React, { Component } from 'react'

function TableRow(props) {
  return (
    <tr>
      <td>{props.data.customer_id}</td>
      <td>{props.data.client_id}</td>
      <td>{props.data.job_id}</td>
      <td>{props.data.Backupset}</td>
      <td>{props.data.time_stamp}</td>
    </tr>
  )
}
export default TableRow
