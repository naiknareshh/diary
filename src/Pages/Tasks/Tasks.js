import Checkbox from "../../CustomComponents/Checkbox/Checkbox";
import styles from "./Tasks.module.css";
import { getAllTasks } from "../../Services/WebService";
import { useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  getAllTasks().then((x) => setTasks(x));

  return (
    <div className={styles.tasksContainer}>
      {tasks.map((task) => {
        return (
          <div className={styles.task} key={task.id}>
            <Checkbox isComplete={task.isComplete} name={task.name} />
          </div>
        );
      })}
    </div>
  );
}

export default Tasks;
