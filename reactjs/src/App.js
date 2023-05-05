import { BrowserRouter,Routes, Route } from "react-router-dom";
import { notification, Button } from 'antd';
import {useState,useEffect} from 'react'

// css
import './App.css';

// views
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RequireAuth from './components/RequireAuth'
import Home from "./pages/home/Home";



function App() {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [credit, setCredit] = useState(0);
  const [api, contextHolder] = notification.useNotification();

    // useEffect(() => {
    // }, []);

  return (
    <BrowserRouter>
      {contextHolder}
        {token?<div style={{position:'absolute',bottom:'0', margin:'5px'}}><Button danger type="primary" onClick={() => {setToken(null)}}>
            Log out
        </Button></div>:""}
      <div className={'center'}>
          <Routes>
              <Route index element={
                  <RequireAuth token={token}>
                      <Home token={token} id={id} username={username} credit={credit}/>
                  </RequireAuth>
              }/>
              {/*<Route path="/" element={<p>Home</p>}/>*/}
              <Route path="/login" element={<Login
                  setUsername={setUsername} setToken={setToken}
                  setId={setId} setCredit={setCredit}/>}
              />
              <Route path="/register" element={<Register notif={api} setToken={setToken}/>}/>
              {/*<Route path="extract" element={<ExtractPage />} >*/}
              {/*    <Route index element={<Navigate to="selectcollection" replace />} />*/}
              {/*    <Route path={'selectcollection'} element={<SelectCollection/>} />*/}
              {/*    <Route path={'selectuser/:collection'} element={<SelectUser/>} />*/}
              {/*    <Route path={'extractprogress/:collection'} element={<ExtractProgress/>} />*/}
              {/*    <Route path="*" element={<Navigate to="selectcollection" replace />} />*/}
              {/*</Route>*/}
              {/*<Route path="result" element={<ResultPage />} >*/}
              {/*    <Route path={"useranalysis/:collection"} element={<UserAnalysis/>} />*/}
              {/*    <Route path={"collectionanalysis/:collection"} element={<CollectionAnalysis/>} />*/}
              {/*</Route>*/}
              {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
