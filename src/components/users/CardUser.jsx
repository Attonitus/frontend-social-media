import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalUrl } from '../../helpers/GlobalUrl'
import { AuthContext } from '../context/AuthProvider'

const CardUserStyled = styled.div`
    .card{
        display: flex;
        justify-content: space-between;
    }
    img{
        border-radius: 50%;
        display: block;
    }
    .cardLeft{
        display: flex;
        gap: 1rem;
        align-items: center;
    }
    .cardInfo{
        display: flex;
        flex-direction: column;
    }
    .name{
        font-size: 1rem;
        font-weight: 500;
    }
    .username{
        font-size: .9rem;
        color: #737578;
    }
    a{
        color: white;
        text-decoration: none;
    }

`

function CardUser({profilePicture, name, username, _id}) {

    const {auth, token} = useContext(AuthContext)
    const {following} = auth
    const [follow, setFollow] = useState(following.includes(_id))


    const onFollow = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/follows/${_id}`, {
                method: "PUT",
                headers: {
                    'Authorization':token
                }
            })
            await response.json()
            setFollow(true)
        } catch (error) {
            console.log(error)
        }
    }

    const onUnFollow = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/follows/${_id}/unfollow`, {
                method: "PUT",
                headers: {
                    'Authorization':token
                }
            })
            await response.json()
            setFollow(false)
        } catch (error) {
            console.log(error)
        }
    }

    
    if(auth._id === _id){
        return false
    }else {
        return (
            <CardUserStyled>
                <div className="card">
                    <div className="cardLeft">
                        <div className="cardImg">
                        <NavLink to={`/social/profile/${_id}`}>
                            <img 
                            src={profilePicture ? profilePicture.url : 'https://res.cloudinary.com/dkzturwmj/image/upload/v1678075277/usersImage/user_default_rna1sq.jpg'} 
                            alt={name} title={name} width="50" height="50" /></NavLink>
                        </div>
                        <div className="cardInfo">
                            <NavLink to={`/social/profile/${_id}`}><span className='name'>{name}</span></NavLink>
                            <NavLink to={`/social/profile/${_id}`}><span className='username'>{`@${username}`}</span></NavLink>
                        </div>
                    </div>
                    <div className="cardFollow">
                        <button className='follow' onClick={follow ? onUnFollow : onFollow}>{ follow ? 'Dejar de seguir' : 'Seguir'}</button>
                    </div>
                </div>
            </CardUserStyled>
        )
    }


}

export default CardUser
