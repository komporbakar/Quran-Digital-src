import {
  faAnchorCircleCheck,
  faBookQuran,
  faHome,
  faPlay,
  faSearch,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailSurah() {
  const [ayat, setAyat] = useState([]);
  const [audio, setAudio] = useState("");
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [nama, setNama] = useState("");
  const [namaLatin, setNamaLatin] = useState("");
  const [nomor, setNomor] = useState("");
  const { id } = useParams();
  const getDataAyat = useCallback(async () => {
    if (id > 0 && id <= 114) {
      const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);
      const data = response.data.data;
      setAyat(data.ayat);
      setAudio(data.audioFull["01"]);
      setNext(data.suratSelanjutnya.nomor);
      setPrev(data.suratSebelumnya.nomor);
      setDeskripsi(data.deskripsi);
      setNama(data.nama);
      setNamaLatin(data.namaLatin);
      setNomor(data.nomor);
    } else {
      window.location.replace("/");
    }
  }, []);
  console.log(audio);
  useEffect(() => {
    getDataAyat();
  }, []);

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
              <audio src={audio}></audio>
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button className="p-2 border-emerald-500 bg-emerald-400 rounded-md shadow-md">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="card shadow-md bg-slate-500 text-white rounded-lg py-2 px-5 hover:bg-slate-300 hover:text-gray-900">
          <div className="flex mb-2">
            <h1 className="text-2xl">
              {nomor}. {namaLatin}
            </h1>
            <h3 className="text-4xl ms-auto">{nama}</h3>
          </div>
          <audio src={audio} controls className="mx-auto"></audio>
          {/* <div className="text-md">{deskripsi}</div> */}
        </div>
        <div className="grid md:grid-cols-1 md:gap-2 mt-5 ">
          {ayat &&
            ayat.map((item) => {
              return (
                <div
                  key={item.nomor}
                  className="card shadow-lg rounded-lg bg-slate-200 hover:bg-green-100 mb-2 p-4 "
                  //   onClick={() => onCheck(item.nomor)}
                >
                  <div className="flex">
                    <h6 className="text-left me-5">{item.nomorAyat}</h6>
                    <h3 className="text-right text-3xl mb-2 ms-auto">
                      {item.teksArab}
                    </h3>
                  </div>
                  <h6 className="text-left text-sm mb-1">{item.teksLatin}</h6>
                  <hr className="border-slate-400" />
                  <p className="font-semibold text-slate-900 text-sm">
                    Terjemahan :
                  </p>
                  <h6 className="text-left text-sm">{item.teksIndonesia}</h6>
                </div>
              );
            })}
        </div>
        <div className="md:w-1/3 w-1/2 rounded-xl  fixed bottom-0 md:left-1/3 left-1/4 shadow-lg bg-gray-100 mb-2 p-2  text-green-700 grid grid-cols-3 gap-4">
          <div className="bg-green-400 mx-auto rounded-full shadow-md p-2">
            <a href="/" className="">
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
  );
}
