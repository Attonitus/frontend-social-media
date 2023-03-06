import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalUrl } from '../../../helpers/GlobalUrl'
import { AuthContext } from '../../context/AuthProvider'
import CreatePublication from '../../publication/CreatePublication'
import Timeline from '../../publication/Timeline'
import PerfilUser from '../../users/PerfilUser'
import Header from '../general/Header'

const PageProfileStyled = styled.div`
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 768px){
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto auto;
        column-gap: 2rem;
        grid-template-areas: "header header" "perfil perfil" "create create" "timeline timeline";
    }
`

function PageProfile() {

    const {auth, token} = useContext(AuthContext)
    const {id} = useParams()
    const [userProfile, setUserProfile] = useState()
    const [feedProfile, setfeedProfile] = useState(true) 

    const getUserProfile = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/users/profile/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            const json = await response.json() 
            setUserProfile(json)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        id ? getUserProfile()  : null
    }, [])

    return (
        <PageProfileStyled>
            <Header />
            {
                id ? ( userProfile ? <PerfilUser auth={userProfile} /> : null) :
                <PerfilUser  auth={auth} />
            }
            <CreatePublication auth={auth} token={token} />
            <Timeline auth={auth} feedProfile={feedProfile} id={id} token={token} />
        </PageProfileStyled>
    )
}

export default PageProfile
