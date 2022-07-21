import PlayersTable from './PlayersTable';
import {useEffect, useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {usePlayers} from './DatabaseProvider';


const TableControlComponent = () => {
    const [adminFormVisible, changeVisibility] = useState(false)
    const [isAdmin, changeIsAdmin] = useState(false)
    const {submitButtonHandler, declineButtonHandler, deleteButtonHandler, registeredPlayers, awaitingPlayers} = usePlayers()

    useEffect(() => {
        window.addEventListener('keyup', (event) => {
            if (event.ctrlKey && event.altKey && (event.code === 'KeyK')) {
                changeVisibility((prevState) => !prevState)
            }
        })
    }, []);

    const adminButtonHandler = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, 'starikevichanton1@gmail.com', document.getElementById('password').value)
            .then(() => {
                changeIsAdmin(true)
            })
            .catch(error => {
                alert(error.code + ' ' + error.message)
            })
    }

    return (
        <div>
            <PlayersTable isAdmin={isAdmin}
                          parameters={[{title: 'Delete', handler: deleteButtonHandler, symbol: '-'}]}
                          players={registeredPlayers}
                          name="Зарегистрированные игроки"/>
            {adminFormVisible &&
                <div>
                    <input id="password"/>
                    <button onClick={adminButtonHandler}>log in</button>
                </div>}
            {isAdmin &&
                <PlayersTable isAdmin={isAdmin}
                              parameters={[{
                                  title: 'Confirm',
                                  handler: submitButtonHandler,
                                  symbol: '+'
                              }, {title: 'Decline', handler: declineButtonHandler, symbol: '-'}]}
                              players={awaitingPlayers}
                              name="Ожидающие игроки"
                />
            }
        </div>
    )
}

export default TableControlComponent