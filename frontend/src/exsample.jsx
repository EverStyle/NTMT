
// пометки че нада пофиксить, заебался забывать
// замени дайт пикер для телфонов на спец !!!!!!!!НЕВОЗМОЖНО!!!!!!!!!!!1
// переделай учебный план для препода, убери смысловой блок и замни выборку в общий селект
// обновление зачетки сделай через 3 грид фрейм
//
//
//

const [groups, setGroups] = useState([]);
const [students, setStudents] = useState([]);
const [newStudents, setNewStudents] = useState(0);
const [newGroups, setNewGroups] = useState([]);

const handleGroupChange = (e) => {
  const groupId = e.value;
  setNewGroups(groupId);
  console.log(groupId);
  if (groupId === "") {
      console.log("Stud CLEAR")
      setUserRecord([]);
      setStudents([]); // Clear the students array when the default value is selected

  } else {
      fetchStudents(groupId);
      setUserRecord([]); // Send an empty array when the group changes
  }
};

<div>
  <Select
    className="new_select_subblock"
    onChange={handleGroupChange}
    options={[
      { value: "", label: "Выберите группу" },
      ...groups.map((grp) => ({
        value: grp.id,
        label: `${grp.code} ${grp.groupName} ${grp.type}`,
      })),
    ]}
    placeholder="Выберите группу"
  />
  <Select
    className="new_select_subblock"
    onChange={(selectedOption) => setNewStudents(selectedOption.value)}
    options={[
      { value: "Some", label: "Выберите студента" },
      ...students.map((student) => ({
        value: student.id,
        label: student.fio,
      })),
    ]}
  />
</div>



