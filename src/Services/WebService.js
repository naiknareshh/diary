import axios from "axios";

const ENDPOINT_URL = "https://18tcsnkaef.execute-api.us-east-1.amazonaws.com/diary-prod";

export async function getAllTasks() {

  let res = await axios.get('https://1l4sfqk1wh.execute-api.us-east-1.amazonaws.com/default/getAllTasks');
  return res.data;

  // return [{"task_id":"2","task":"Haircut", "isComplete": true},{"task_id":"1","task":"Finish Lambda basics", "isComplete": true}];

}

export async function getAllBuys() {

  let res = await axios.get(`${ENDPOINT_URL}/getAllBuys`);
  console.log('response ', res.data);
  return res.data;

  // return [{"task_id":"2","task":"Haircut", "isComplete": true},{"task_id":"1","task":"Finish Lambda basics", "isComplete": true}];

}

export async function createTask(task, isComplete, date, taskId){
  let res = await axios.post(`${ENDPOINT_URL}/tasks`, { task, isComplete, date, taskId });
  return res.data;
}

export async function createJournal(journal, date, journalId){
  let res = await axios.post(`${ENDPOINT_URL}/createJournal`, { journal, date, journalId });
  return res.data;
}

export async function createBuy(item, isComplete, date, buyId){
  let res = await axios.post(`${ENDPOINT_URL}/createBuy`, { item, isComplete, date, buyId });
  return res.data;
}

export async function updateTasks(tasks){
  let res = await axios.post(`${ENDPOINT_URL}/updateTasks`, { tasks });
  return res.data;
  // return { message :'Updated`, tasks: tasks };
}

export async function deleteTasks(tasks){
  let res = await axios.post(`${ENDPOINT_URL}/deleteTask`, { tasks });
  return res.data;
  // return { message :'Updated`, tasks: tasks };
}

export async function updateBuy(items){
  let res = await axios.post(`${ENDPOINT_URL}/updateBuy`, { items });
  return res.data;
}

export async function deleteBuy(items){
  let res = await axios.post(`${ENDPOINT_URL}/deleteBuy`, { items });
  return res.data;
}

export async function getAllJournals(){
  let res = await axios.get(`${ENDPOINT_URL}/getAllJournals`);
  return res.data;
}

export async function createGoal(goal, isComplete, date, goalId){
  let res = await axios.post(`${ENDPOINT_URL}/createGoal`, { goal, isComplete, date, goalId });
  return res.data;
}

export async function updateGoals(goal, isComplete, date, goalId){
  let res = await axios.post(`${ENDPOINT_URL}/updateGoals`, { goal, isComplete, date, goalId });
  return res.data;
}

export async function deleteGoals(goal, isComplete, date, goalId){
  let res = await axios.post(`${ENDPOINT_URL}/deleteGoals`, { goal, isComplete, date, goalId });
  return res.data;
}