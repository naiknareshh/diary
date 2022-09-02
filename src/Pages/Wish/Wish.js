import { useEffect, useState } from "react";
import ChecklistLayout from "../../Layouts/Checklist/ChecklistLayout";

import { getAllWishes, createWish, deleteWishes, updateWishes } from '../../Services/WebService';

function Wish(props){

    const [wishs, setWishes] = useState([]);

    useEffect(() => {
      getWishes();
    }, []);

    async function getWishes(){
        let res = await getAllWishes();
        setWishes(res);
    }

    async function createItemCallback(item, description, isComplete, date, itemId){
        let res = await createWish(item, description, isComplete, date, itemId);
        return res;
    }

    async function deleteItemCallback(itemList){
        let res = await deleteWishes(itemList);
        return res;
    }

    async function updateItemCallback(itemList){
        let res = await updateWishes(itemList);
        return res;
    }

    return (
        <ChecklistLayout
            idKey="wish_id"
            valKey="wish"
            inputType="text-2"
            items={wishs}
            refreshList={getWishes}
            createItemCallback={createItemCallback}
            deleteItemCallback={deleteItemCallback}
            updateItemCallback={updateItemCallback}
            navigateTo={props.navigateTo}
        />
    )
}

export default Wish;