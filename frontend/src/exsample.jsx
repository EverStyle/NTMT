
// пометки че нада пофиксить, заебался забывать
// замени дайт пикер для телфонов на спец !!!!!!!!НЕВОЗМОЖНО!!!!!!!!!!!1
// переделай учебный план для препода, убери смысловой блок и замни выборку в общий селект
// обновление зачетки сделай через 3 грид фрейм
//
//
//

const [token, setToken] = useState('');
useEffect(() => {
  setToken(localStorage.getItem('token') || '');
  if (token) {
    localStorage.setItem('token', token || '');
  }
}, [token]);



{/* <Router>
      {token ? (
        <>
          {(() => {
            let json43 = parseJwt(token);
            console.log(json43)
            switch (parseInt(json43.roleId)) {
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
                      </div>
                    </div>
                  </main>
                  <Footer />
                </>
              default:
                return <div>Default Screen</div>
            }
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
    </Router> */}

