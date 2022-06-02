import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemform} from "./AddItemform";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, id: string) => void
    addNewTask: (newTaskTitle: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodoListTitle: (id:string,newTitle:string) => void
    filter: FilterValuesType
    id: string
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const  addTask = (title : string)=>{
        props.addNewTask(title, props.id)
    }

    const  changeTodoList = (newTitle : string)=>{
        props.changeTodoListTitle( props.id,newTitle)
    }



    return <div>
        <h3> <EditableSpan  title={props.title} onChange={changeTodoList}/></h3>

        <AddItemform addItem={addTask} />
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }
                     const onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeStatusHandler}/>
                       < EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <button onClick={() => {
                            props.removeTask(t.id, props.id)
                        }}>x
                        </button>
                        {/*<IconButton onClick={() => {
                            props.removeTask(t.id, props.id)
                        }}>
                            <Delete fontSize="inherit" />
                        </IconButton>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>
                All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>
                Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>
                Completed
            </button>
        </div>
    </div>
}


