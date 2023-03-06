import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GlobalUrl } from '../../helpers/GlobalUrl'
import CardUser from './CardUser'

const WhoFollowStyled = styled.div`
    grid-area: follow;
    margin-block: 1rem;
    margin-inline: auto;
    max-inline-size: 25rem;
    padding: 1rem;
    background-color: #282C31;
    border-radius: 1rem;
    @media screen and (min-width: 768px){
        margin: 1rem;
    }
    .whoFollowCard{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h3{
        margin: 0;
        margin-block-start: 1rem;
        margin-block-end: 1.25rem;
    }

`

function WhoFollow({auth, token}) {
    
    const [counter, setCounter] = useState(1)
    const [users, setUsers] = useState()

    const getUsers = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/users/list/${counter}`, {
                headers: {
                    "Authorization" : token
                }
            })
            const json = await response.json()
            setUsers(json)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getUsers()
    }, [counter])


    return (
        <WhoFollowStyled>
            <div className="whoFollowCard">
                <h3>A quién seguir</h3>
                {
                    !users ? <h3>Cargando...</h3> :
                    users.docs.map(user => {
                        return <CardUser key={user._id} {...user} />
                    })
                }
                <button className='follow' onClick={()=>setCounter(counter + 1)}>Mostrar otros</button>
            </div>
        </WhoFollowStyled>
    )
}

export default WhoFollow
