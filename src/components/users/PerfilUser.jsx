import styled from 'styled-components'


const PerfilUserStyled = styled.div`
    grid-area: perfil;

    .perfil{
        margin: 1rem;
        max-inline-size: 45rem;
        background-color: #282C31;
        border-radius: 1rem;
        position: relative;
    }
    .perfilCover{
        display: flex;
        flex-direction: column;
        border-radius: 1.5rem;

    }

    .cover{
        inline-size: 100%;
        object-fit: cover;
        block-size: 15rem;
        border-start-end-radius: 1rem;
        border-start-start-radius: 1rem;
        display: block;
    }
    .perfilImg{
        inline-size: 10rem;
        position: absolute;
        border-radius: 50%;
        left: 33%;
        top: 25%;
    }
    .perfilDescription{
        padding: 1rem;
        padding-block-start: 3rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    .about{
        font-size: .9rem;

    }
    .about-div{
        max-inline-size: 30rem;
    }
    .followInfo{
        font-size: 1rem;
    }

    @media screen and (min-width: 350px){
        .perfilImg{
            left: 28%;
            top: 21%;
        }
    }

    @media screen and (min-width: 375px){
        .perfilImg{
            left: 28%;
            top: 20%;
        }
    }


    @media screen and (min-width: 400px){
        .perfilImg{
            left: 30%;
            top: 23%;
        }
    }

    @media screen and (min-width: 500px){
        .perfilImg{
            left: 33%;
            top: 23%;
        }
    }

    @media screen and (min-width: 600px){
        .perfilImg{
            left: 35%;
            top: 23%;
        }
    }

    @media screen and (min-width: 700px){
        .perfilImg{
            left: 38%;
            top: 23%;
        }
    }

    @media screen and (min-width: 768px){
        .perfilImg{
            left: 39%;
            top: 23%;
        }
    }


`

function PerfilUser({auth}) {

    return (
        <PerfilUserStyled>
            <div className="perfil">
                <div className="perfilCover">
                    <img className='cover' src={auth.coverPicture  ? auth.coverPicture.url : 'https://res.cloudinary.com/dkzturwmj/image/upload/v1678075277/usersImage/default-cover_swixy8.png'} alt={`Imagen de ${auth.name}`} title={`Imagen de ${auth.name}`} />
                    <img className='perfilImg' src={auth.profilePicture  ? auth.profilePicture.url : 'https://res.cloudinary.com/dkzturwmj/image/upload/v1678075277/usersImage/user_default_rna1sq.jpg'} alt={`Imagen de ${auth.name}`} title={`Imagen de ${auth.name}`} />
                </div>
                <div className="perfilDescription">
                    <span>{auth.username}</span>
                    <div className="about-div">
                        <span className='about'>{auth.about ? auth.about : "No posee una biografía"}</span>
                    </div>
                    <span className='followInfo'>{auth.followers.length} Seguidores | {auth.following.length} Siguiendo</span>
                </div>
            </div>
        </PerfilUserStyled>
    )
}

export default PerfilUser
