import { subjects } from '../mock/curriculum.json'
import { Table } from '@mantine/core'

function distributeElements(inputList) {
  const sortBySemester = Array.from({ length: 11 }, () => [])

  inputList.forEach(el => {
    const index = el.semester;
    sortBySemester[index - 1].push(el);
  })

  const rows = [];
  while (sortBySemester.some(semester => semester.length > 0)) {
    const row = [];
    for (let i = 0; i < 11; i++) {
      if (sortBySemester[i].length > 0) {
        row.push(sortBySemester[i].shift());
      } else {
        row.push(null);
      }
    }
    rows.push(row);
  }

  return rows;
}

function CurricularGrid() {
  const header = Array.from({ length: 11 }, (_, index) => (
    <Table.Th key={index}>{index + 1}° Semestre</Table.Th>
  ))

  const rows = distributeElements(subjects).map((row, index) => (
    <Table.Tr key={index}>
      {row.map((subject, index) => (
        <Table.Td key={index}>
          {subject ? subject.name : null}
        </Table.Td>
      ))}
    </Table.Tr>
  ))

  return (
    <Table
      verticalSpacing="md"
      striped
      withColumnBorders
      withRowBorders={false}
      style={{ marginTop: 20 }}
    >
      <Table.Thead>
        <Table.Tr>{header}</Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
export default CurricularGrid
