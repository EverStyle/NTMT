
// пометки че нада пофиксить, заебался забывать
// 
// 
// обновление зачетки сделай через 3 грид фрейм
// короче сделай файлы как в винде без границ белым цветом чтобы при наводе подсвечивались серым и
// и еще сделай везде квадратный полупрозрачный стиль блоков как в селекторах
// так как антон убрал админов и преподов из групп сделай их в 2 отдельных селектора

const handleChange = (selectedOption) => {
  const selectedGroup = selectedOption.value;
  console.log("WORK");
  console.log(selectedGroup);

  if (selectedGroup === "retShedule") {
    setSwitchSchedule(false);
    setSelectedGroup(selectedGroup);
  } else {
    showSubblockMount2(true)
    setSwitchSchedule(true);
    setSelectedGroup(selectedGroup);
  }
};

<div>
  <div className="subblock_text">
    Выберите группу
  </div>
  <Select
    onChange={handleChange}
    options={[
      { value: "retShedule", label: "Рассписание всех групп" },
      ...allGroups?.map(group => ({
        value: group.code,
        label: `${group.groupName} (${group.code})`,
      }))
    ]}
    placeholder="Enter a group"
  />
</div>

