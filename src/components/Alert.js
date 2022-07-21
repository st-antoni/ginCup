import styles from './Alert.module.css'

const Alert = (props) => {
    return (
        <div className={styles[props.variant]}>
            {props.children}
        </div>
    )
}

export default Alert