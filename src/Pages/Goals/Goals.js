import { useEffect, useState } from "react";
import ChecklistLayout from "../../Layouts/Checklist/ChecklistLayout";

import { getAllGoals, createGoal, deleteGoals, updateGoals } from '../../Services/WebService';

function Goals(props){

    const [goals, setGoals] = useState([]);

    useEffect(() => {
      getGoals();
    }, []);

    async function getGoals(){
        let res = await getAllGoals();
        setGoals(res);
    }

    async function createItemCallback(item, isComplete, date, itemId){
        let res = await createGoal(item, isComplete, date, itemId);
        res.goal.date = date;
        return res;
    }

    async function deleteItemCallback(itemList){
        let res = await deleteGoals(itemList);
        return res;
    }

    async function updateItemCallback(itemList){
        let res = await updateGoals(itemList);
        return res;
    }

    return (
        <ChecklistLayout
            idKey="goal_id"
            valKey="goal"
            items={goals}
            refreshList={getGoals}
            createItemCallback={createItemCallback}
            deleteItemCallback={deleteItemCallback}
            updateItemCallback={updateItemCallback}
            navigateTo={props.navigateTo}
        />
    )
}

export default Goals;