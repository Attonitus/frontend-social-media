import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../../context/AuthProvider'

const HeaderStyled = styled.div`
    position: sticky;
    top: 0;
    z-index: 100;
    grid-area: header;
    background-color: #282C31;
    img{
        display: block;
        object-fit: cover;
        border-radius: 50%;
    }
    ul{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        gap: 1rem;
    }
    .icon{
        font-size: 2.75rem;
        color: #707379;

    }
    .icon:hover{
        cursor: pointer;
    }
    .center{
        display: flex;
        justify-content: space-between;
        inline-size: 100%;
        padding-inline: 1rem;
        padding-block: .5rem;

    }
    .separation{
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .settings{
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    a{
        color: white;
        text-decoration: none;
    }

`

function Header() {

    const {auth} = useContext(AuthContext)

    return (
        <HeaderStyled>
            <header>
                <nav>
                    <ul>
                        <div className="center">
                            <div className="separation">
                                <NavLink to="/"><span className="material-symbols-outlined icon">home</span></NavLink>
                                <NavLink to="/social/profile">
                                    <img 
                                    src={auth.profilePicture ? auth.profilePicture.url : '../../../assets/user_default.jpg'}  
                                    alt={auth.name} 
                                    title={auth.name}
                                    width="50" height="50"/>
                                </NavLink>
                                <NavLink to="/social/profile">{auth.username}</NavLink>
                            </div>
                            <div className="settings">
                                <NavLink to="/social/settings"><span className="material-symbols-outlined icon">settings</span></NavLink>
                                <NavLink to="/social/logout"><span className="material-symbols-outlined icon">logout</span></NavLink>
                            </div>
                        </div>
                    </ul>
                </nav>
            </header>
        </HeaderStyled>
    )
}

export default Header
