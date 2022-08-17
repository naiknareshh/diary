import styles from './AddButton.module.css'

export default function AddButton(props){
    return (
        <div className={styles.addBtn} onClick={props.invokeFunction}>
            <i className="fa fa-plus"></i>
        </div>
    )
}