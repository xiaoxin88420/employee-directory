import React, { useState, useEffect } from 'react'
import 'react-table-v6/react-table.css'
import axios from 'axios'
import ReactTable from 'react-table-v6'

const App = () => {

  const [employeeState, setEmployeeState] = useState({
    employee:[],
    columns:[
      {
        Header:'Name',
        accessor:'name'
      },
      {
        Header:'Email',
        accessor:'email'
      },
      {
        Header:'Phone',
        accessor:'phone'
      },
      {
        Header:'Gender',
        accessor:'gender'
      }
    ]
  })

  useEffect(() => {
    axios.get(`https://randomuser.me/api?results=20`)
      .then(({data}) => {
        console.log(data)

        let employees = data.results.map(employee => ({
          name: employee.name.first + ' ' + employee.name.last,
          email: employee.email,
          phone:employee.phone,
          gender: employee.gender
        }))
        setEmployeeState({ ...employeeState, employees })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <ReactTable
      data={employeeState.employees}
      columns={employeeState.columns}
    />
  )
}

export default App
