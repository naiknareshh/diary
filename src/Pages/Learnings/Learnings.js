import { useEffect, useState } from "react";

import { createLearning, getAllLearnings } from "../../Services/WebService";
import ListLayout from "../../Layouts/List/ListLayout";

function Learnings(props) {

  const [learnings, setLearnings] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems(){
      let res = await getAllLearnings();
      setLearnings(res);
  }

  async function createItemCallback(item, description, isComplete, date, itemId){
      let res = await createLearning(item, description, isComplete, date, itemId);
      return res;
  }

  return (
    <ListLayout
      idKey="learning_id"
      valKey="learning"
      inputType="textarea-text"
      items={learnings}
      refreshList={getItems}
      createItemCallback={createItemCallback}
      navigateTo={props.navigateTo}
    />
  );
}

export default Learnings;
