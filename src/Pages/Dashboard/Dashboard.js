import styles from "./Dashboard.module.css";
import { Pages } from "../../Constants";
import Image from "react-bootstrap/Image";
import buyImg from "../../Images/buy.png";
import goalsImg from "../../Images/goals.png";
import learningsImg from "../../Images/learnings.png";
import problemsImg from "../../Images/problems.png";
import journalImg from "../../Images/journal.png";
import wishImg from "../../Images/wish.png";

import { useEffect, useState } from "react";

function Dashboard(props) {
  const [completedCount, setCompletedCount] = useState(0);

  const openTasks = () => {
    props.navigateTo(Pages.TASKS);
  };

  useEffect(() => {
    if (!!props.tasks?.length) {
      let completed = props.tasks.reduce((total, task) => {
        return task.isComplete ? total + 1 : total;
      }, 0);
      setCompletedCount(completed);
    }
  }, [props]);

  return (
    <div>
      <header className="flex-row pad-1rem5">
        <img
          src="https://avatars.githubusercontent.com/u/105363653?v=4"
          alt=""
          id={styles.avatar}
        ></img>
        <div className={styles.userDetails}>
          <p className="nomargin bold font-size-med">Naresh Naik</p>
          <p className="nomargin text-muted">Business magnate and Investor</p>
        </div>
      </header>
      <main className="flex-col pad-1rem5">
        <div className={styles.tasksBtn} onClick={openTasks}>
          <h2>Tasks</h2>
          <p className="nomargin text-muted">{`${completedCount}/${props.tasks.length} Completed`}</p>
        </div>
        <div className="d-flex w-100 mt-4 flex-wrap">
          <div className="p-3 w-50">
            <Image
              className="img-fluid"
              src={goalsImg}
              onClick={() => props.navigateTo(Pages.GOALS)}
            />
          </div>
          <div className="p-3 w-50">
            <Image
              className="img-fluid"
              src={learningsImg}
              onClick={() => props.navigateTo(Pages.LEARNINGS)}
            />
          </div>
          <div className="p-3 w-50">
            <Image
              className="img-fluid"
              src={buyImg}
              onClick={() => props.navigateTo(Pages.BUY)}
            />
          </div>
          <div className="p-3 w-50">
            <Image className="img-fluid" src={problemsImg} />
          </div>
          <div className="p-3 w-50">
            <Image
              className="img-fluid"
              src={journalImg}
              onClick={() => props.navigateTo(Pages.JOURNAL)}
            />
          </div>
          <div className="p-3 w-50">
            <Image
              className="img-fluid"
              src={wishImg}
              onClick={() => props.navigateTo(Pages.WISH)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
