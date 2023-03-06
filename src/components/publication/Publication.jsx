import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GlobalUrl } from '../../helpers/GlobalUrl'
import ReactTimeAgo from 'react-time-ago'
import { Link, useNavigate } from 'react-router-dom'

const PublicationStyled = styled.div`
    background-color: #282C31;
    margin: 1rem;
    max-inline-size: 50rem;
    border-radius: 1rem;
    .perfilImg{
        border-radius: 50%;
        object-fit: cover;
    }

    .publiInfo{
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
    .publiInfoUp{
        padding-block: .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .publiInfoLeft{
        display: flex;
        align-items: center;
        gap: .5rem;
    }
    .publiInfoRight{
        display: flex;
        gap: 1rem;
    }
    .textPubli{
        display: flex;
        flex-direction: column;
        font-size: .9rem;
    }
    .ago{
        font-size: .8rem;
        color: #737578;
    }
    .name{
        font-weight: 500;
    }
    .publiInfoDown{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-size: 1rem;
        margin-block-end: 1rem;
    }
    .imgPubli{
        border-radius: .5rem;
    }
    .icon{
        color: #5F6268;
    }
    .icon{
        cursor: pointer;
    }
    .like{
        color: pink;
    }
    .publiInfoLikes{
        display: flex;
        align-items: center;
        gap: .25rem;
        font-size: 1rem;
    }
    a{
        color: white;
        text-decoration: none;
    }


`

function Publication({createdAt, description, image, userId, likes, token, auth, id}) {

    const [user, setUser] = useState()
    const {following} = auth
    const [follow, setFollow] = useState(following.includes(userId))
    const [like, setLike] = useState(likes.includes(auth._id))
    const [likeCount, setLikeCount] = useState(likes.length)

    const navigate = useNavigate()

    const onFollow = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/follows/${userId}`, {
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
            const response = await fetch(`${GlobalUrl.url}/follows/${userId}/unfollow`, {
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

    const getUserInfo = async(userId) => {
        try {
            const response = await fetch(`${GlobalUrl.url}/users/profile/${userId}`, {
                headers: {
                    "Authorization" : token
                }
            })
            const json = await response.json()
            setUser(json)
        } catch (error) {
            console.log(error)
        }
    }

    const onLikePost = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/posts/${id}/like`, {
                method: "PUT",
                headers : {
                    "Authorization": token
                }
            })
            await response.json()
            setLike(!like)
            !like ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1)
        } catch (error) {
            console.log(error)
        }
    }
    const onDelete = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization" : token
                }
            })
            await response.json()
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getUserInfo(userId)
    },[])

    if(user){
        return (
            <PublicationStyled>
                <div className="publiInfo">
                    <div className="publiInfoUp">
                        <div className="publiInfoLeft">
                            <div className="imgPubli">
                                <Link to={`profile/${userId}`}>
                                <img className='perfilImg'
                                src={user.profilePicture ? user.profilePicture.url : 'https://res.cloudinary.com/dkzturwmj/image/upload/v1678075277/usersImage/user_default_rna1sq.jpg'} 
                                alt={`Imagen de ${user.name}`} title={`Imagen de ${user.name}`} width="50" height="50" />
                                </Link>
                            </div>
                            <div className="textPubli">
                                <Link to={`profile/${userId}`}><span className='name'>{user.username}</span></Link>
                                <span className='ago'><ReactTimeAgo date={Date.parse(createdAt)} locale="es-ES" /></span>
                            </div>
                        </div>
                        <div className="publiInfoRight">
                            {
                                userId === auth._id ? <button className='editButton' onClick={()=>navigate(`post/${id}`)}><span className="material-symbols-outlined">edit</span></button> : null
                            }
                            {
    
                                userId === auth._id ? <button className='deleteButton' onClick={onDelete}><span className="material-symbols-outlined">delete</span></button> :
                                <button className='follow' onClick={follow ? onUnFollow : onFollow}>{ follow ? 'Dejar de seguir' : 'Seguir'}</button>
                            }
                        </div>
                    </div>
                    <div className="publiInfoDown">
                        {description}
                        {
                            image ? (<img className='imgPubli'
                            src={image.url} 
                            alt={`Imagen de publicación de ${user.username}`} title={`Imagen de publicación de ${user.username}`}  />) : null
                        }
                    </div>
                    <div className="publiInfoLikes">
                        <span className={`material-symbols-outlined icon ${like ? 'like' : null}`} onClick={onLikePost}>
                            favorite
                        </span>
                        <span>{likeCount}</span>
                    </div>
                </div>
            </PublicationStyled>
        )
    } else {
        null
    }
}

export default Publication
