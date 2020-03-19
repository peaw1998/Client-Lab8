import React, { useState, useEffect } from 'react';
import './App.css';
import { firestore } from './index'
import { Button, Form } from 'react-bootstrap';
import Task from './Task'



const App = () => {

  const [tasks, setTask] = useState([])
  const [name, setName] = useState([])

  useEffect(() => {
    retriveData()
  }, [])


  const retriveData = () => {
    firestore.collection("tasks").onSnapshot((snapshot) => {
      console.log(snapshot)
      let TASK = snapshot.docs.map(d => {
        const { id, name } = d.data()
        console.log(id, name)
        return { id, name }
      })
      setTask(TASK)
    })
  }

  const addTask = () => {
    let id = (tasks.length === 0) ? 1 : tasks[tasks.length - 1].id + 1
    firestore.collection("tasks").doc(id + '').set({ id, name })
  }

  const deleteTask = (id) => {
    firestore.collection("tasks").doc(id + '').delete()
  }

  const updateTask = (id) => {
    firestore.collection("tasks").doc(id + '').set({ id, name })
  }

  const renderTask = () => {
    if (tasks && tasks.length)
      return (
        tasks.map((task, index) => {
          return (
            <Task key={index} task={task}
              deleteTask={deleteTask}
              updateTask={updateTask} />
          )
        })
      )
    else return (<li>No task</li>)
  }



  return (
    <>
      <div className="App">
        <Form.Group controlId="addTask" >
          <Form.Label style={{ fontSize: 50 }}>Add Task</Form.Label>
          <Form.Control type="text" placeholder="Input task" onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit"
          onClick={addTask}
        >
          Add
        </Button>
        <div style={{ marginTop: 10, justifyContent: 'space-evenly' }}>
          <ul className="render">{renderTask()}</ul>
        </div>

      </div>


    </>
  )
}
export default App