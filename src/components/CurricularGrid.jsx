import { useState } from "react";
import { subjects } from "../mock/curriculum.json";
import { useHover } from "@mantine/hooks";
import { Table } from "@mantine/core";

function distributeElements(inputList) {
  const sortBySemester = Array.from({ length: 11 }, () => []);

  inputList.forEach((el) => {
    const index = el.semester;
    sortBySemester[index - 1].push(el);
  });

  const rows = [];
  while (sortBySemester.some((semester) => semester.length > 0)) {
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

function SemesterHeader({ totalSemesters }) {
  return (
    <Table.Tr>
      {Array.from({ length: totalSemesters }, (_, index) => (
        <Table.Th key={index}>{index + 1}° Semestre</Table.Th>
      ))}
    </Table.Tr>
  );
}

function TableCell({ subject, onClick, style }) {
  const { hovered, ref } = useHover();

  return (
    <Table.Td
      onClick={() => onClick(subject)}
      style={{ ...style, outline: hovered ? "2px solid black" : "none" }}
      ref={ref}
    >
      {subject ? subject.name : null}
    </Table.Td>
  );
}

function TableRow({ row, onClick, getCellStyle }) {
  return (
    <Table.Tr>
      {row.map((subject, index) => (
        <TableCell
          key={index}
          subject={subject}
          onClick={onClick}
          style={getCellStyle(subject)}
        />
      ))}
    </Table.Tr>
  );
}

function ColorLogic(clicked, subject) {
  if (!subject) return { cursor: "default", backgroundColor: "white" };

  let backgroundColor = "white";
  if (clicked?.name === subject.name) backgroundColor = "lightblue";
  if (clicked?.prev.includes(subject.name)) backgroundColor = "orange";
  if (clicked?.next.includes(subject.name)) backgroundColor = "lightgreen";

  return {
    cursor: "pointer",
    backgroundColor,
  };
}

function CurricularGrid() {
  const [clicked, setClicked] = useState(null);

  const getCellStyle = (subject) => ColorLogic(clicked, subject);

  const totalSemesters = 11;
  const rows = distributeElements(subjects);

  return (
    <Table
      verticalSpacing="md"
      striped
      withColumnBorders
      withTableBorder
      style={{ marginTop: 20 }}
    >
      <Table.Thead style={{ backgroundColor: "lightgray" }}>
        <SemesterHeader totalSemesters={totalSemesters} />
      </Table.Thead>
      <Table.Tbody>
        {rows.map((row, index) => (
          <TableRow
            key={index}
            row={row}
            onClick={setClicked}
            getCellStyle={getCellStyle}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default CurricularGrid;
