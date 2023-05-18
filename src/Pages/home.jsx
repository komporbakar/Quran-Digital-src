import React, { Component } from "react";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnchorCircleCheck,
  faBookQuran,
  faHome,
  faSearch,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useRoutes } from "react-router-dom";

export default function Home() {
  const [surat, setSurat] = useState([]);

  const getApi = useCallback(async () => {
    const response = await axios.get("https://equran.id/api/v2/surat");
    const data = response.data.data;
    setSurat(data);
  }, []);

  useEffect(() => {
    getApi();
  }, []);

  const onCheck = async (id) => {
    const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);
    console.log(response.data.data);
    window.location.replace(`/surah/${id}`);
  };

  return (
    <div className="bg-slate-600">
      <div className="container md:mx-auto px-5  md:w-auto ">
        <div className="flex">
          <Link to={"/"}>
            <h1 className="text-3xl text-emerald-500  text-left font-bold  mt-2">
              Al-Quran Digital
            </h1>
          </Link>
        </div>
        <div className=" border-spacing-6 flex p-2 mt-2">
          <div className="ms-auto">
            <button className=" p-2 border-emerald-500 bg-emerald-400 rounded-md shadow-md me-2">
              <FontAwesomeIcon icon={faAnchorCircleCheck} />
            </button>
            <button className="p-2 border-emerald-500 bg-emerald-400 rounded-md shadow-md">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-4 md:gap-2 mt-5 ">
          {surat &&
            surat.map((surah) => {
              return (
                <div
                  key={surah.nomor}
                  className="card shadow-lg rounded-lg bg-green-300 hover:bg-green-400 mb-2 p-4 cursor-pointer"
                  onClick={() => onCheck(surah.nomor)}
                >
                  <h6 className="text-left">
                    {surah.nomor}. {surah.namaLatin}
                  </h6>
                  <h3 className="text-right text-4xl">{surah.nama}</h3>
                  <h6 className="text-right text-sm">
                    {surah.tempatTurun} - {surah.arti}
                  </h6>
                </div>
              );
            })}
        </div>
        <div className="">
          <div className="md:w-1/3 w-1/2 rounded-xl  fixed bottom-0 md:left-1/3 left-1/4 shadow-lg bg-gray-100 mb-2 p-2  text-green-700 grid grid-cols-3 gap-4">
            <div className="bg-green-400 mx-auto rounded-full shadow-md p-2">
              <a href="#" className="">
                <FontAwesomeIcon icon={faHome} />
              </a>
            </div>
            <div className=" mx-auto rounded-full p-2">
              <a href="#" className="">
                <FontAwesomeIcon icon={faBookQuran} />
              </a>
            </div>
            <div className="mx-auto rounded-lg p-2">
              <a href="#" className="">
                <FontAwesomeIcon icon={faUserAlt} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
