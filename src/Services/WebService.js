import axios from "axios";

const ENDPOINT_URL =
  "https://18tcsnkaef.execute-api.us-east-1.amazonaws.com/diary-prod";

export function getApiKey() {
  return axios.defaults.headers.common["x-api-key"];
}

export function setApiKey(apiKey) {
  axios.defaults.headers.common["x-api-key"] = apiKey;
}

export async function getAllTasks() {
  try {
    let res = await axios.get(`${ENDPOINT_URL}/getData-Diary-Prod`, {
      params: { table: "tasks" },
    });
    return res.data.sort((a, b) => {
      return a.task_id - b.task_id;
    });
  } catch (error) {
    console.log(error);
    throw new Error("Invalid API Key");
  }
}

export async function createTask(task, isComplete, date, taskId) {
  let res = await axios.post(
    `${ENDPOINT_URL}/createData-Diary-Prod?table=tasks`,
    { task, isComplete, date, task_id: String(taskId) }
  );
  return res.data;
}

export async function updateTasks(tasks) {
  let res = await axios.post(
    `${ENDPOINT_URL}/updateData-Diary-Prod?table=tasks`,
    [...tasks]
  );
  return res.data;
}

export async function deleteTasks(tasks) {
  let res = await axios.post(
    `${ENDPOINT_URL}/deleteData-Diary-Prod?table=tasks`,
    [...tasks]
  );
  return res.data;
}

export async function getAllBuys() {
  let res = await axios.get(`${ENDPOINT_URL}/getData-Diary-Prod`, {
    params: { table: "buy" },
  });
  console.log("response ", res.data);
  return res.data;
}

export async function createBuy(item, isComplete, date, buyId) {
  let res = await axios.post(`${ENDPOINT_URL}/createBuy`, {
    item,
    isComplete,
    date,
    buyId,
  });
  return res.data;
}

export async function updateBuy(items) {
  let res = await axios.post(`${ENDPOINT_URL}/updateBuy`, { items });
  return res.data;
}

export async function deleteBuy(items) {
  let res = await axios.post(`${ENDPOINT_URL}/deleteBuy`, { items });
  return res.data;
}

export async function getAllJournals() {
  let res = await axios.get(`${ENDPOINT_URL}/getData-Diary-Prod`, {
    params: { table: "journals" },
  });
  return res.data.sort((a, b) => {
    return a.journal_id - b.journal_id;
  });
}

export async function createJournal(journal, date, journal_id) {
  let res = await axios.post(
    `${ENDPOINT_URL}/createData-Diary-Prod?table=journals`,
    {
      journal,
      date,
      journal_id,
    }
  );
  return res.data;
}

export async function getAllJGoals() {
  let res = await axios.get(`${ENDPOINT_URL}/getData-Diary-Prod`, {
    params: { table: "goals" },
  });
  return res.data;
}

export async function createGoal(goal, isComplete, date, goalId) {
  let res = await axios.post(`${ENDPOINT_URL}/createGoal`, {
    goal,
    isComplete,
    date,
    goalId,
  });
  return res.data;
}

export async function updateGoals(goal, isComplete, date, goalId) {
  let res = await axios.post(`${ENDPOINT_URL}/updateGoals`, {
    goal,
    isComplete,
    date,
    goalId,
  });
  return res.data;
}

export async function deleteGoals(goal, isComplete, date, goalId) {
  let res = await axios.post(`${ENDPOINT_URL}/deleteGoals`, {
    goal,
    isComplete,
    date,
    goalId,
  });
  return res.data;
}
