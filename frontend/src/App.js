import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Headers from "./components/Header/Header";
import PersonalArea from "./screens/PersonalArea";
import FileScreen from "./screens/FileScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import PlanScreen from "./screens/PlanScreen";
import RecordBookScreen from "./screens/RecordBookScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import AdminSchedule from "./screens/AdminSchedule";
import AdminRecordBook from "./screens/AdminRecordBook";
import AdminFileScreen from "./screens/AdminFileScreen";
import AdminPlanScreen from "./screens/AdminPlanScreen";
import AdminNotification from "./screens/AdminNotification";
import TeacherFileScreen from "./screens/TeacherFileScreen";
import TeacherNotification from "./screens/TeacherNotification";
import TeacherPlanScreen from "./screens/TeacherPlanScreen";
import TeacherSchedule from "./screens/TeacherShedule";
import TeacherRecordBook from "./screens/TeacherRecordBook";
import FirstInfoBlock from "./components/FirstInfoBlock";
import { useState, useEffect } from "react";
import Login from "./screens/Login/Login";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const location = useLocation();
  //  ;
  const [showBriefInfo, setShowBriefInfo] = useState(true);
  
  //  ;

  const handleBlockClick = () => {
    setShowBriefInfo(false);
  };
  // useEffect(() => {
  //   setToken(localStorage.getItem('token') || '');
  //   if (token) {
  //     localStorage.setItem('token', token || '');
  //   }
  // }, [token]);
  useEffect(() => {
    const storedToken = localStorage.getItem('token') || '';
    setToken(storedToken);
    if (location.pathname === '/') {
       ;
      setShowBriefInfo(true);
    } else {
       ;
      setShowBriefInfo(false);
    }
    if (storedToken) {
      localStorage.setItem('token', storedToken);
      const decodedToken = parseJwt(storedToken);
      const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
      if (expirationTime < Date.now()) {
        // Token has expired, clear token and set expiration to null
        setToken('');
        setTokenExpiration(null);
        localStorage.removeItem('token');
      } else {
        setTokenExpiration(expirationTime);
      }
    }
  }, [location.pathname]);

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }


  return (
  
      <div>
      {token && tokenExpiration && tokenExpiration > Date.now() ? (
        // token
        <>
          {(() => {
            let json43 = parseJwt(token);
            //распаристь двт там строка а не число
             
            switch (parseInt(json43.roleId)) {
              //админ
              case 1:
                return <>
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
                      {showBriefInfo && (
                      <div className='brief-info'>
                      <FirstInfoBlock></FirstInfoBlock>
                      </div>
                    )}
                    </div>
                  </main>
                  <Footer />
                </>
              case 2:
                //родитель
                return <>
                  <main className='container'>
                    <Headers
                      setToken={setToken}
                      user={user}
                      setUser={setUser}
                    />
                    <div className='content'>
                      <PersonalArea role={json43.roleId} />
                      <div className='routers'>
                        <Route path='/yvedomlenia' component={NotificationsScreen} />
                        <Route path='/ras' component={ScheduleScreen} />
                        <Route path='/fail' component={FileScreen} />
                        <Route path='/zachetka' component={RecordBookScreen} />
                        <Route path='/plan' component={PlanScreen} />
                      </div>
                    </div>
                  </main>
                  <Footer />
                </>
              case 3:
                //препод
                return <>
                  <main className='container'>
                    <Headers
                      setToken={setToken}
                      user={user}
                      setUser={setUser}
                    />
                    <div className='content'>
                      <PersonalArea role={json43.roleId} />
                      <div className='routers'>
                        <Route path='/teacheryvedomlenia' component={TeacherNotification} />
                        <Route path='/teacherras' component={TeacherSchedule} />
                        <Route path='/teacherfail' component={TeacherFileScreen} />
                        <Route path='/teacherzachetka' component={TeacherRecordBook} />
                        <Route path='/teacherplan' component={TeacherPlanScreen} />
                      </div>
                      {showBriefInfo && (
                      <div className='brief-info'>
                      <FirstInfoBlock></FirstInfoBlock>
                      </div>
                    )}
                    </div>
                  </main>
                  <Footer />
                </>
              case 4:
                //студент
                return <>
                  <main className='container'>
                    <Headers
                      setToken={setToken}
                      user={user}
                      setUser={setUser}
                    />
                    <div className='content'>
                      <PersonalArea role={json43.roleId} />
                      <div className='routers'>
                        <Route path='/yvedomlenia' component={NotificationsScreen} />
                        <Route path='/ras' component={ScheduleScreen} />
                        <Route path='/fail' component={FileScreen} />
                        <Route path='/zachetka' component={RecordBookScreen} />
                        <Route path='/plan' component={PlanScreen} />
                      </div>
                      {showBriefInfo && (
                      <div className='brief-info'>
                      <FirstInfoBlock></FirstInfoBlock>
                      </div>
                    )}
                    </div>
                  </main>
                  <Footer />
                </>
              default:
                return <div>Default Screen</div>
            }
            // крейзи щит крч, сначало в юзер роль выводится андефайнед на время ответа от сервера наверное, потом он принимает уже ид ответа и вроде перезаписывает а вроде и нет
          })()}
        </>
      ) : (
        <main className='container'>
          <Route path="/">
            <Login
              setToken={(newToken) => {
                setToken(newToken);
                const decodedToken = parseJwt(newToken);
                const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
                setTokenExpiration(expirationTime);
                localStorage.setItem('token', newToken);
              }}
              setUser={setUser}
            />
          </Route>
        </main>
      )}
      </div>
    
  );
}
export default App;
{/* <Router>
      {token ? (
        //if пользователь админ выводи админку

        // <div>
        //   {user.roleId == 1 ? <div>1</div> : <div>2</div>}
        // </div>
        <>
          {user.roleId == 1 ?
            <>
              <main className='container'>
                <Headers
                  setToken={setToken}
                  user={user}
                  setUser={setUser}
                />
                <div className='content'>
                  <PersonalArea />
                  <div className='routers'>
                    <Route path='/yvedomlenia' component={NotificationsScreen} />
                    <Route path='/ras' component={ScheduleScreen} />
                    <Route path='/fail' component={FileScreen} />
                    <Route path='/zachetka' component={RecordBookScreen} />
                    <Route path='/plan' component={PlanScreen} />
                    <Route path='/admin/Shedule' component={AdminSchedule} />
                    <Route path='/admin/RecordBook' component={AdminRecordBook} />
                  </div>
                </div>
              </main>
              <Footer />
{/* сомнительный тернарник при последнем выкидывает в последнее утверждение до реги ОЧЕНЬ СОМНИТЕЛЬНЫЙ ТЕРАНАРНИК!!!! */}
    //         </> : user.roleId == 2 ? <>2</> : user.roleId == 3 ? <>3</> : user.roleId == 4 ? <>4</> : <div><main className='container'>
    //             <Headers
    //               setToken={setToken}
    //               user={user}
    //               setUser={setUser}
    //             />
    //             <div className='content'>
    //               <PersonalArea />
    //               <div className='routers'>
    //                 <Route path='/yvedomlenia' component={NotificationsScreen} />
    //                 <Route path='/ras' component={ScheduleScreen} />
    //                 <Route path='/fail' component={FileScreen} />
    //                 <Route path='/zachetka' component={RecordBookScreen} />
    //                 <Route path='/plan' component={PlanScreen} />
    //                 <Route path='/admin/Shedule' component={AdminSchedule} />
    //                 <Route path='/admin/RecordBook' component={AdminRecordBook} />
    //               </div>
    //             </div>
    //           </main>
    //           <Footer /></div>}
    //     </>
    //   ) : (
    //     <main className='container'>
    //       <Route path="/">
    //         <Login
    //           setToken={setToken}
    //           setUser={setUser}
    //         />
    //       </Route>
    //     </main>
    //   )
    //   }
    // </Router > */}