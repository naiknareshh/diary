import "./App.css";
import React from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Tasks from "./Pages/Tasks/Tasks";
import Buy from "./Pages/Buy/Buy";
import { useState } from "react";
import { Pages } from "./Constants";
import { useEffect } from "react";
import { getAllTasks } from "./Services/WebService";
import 'font-awesome/css/font-awesome.min.css';
import Journal from "./Pages/Journal/Journal";

const App = () => {

  const [currentPage, setCurrentPage] = useState(Pages.HOME);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks().then((res) => {
      setTasks(res);
    });
  }, []);

  function navigateTo(page){
    setCurrentPage(page);
  }

  return (
    <div className="App">
      {
        {
          [Pages.HOME]: <Dashboard navigateTo={navigateTo} tasks={tasks}/>,
          [Pages.TASKS]: <Tasks navigateTo={navigateTo} tasks={tasks}/>,
          [Pages.JOURNAL]: <Journal navigateTo={navigateTo}/>,
          [Pages.BUY]: <Buy navigateTo={navigateTo}/>
        }[currentPage]
      }
    </div>
  );
};

export default App;