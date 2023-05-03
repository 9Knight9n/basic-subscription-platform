import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// views
import Login from "./pages/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<p>Home</p>}/>
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
