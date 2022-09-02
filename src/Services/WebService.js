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
    throw new Error("Invalid API Key");
  }
}

export async function createTask(task, description, isComplete, date, taskId) {
  let res = await axios.post(
    `${ENDPOINT_URL}/createData-Diary-Prod?table=tasks`,
    { task, description, isComplete, date, task_id: String(taskId) }
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
  return res.data;
}

export async function createBuy(item, description, isComplete, date, buyId) {
  let res = await axios.post(`${ENDPOINT_URL}/createData-Diary-Prod?table=buy`, {
    item,
    description,
    isComplete,
    date,
    buy_id: String(buyId),
  });
  return res.data;
}

export async function updateBuy(items) {
  let res = await axios.post(`${ENDPOINT_URL}/updateData-Diary-Prod?table=buy`, [ ...items ]);
  return res.data;
}

export async function deleteBuy(items) {
  let res = await axios.post(`${ENDPOINT_URL}/deleteData-Diary-Prod?table=buy`, [ ...items ]);
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

export async function getAllLearnings() {
  let res = await axios.get(`${ENDPOINT_URL}/getData-Diary-Prod`, {
    params: { table: "learnings" },
  });
  return res.data.sort((a, b) => {
    return a.learning_id - b.learning_id;
  });
}

export async function createLearning(learning, description, date, learning_id) {
  let res = await axios.post(
    `${ENDPOINT_URL}/createData-Diary-Prod?table=learnings`,
    {
      learning,
      description,
      date,
      learning_id,
    }
  );
  return res.data;
}

export async function getAllGoals() {
  let res = await axios.get(`${ENDPOINT_URL}/getData-Diary-Prod`, {
    params: { table: "goals" },
  });
  return res.data;
}

export async function createGoal(goal, description, isComplete, date, goal_id, type) {
  let res = await axios.post(`${ENDPOINT_URL}/createData-Diary-Prod?table=goals`, {
    goal,
    description,
    isComplete,
    date,
    goal_id,
    type
  });
  return res.data;
}

export async function updateGoals(goals) {
  let res = await axios.post(`${ENDPOINT_URL}/updateData-Diary-Prod?table=goals`, [...goals]);
  return res.data;
}

export async function deleteGoals(goals) {
  let res = await axios.post(`${ENDPOINT_URL}/deleteData-Diary-Prod?table=goals`, [...goals]);
  return res.data;
}

export async function getAllWishes() {
  let res = await axios.get(`${ENDPOINT_URL}/getData-Diary-Prod`, {
    params: { table: "wish" },
  });
  return res.data;
}

export async function createWish(wish, description, isComplete, date, wish_id) {
  let res = await axios.post(
    `${ENDPOINT_URL}/createData-Diary-Prod?table=wish`,
    { wish, description, isComplete, date, wish_id: String(wish_id) }
  );
  return res.data;
}

export async function updateWishes(items) {
  let res = await axios.post(
    `${ENDPOINT_URL}/updateData-Diary-Prod?table=wish`,
    [...items]
  );
  return res.data;
}

export async function deleteWishes(items) {
  let res = await axios.post(
    `${ENDPOINT_URL}/deleteData-Diary-Prod?table=wish`,
    [...items]
  );
  return res.data;
}