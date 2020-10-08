import React, { Component } from 'react';
import firebase from './config/firebase';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [{ title: "ali", edit: false, id: 1 }],
      value: '',
    }


  }

  componentDidMount() {
    // firebase.database().ref('Activity/').on('child_added', function (data) {

    //   var task = data.val().taskname
    //   var setKeyfromDatabase = data.key;
    //   var dataobj = {
    //     title: task,
    //     edit: false,
    //     id: setKeyfromDatabase
    //   }
    // this.state.todos.push({
    //   title: Activity[item].title,
    // })

    const ActivityRef = firebase.database().ref('Activity/');
    ActivityRef.on('value', (data) => {
      let Activity = data.val();
      console.log(Activity)
      let newState = [];
      for (let item in Activity) {
        newState.push({
          title: Activity[item].taskname,
          id: item,
          edit: false,
        });
        console.log(newState)
      }
      this.setState({
        Activity: newState,
        todos: newState,

      });
    });

    // })
  }

  addTodo = () => {
    var key = firebase.database().ref().push().key;
    let obj = { title: this.state.value, edit: false, id: key }
    firebase.database().ref('Activity/' + key).set({
      taskname: obj.title
    })
    this.setState({
      todos: [...this.state.todos, obj],
      value: ''
    })

    console.log(this.state.todos)
  }

  deleteTodo = (i) => {
    this.state.todos.splice(i, 1)
    this.setState({
      todos: this.state.todos,
    })
    firebase.database().ref(`Activity/${i}`).remove();
  }

  editTodo = (i) => {
    this.state.todos[i].edit = true
    this.setState({
      todos: this.state.todos,
    })
  }

  updateTodo = (i, vid) => {
    this.state.todos[i].edit = false
    firebase.database().ref(`Activity/${vid}`).set({
      taskname: this.state.todos[i].title
    })
    this.setState({
      todos: this.state.todos,
    })
  }

  handleChange = (i, e) => {
    this.state.todos[i].title = e.target.value;
    this.setState({
      todos: this.state.todos,
    })
  }

  deleteAllTodo = () => {
    this.setState({
      todos: []
    })
    firebase.database().ref('Activity').remove();
  }

  render() {
    let { todos, value } = this.state;

    return (
      <div className="container bg-primary my-5">
        <h1 className="pt-3 text-center">Todo App</h1>
        <div className="mb-4 d-flex justify-content-center row">
          <input value={value} onChange={(e) => this.setState({ value: e.target.value })} type="text" placeholder="Enter task"
            id="defaultLoginFormEmail" class="form-control mx-2 col-10 col-sm-10 col-md-4"></input>
          <button onClick={this.addTodo} className="btn btn-success my-auto col-10 col-sm-10 col-md-3 col-lg-2">Add Activity</button>
          <button onClick={this.deleteAllTodo} className="btn btn-danger col-10 col-sm-10 col-md-3 col-lg-2">Delete All Activity</button>
        </div>
        <div className="card mx-4">
          <ol className="d-flex flex-column pt-4">
            {todos.map((v, index) => {
              return (
                <li key={index}>
                  {v.edit ? <input className="flex-grow-1 p-2" type="text" onChange={(e) => this.handleChange(index, e)} /> : v.title}
                  <div className="justify-content-end py-2">
                    {v.edit ? <button onClick={() => this.updateTodo(index, v.id)} className="optionButtons btn btn-info mx-1">Update</button> :
                      <button onClick={() => this.editTodo(index)} className="optionButtons btn btn-primary mx-1">Edit</button>}
                    <button onClick={() => this.deleteTodo(v.id)} className="optionButtons btn btn-warning mx-1">Delete</button>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
