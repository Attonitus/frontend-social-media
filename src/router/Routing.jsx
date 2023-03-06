import styled from 'styled-components'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import PublicLayout from '../components/layout/public/PublicLayout'
import Login from '../components/layout/pages/Login'
import Register from '../components/layout/pages/Register'
import PrivateLayout from '../components/layout/private/PrivateLayout'
import PageUser from '../components/layout/pages/PageUser'
import Error404 from '../components/layout/pages/Error404'
import AuthProvider from '../components/context/AuthProvider'
import Logout from '../components/users/Logout'
import PageProfile from '../components/layout/pages/PageProfile'
import EditPublication from '../components/layout/pages/EditPublication'
import SettingsUser from '../components/layout/pages/SettingsUser'

const RoutingStyled = styled.div`

`

function Routing() {
    return (
        <RoutingStyled>
             <BrowserRouter>
                <AuthProvider>             
                    <Routes>
                        <Route path='/' element={<PublicLayout />}>
                            <Route index element={<Login />} />
                            <Route path='login' element={<Login />} />
                            <Route path='registro' element={<Register />} />
                        </Route>

                        <Route path='/social' element={<PrivateLayout />}>
                            <Route index element={<PageUser />} />
                            <Route path='feed' element={<PageUser />} />
                            <Route path='profile' element={<PageProfile />} />
                            <Route path='profile/:id' element={<PageProfile />} />
                            <Route path='post/:id' element={<EditPublication />} />
                            <Route path='settings' element={<SettingsUser />} />
                            <Route path='logout' element={<Logout />} />
                        </Route>

                        <Route path='*' element={<Error404 />}/>
                    </Routes>
                </AuthProvider>
             </BrowserRouter>
        </RoutingStyled>
    )
}

export default Routing
