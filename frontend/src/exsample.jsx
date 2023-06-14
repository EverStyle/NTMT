
// пометки че нада пофиксить, заебался забывать
// 
// 
// обновление зачетки сделай через 3 грид фрейм
// короче сделай файлы как в винде без границ белым цветом чтобы при наводе подсвечивались серым и
// и еще сделай везде квадратный полупрозрачный стиль блоков как в селекторах
// так как антон убрал админов и преподов из групп сделай их в 2 отдельных селектора

const [showBriefInfo, setShowBriefInfo] = useState(true);

const handleBlockClick = () => {
  setShowBriefInfo(false);
};

<main className='container'>
    <Headers
        setToken={setToken}
        user={user}
        setUser={setUser}
    />
    <div className='content'>
        <PersonalArea role={json43.roleId} onClick={handleBlockClick} />
        <div className='routers'>
            <Route path='/adminyvedomlenia' component={AdminNotification} />
            <Route path='/adminras' component={AdminSchedule} />
            <Route path='/adminfail' component={AdminFileScreen} />
            <Route path='/adminzachetka' component={AdminRecordBook} />
            <Route path='/adminplan' component={AdminPlanScreen} />
        </div>
    </div>
    {showBriefInfo && (
        <div className='brief-info'>
            <FirstInfoBlock></FirstInfoBlock>
        </div>
    )}
</main>
