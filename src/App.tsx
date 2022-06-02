import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemform} from "./AddItemform";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key : string ] : Array<TaskType>
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}

    ])

    let [tasksObj, setTasks] = useState<TasksStateType>(
        {
            [todolistId1] : [{id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},],
            [todolistId2] : [{id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}]

        }
    )

    function removeTask(id: string,todolistId:string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addNewTask(title: string,todolistId:string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean,todolistId:string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }

    }

 function changeTaskTitle(taskId: string, title: string,todolistId:string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = title
            setTasks({...tasksObj})
        }

    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function changeTodoListTitle(id:string,newTitle:string){
        const todolist = todolists.find(tl=> tl.id === id)
        if (todolist){
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }

    function addTodoList(title:string){
        let todolist : TodoListType = {
            id: v1(),
            filter : "all",
            title : title
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasksObj,[todolist.id] : []})
    }

    return (

        <div className="App">
            <AddItemform addItem={addTodoList}/>
            {

                todolists.map((tl) => {
                    let tasksForTodolist =  tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    return <Todolist title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addNewTask={addNewTask}
                                     changeStatus={changeStatus}
                                     changeTaskTitle={changeTaskTitle}
                                     changeTodoListTitle={changeTodoListTitle}
                                     filter={tl.filter}
                                     id={tl.id}/>
                })
            }
        </div>
    );
}

export default App;
