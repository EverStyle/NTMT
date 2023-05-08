import { BrowserRouter as Router, Route } from "react-router-dom";
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

import { useState, useEffect } from "react";
import Login from "./screens/Login/Login";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  
  useEffect(() => {
    setToken(localStorage.getItem('token') || '');
    if (token) {
      localStorage.setItem('token', token || '');
    }
  }, [token]);

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

// console.log(parseJwt(token))

  return (
    <Router>

      {token ? (

        //if пользователь админ выводи админку
        // {user.roleId === 1 ? <div></div>}
        <>
          {(() => {
            let json43 = parseJwt(token);
            //распаристь двт там строка а не число
            console.log(json43)
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
                      <PersonalArea role = {json43.roleId} />
                      <div className='routers'>
                        <Route path='/adminyvedomlenia' component={AdminNotification} />
                        <Route path='/adminras' component={AdminSchedule} />
                        <Route path='/adminfail' component={AdminFileScreen} />
                        <Route path='/adminzachetka' component={AdminRecordBook} />
                        <Route path='/adminplan' component={AdminPlanScreen} />
                        <Route path='/adminShedule' component={AdminSchedule} />
                        <Route path='/adminRecordBook' component={AdminRecordBook} />
                      </div>
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
                    <PersonalArea />
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
                    <PersonalArea />
                    <div className='routers'>
                      <Route path='/teacheryvedomlenia' component={NotificationsScreen} />
                      <Route path='/teacherras' component={ScheduleScreen} />
                      <Route path='/teacherfail' component={FileScreen} />
                      <Route path='/teacherzachetka' component={RecordBookScreen} />
                      <Route path='/teacherplan' component={PlanScreen} />
                    </div>
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
                    <PersonalArea />
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
              setToken={setToken}
              setUser={setUser}
            />
          </Route>
        </main>
      )}
    </Router>
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