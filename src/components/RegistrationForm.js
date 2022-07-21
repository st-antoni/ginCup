import styles from './RegistrationForm.module.css'
import {Col, Form, Row} from 'react-bootstrap';

const RegistrationForm = (props) => {

    const cancelButtonHandler = () => {
        props.onSend(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const newPlayer = {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            country: document.getElementById('country').value,
            email: document.getElementById('email').value,
            rating: document.getElementById('rating').value,
            id: Math.random().toString()
        }

        props.onAddPlayer(newPlayer)
        props.onSend(false)

    }

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md='4'>
                    <Form.Control required placeholder="Имя" type="text" id="name" size="sm"/>
                    <Form.Control.Feedback type='invalid'>!!!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Control placeholder="Фамилия" type="text" id="lastname" size="sm" required={true}/>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Control placeholder="Страна" type="text" id="country" size="sm" required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="email"
                              id="email"
                              size="sm"
                              placeholder="email"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control placeholder="Рейтинг" type="number" id="rating" size="sm" required/>
            </Form.Group>
            <button className={styles.button} type='submit'>Отправить</button>
            <button className={styles.button} onClick={cancelButtonHandler}>Отменить</button>
        </Form>
    )
}

export default RegistrationForm