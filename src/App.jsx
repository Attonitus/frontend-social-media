import styled from 'styled-components'
import Login from './components/layout/pages/Login'
import PageProfile from './components/layout/pages/PageProfile'
import PageUser from './components/layout/pages/PageUser'
import Register from './components/layout/pages/Register'
import Routing from './router/Routing'

const AppStyled = styled.div`

`

function App() {
  return (
    <AppStyled>
      {/* <PageUser /> */}
      {/* <PageProfile /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      <Routing />
    </AppStyled>
  )
}

export default App
