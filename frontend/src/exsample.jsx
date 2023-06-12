
// пометки че нада пофиксить, заебался забывать
// 
// 
// обновление зачетки сделай через 3 грид фрейм
// короче сделай файлы как в винде без границ белым цветом чтобы при наводе подсвечивались серым и
// и еще сделай везде квадратный полупрозрачный стиль блоков как в селекторах
// так как антон убрал админов и преподов из групп сделай их в 2 отдельных селектора

useEffect(async () => {
  try {
      setTimeout(() => {
          showSubblockMount(true);
      }, 100);
      fetchGroups()
  } catch (error) {
      console.error(error);
      console.error('ERROR GET LESSONS');
      toast.error('Произошла ошибка при получении расписания. Попробуйте позже или обратитесь в техподдержку');
  }
}, []);

const fetchGroups = async () => {
  try {
      const response = await apiSchedule.groups();
      setGroups(response.data.message);
  } catch (error) {
      console.error(error);
      console.error('ERROR GET GROUPS');
      toast.error(
          'Произошла ошибка при получении групп. Попробуйте позже или обратитесь в техподдержку'
      );
  }
};
