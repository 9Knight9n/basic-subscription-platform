import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import { notification } from 'antd';
import {useState,useEffect} from 'react'

// css
import './App.css';

// views
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RequireAuth from './components/RequireAuth'
import Home from "./pages/Home";



function App() {
  const [token, setToken] = useState(null);
  const [api, contextHolder] = notification.useNotification();

    // useEffect(() => {
    // }, []);

  return (
    <BrowserRouter>
      {contextHolder}
      <div className={'center'}>
          <Routes>
              <Route index element={
                  <RequireAuth token={token}>
                    <Home token={token}/>
                      {/*// <p>Home</p>*/}
                  </RequireAuth>
              }/>
              {/*<Route path="/" element={<p>Home</p>}/>*/}
              <Route path="/login" element={<Login token={token} setToken={setToken}/>}/>
              <Route path="/register" element={<Register notif={api} token={token} setToken={setToken}/>}/>
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
