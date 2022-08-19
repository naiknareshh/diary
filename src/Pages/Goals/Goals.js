import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Header from "../../CustomComponents/Header/Header";
import ChecklistLayout from "../../Layouts/Checklist/ChecklistLayout";

import {
  getAllGoals,
  createGoal,
  deleteGoals,
  updateGoals,
} from "../../Services/WebService";

function Goals(props) {
  const [shortTermGoals, setShortTermGoals] = useState([]);
  const [longTermGoals, setlongTermGoals] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getGoals();
  }, []);

  async function getGoals() {
    let res = await getAllGoals();
    let shortGoals = [];
    let longGoals = [];
    res.forEach((item) => {
      if (item.type == 2) {
        longGoals.push(item);
      } else {
        shortGoals.push(item);
      }
    });
    setShortTermGoals(shortGoals);
    setlongTermGoals(longGoals);
  }

  async function createItemCallback(
    item,
    description,
    isComplete,
    date,
    itemId,
    type
  ) {
    let res = await createGoal(
      item,
      description,
      isComplete,
      date,
      itemId,
      type
    );
    return res;
  }

  async function deleteItemCallback(itemList) {
    let res = await deleteGoals(itemList);
    return res;
  }

  async function updateItemCallback(itemList) {
    let res = await updateGoals(itemList);
    return res;
  }

  return (
    <>
      {page === 2 ? (
        <>
          <ChecklistLayout
            idKey="goal_id"
            valKey="goal"
            items={longTermGoals}
            refreshList={getGoals}
            createItemCallback={createItemCallback}
            deleteItemCallback={deleteItemCallback}
            updateItemCallback={updateItemCallback}
            inputType="text-2"
            layoutType="goals"
            navigateTo={props.navigateTo}
          />
        </>
      ) : (
        <ChecklistLayout
          idKey="goal_id"
          valKey="goal"
          items={shortTermGoals}
          refreshList={getGoals}
          createItemCallback={createItemCallback}
          deleteItemCallback={deleteItemCallback}
          updateItemCallback={updateItemCallback}
          inputType="text-2"
          layoutType="goals"
          navigateTo={props.navigateTo}
        />
      )}
      <ButtonGroup className="position-fixed bottom-0 w-100">
        <Button className="rounded-0" onClick={() => setPage(1)}>
          Short Term
        </Button>
        <Button className="rounded-0" onClick={() => setPage(2)}>
          Long Term
        </Button>
      </ButtonGroup>
    </>
  );
}

export default Goals;
