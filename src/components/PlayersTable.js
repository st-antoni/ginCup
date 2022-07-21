import './PlayersTable.css'
import {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';

const PlayersTable = ({isAdmin, parameters, name, players}) => {

    const [tablePlayers, setTablePlayers] = useState()

    useEffect(() => {
       setTablePlayers(players)
    }, [players])

    const sortPlayersByRating = () => {
        return tablePlayers.sort((player1, player2) => {
            return player2.rating - player1.rating
        })
    }

    return (
        <div>
            <h3>{name}</h3>
            {tablePlayers ? <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Страна</th>
                    <th>Рейтинг</th>
                    {isAdmin && parameters.map(parameter => {
                        return <th>{parameter.title}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {
                    sortPlayersByRating().map((player, index) => {
                        return (
                            <tr key={player.id}>
                                <td>{index + 1}</td>
                                <td>{player.name}</td>
                                <td>{player.lastname}</td>
                                <td>{player.country}</td>
                                <td>{player.rating}</td>
                                {isAdmin && parameters.map(parameter => {
                                    return <td>
                                        <button onClick={() => parameter.handler(player)}>{parameter.symbol}</button>
                                    </td>
                                })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table> : <Spinner animation="border" variant="dark"/>}
        </div>
    )
}

export default PlayersTable