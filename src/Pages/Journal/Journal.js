import { useEffect, useState, useRef } from "react";

import { createJournal, getAllJournals } from "../../Services/WebService";
import ListLayout from "../../Layouts/List/ListLayout";

function Journal(props) {

  const [journals, setJournals] = useState([]);

  useEffect(() => {
    getJournals();
  }, []);

  async function getJournals(){
      let res = await getAllJournals();
      setJournals(res);
  }

  async function createItemCallback(item, description, isComplete, date, itemId){
      let res = await createJournal(item, description, isComplete, date, itemId);
      return res;
  }

  return (
    <ListLayout
      idKey="journal_id"
      valKey="journal"
      inputType="textarea"
      items={journals}
      refreshList={getJournals}
      createItemCallback={createItemCallback}
      navigateTo={props.navigateTo}
    />
  );
}

export default Journal;
