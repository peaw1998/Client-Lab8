import { Button, Form, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { firestore } from './index'
import { OmitProps } from 'antd/lib/transfer/renderListBody';

export default (props) => {
    const { task, updateTask, deleteTask } = props
    const { id, name } = task

    return (
        <div style={{ marginLeft: 20 }}>
            <Card
                bg="secondary"
                text="secondary"
                style={{ width: '18rem' }}
            >
                <Card.Body>
                    <Card.Title style={{ color: 'white' }}>{id} </Card.Title>
                    <Card.Text style={{ color: 'white' }}>
                        {name}
                    </Card.Text>
                    <Button variant="warning" onClick={() => updateTask(id)}>Update</Button>
                    <Button style={{ marginLeft: 15 }} variant="danger" onClick={() => deleteTask(id)}>Delete</Button>
                </Card.Body>
            </Card>
        </div>

        // <li >{id} : {name}
        //     <Button variant="warning" onClick={() => updateTask(id)}>Update</Button>
        //     <Button variant="danger" onClick={() => deleteTask(id)}>Delete</Button>
        // </li>
    )
}