/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-before-function-paren */
/* eslint-disable react/react-in-jsx-scope */
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/home";
import DetailSurah from "./Pages/detailSurah";
// import {} from '@fontaweseo'

function App() {
  // const [count, setCount] = useState(0);
  const [surat, setSurat] = useState([]);

  const getApi = useCallback(async () => {
    const response = await axios.get("https://equran.id/api/v2/surat");
    const data = response.data.data;
    setSurat(data);
    console.log(response.data.data);
  }, []);

  useEffect(() => {
    getApi();
  }, []);

  const onCheck = async (id) => {
    const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);
    console.log(response.data.data);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/surah/:id" element={<DetailSurah />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
