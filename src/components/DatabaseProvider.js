import {createContext, useContext, useEffect, useState} from 'react';
import {getDatabase, onValue, ref, remove, set} from 'firebase/database';
import {initializeApp} from 'firebase/app';
import config from '../config';

const Context = createContext()

const app = initializeApp(config)

const database = getDatabase(app)


export const usePlayers = () => useContext(Context)


const DatabaseProvider = ({children}) => {
    const [awaitingPlayers, setAwaitingPlayers] = useState()
    const [registeredPlayers, setRegisteredPlayers] = useState()
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState()

    useEffect(() => {
        onValue(ref(database, 'awaiting/'), (snapshot) => {
            setAwaitingPlayers(Object.values(snapshot.val()))
        })
    }, [])

    useEffect(() => {
        onValue(ref(database, 'players/'), (snapshot) => {
            setRegisteredPlayers(Object.values(snapshot.val()))
        })
    }, [])

    const submitButtonHandler = (player) => {

        set(ref(database, 'players/' + player.name + ' ' + player.lastname), {
            name: player.name,
            lastname: player.lastname,
            email: player.email,
            country: player.country,
            rating: player.rating,
            id: player.id
        });

        remove(ref(database, 'awaiting/' + player.name + ' ' + player.lastname))
    }

    const declineButtonHandler = (player) => {

        const date = new Date()

        set(ref(database, 'deleted/' + player.name + ' ' + player.lastname), {
            name: player.name,
            lastname: player.lastname,
            email: player.email,
            country: player.country,
            rating: player.rating,
            id: player.id,
            deletionDate: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
        })

        remove(ref(database, 'awaiting/' + player.name + ' ' + player.lastname))
    }

    const deleteButtonHandler = (player) => {

        const date = new Date()

        set(ref(database, 'deleted/' + player.name + ' ' + player.lastname), {
            name: player.name,
            lastname: player.lastname,
            email: player.email,
            country: player.country,
            rating: player.rating,
            id: player.id,
            deletionDate: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
        })

        remove(ref(database, 'players/' + player.name + ' ' + player.lastname))
    }

    const checkPlayers = (newPlayer, players) => {

        let result = true

        const checkLoop = (data) => {
            const formattedPlayers = Object.values(data)
            for (let existingPlayer of formattedPlayers) {
                if (newPlayer.name === existingPlayer.name && newPlayer.lastname === existingPlayer.lastname) {
                    result = false
                }
            }
        }

        onValue(ref(database, players), snapshot => {
            const data = snapshot.val()
            checkLoop(data)
        })

        return result
    }

    const addPlayerHandler = (newPlayer) => {

        if (!checkPlayers(newPlayer, 'awaiting/') || !checkPlayers(newPlayer, 'players/')) {
            setIsRegistrationSuccessful(false)
        } else {
            set(ref(database, 'awaiting/' + newPlayer.name + ' ' + newPlayer.lastname), {
                name: newPlayer.name,
                lastname: newPlayer.lastname,
                email: newPlayer.email,
                country: newPlayer.country,
                rating: newPlayer.rating,
                id: newPlayer.id
            })
            setIsRegistrationSuccessful(true)
        }
    }


    return (
        <Context.Provider value={{awaitingPlayers, registeredPlayers, submitButtonHandler, declineButtonHandler, deleteButtonHandler, addPlayerHandler, isRegistrationSuccessful}}>
            {children}
        </Context.Provider>
    )
}


export default DatabaseProvider