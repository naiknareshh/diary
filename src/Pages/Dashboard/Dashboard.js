import styles from './Dashboard.module.css'
import { useNavigate } from "react-router-dom";

function Dashboard() {
    let navigate = useNavigate();

    function openTasks(){
        
    }

    return (
        <div>
            <header className='flex-row pad-1rem5'>
                <img src="https://avatars.githubusercontent.com/u/105363653?v=4" alt="" id={styles.avatar}></img>
                <div className={styles.userDetails}><p className='nomargin bold font-size-med'>Naresh Naik</p><p className='nomargin gray'>Business magnate and Investor</p></div>
            </header>
            <main className='flex-col pad-1rem5'>
                <div className={styles.tasksBtn} onClick={openTasks}>
                    <h2>Tasks</h2>
                    <p>0/1 Complete</p>
                </div>
            </main>
        </div>
    )
}

export default Dashboard;