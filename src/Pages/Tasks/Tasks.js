import { useEffect, useState } from "react";
import ChecklistLayout from "../../Layouts/Checklist/ChecklistLayout";

import { getAllTasks, createTask, deleteTasks, updateTasks } from '../../Services/WebService';

function Tasks(props){

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      getTasks();
    }, []);

    async function getTasks(){
        let res = await getAllTasks();
        console.log('tasks', res);
        setTasks(res);
    }

    async function createItemCallback(item, isComplete, date, itemId){
        let res = await createTask(item, isComplete, date, itemId);
        return res;
    }

    async function deleteItemCallback(itemList){
        let res = await deleteTasks(itemList);
        return res;
    }

    async function updateItemCallback(itemList){
        let res = await updateTasks(itemList);
        return res;
    }

    return (
        <ChecklistLayout
            idKey="task_id"
            valKey="task"
            items={tasks}
            refreshList={getTasks}
            createItemCallback={createItemCallback}
            deleteItemCallback={deleteItemCallback}
            updateItemCallback={updateItemCallback}
            navigateTo={props.navigateTo}
        />
    )
}

export default Tasks;