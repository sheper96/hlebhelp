import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void

}

export function AddItemform(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addNewTask()
        }
    }

    const addNewTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("")
        } else setError('title is required')

    }
    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button onClick={addNewTask} variant={"contained"} color={"primary"}>+
            </Button>
            {error && <div className='error-message'>error</div>}
        </div>
    )
}