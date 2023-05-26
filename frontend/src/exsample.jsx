const handleMultipleGroupChange = async (e) => {
  const selectedOptions = Array.from(e.target.selectedOptions);
  const selectedGroups = selectedOptions.map((option) => option.value);
  setnewMultipleSubjects(selectedGroups);
};

<div className="dropdown">
  <select className="multiple_select" value={selectedUserIds} onChange={handleMultipleGroupChange} size={10} multiple>
    {/* <option value="">Выберите группу</option> */}
    {students.map((user) => (
      <option key={user.id} value={user.id}>
        {user.fio}
      </option>
    ))}
  </select>
</div>