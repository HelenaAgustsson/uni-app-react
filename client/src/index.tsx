import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Form, Button } from './widgets';
import taskService, { Task, Student } from './task-service';

class TaskList extends Component {
  tasks: Task[] = [];
  students: Student[] = [];

  render() {
    return (
      <Card title="Tasks Webutvikling">
        <Row>
          <Column>Title</Column>
          <Column>Done</Column>
        </Row>
        {this.students.map((student) => (
          <Row key={student.id}>
            <Column>{student.name}</Column>
            <Column>{student.id}</Column>
            <Column> </Column>
          </Row>
        ))}
      </Card>
    );
  }

  mounted() {
    taskService.getAll().then((students) => (this.students = students));
  }
}

ReactDOM.render(
  <>
    <TaskList />
  </>,
  document.getElementById('root')
);
