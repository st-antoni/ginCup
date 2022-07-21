import styles from './RegistrationButton.module.css'
import {useState} from 'react';
import RegistrationForm from './RegistrationForm';
import Alert from './Alert';
import {usePlayers} from './DatabaseProvider';

const RegistrationButton = () => {

    const { addPlayerHandler, isRegistrationSuccessful } = usePlayers()

    const [isClicked, changeIsClicked] = useState(false)

    const buttonClickHandler = (event) => {
        event.preventDefault()
        changeIsClicked(!isClicked)

    }

    return (
        <div>
            <button className={styles.button} onClick={buttonClickHandler}>Регистрация</button>
            {isClicked && (<RegistrationForm onSend={changeIsClicked} onAddPlayer={addPlayerHandler}/>)}
            {(isRegistrationSuccessful === true) &&
                <Alert variant="success">Регистрация прошла успешно!</Alert>}
            {(isRegistrationSuccessful === false) &&
                <Alert variant="failure">Вы уже зарегистрированы или ожидаете подтверждения</Alert>}
        </div>
    )
}

export default RegistrationButton