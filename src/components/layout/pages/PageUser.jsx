import { useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../context/AuthProvider'
import CreatePublication from '../../publication/CreatePublication'
import Timeline from '../../publication/Timeline'
import WhoFollow from '../../users/WhoFollow'
import Header from '../general/Header'

const PageUserStyled = styled.div`
    @media screen and (min-width: 768px){
        display: grid;
        grid-template-columns: 25rem 1fr;
        grid-template-rows: auto auto auto;
        column-gap: 2rem;
        grid-template-areas: "header header" "follow create" "follow timeline";
    }
`

function PageUser() {

    const {auth, token} = useContext(AuthContext)
    const [feedProfile, setfeedProfile] = useState(false) 

    return (
        <PageUserStyled>
            <Header />
            <WhoFollow auth={auth} token={token} />
            <CreatePublication auth={auth} token={token} />
            <Timeline auth={auth} feedProfile={feedProfile} token={token} />
        </PageUserStyled>
    )
}

export default PageUser
