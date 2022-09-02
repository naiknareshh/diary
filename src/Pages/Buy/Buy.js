import { useEffect, useState } from "react";
import ChecklistLayout from "../../Layouts/Checklist/ChecklistLayout";

import { getAllBuys, createBuy, deleteBuy, updateBuy } from '../../Services/WebService';

function Buy(props){

    const [buys, setBuys] = useState([]);

    useEffect(() => {
        getBuys();
    }, []);

    async function getBuys(){
        let res = await getAllBuys();
        setBuys(res);
    }

    async function createItemCallback(item, description, isComplete, date, itemId){
        let res = await createBuy(item, "",  isComplete, date, itemId);
        return res;
    }

    async function deleteItemCallback(itemList){
        let res = await deleteBuy(itemList);
        return res;
    }

    async function updateItemCallback(itemList){
        let res = await updateBuy(itemList);
        return res;
    }

    return (
        <ChecklistLayout
            idKey="buy_id"
            valKey="item"
            inputType="text"
            items={buys}
            refreshList={getBuys}
            createItemCallback={createItemCallback}
            deleteItemCallback={deleteItemCallback}
            updateItemCallback={updateItemCallback}
            navigateTo={props.navigateTo}
        />
    )
}

export default Buy;