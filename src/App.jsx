import { Container, Title, Text } from '@mantine/core'
import CurricularGrid from './components/CurricularGrid'

function App() {
  return (
    <Container size="xl">
      <Title align="center" style={{ marginTop: 20 }}>Malla Curricular ICINF 2020</Title>

      <CurricularGrid />

      <Text c="dimmed" size="sm">
        2022 Universidad de Los Lagos. MIT License. Creado por <a href="http://github.com/Awerito">Awerito</a>
      </Text>
    </Container>
  )
}

export default App
