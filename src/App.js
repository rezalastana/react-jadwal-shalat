import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [input, setInput] = useState("");
    const [term, setTerm] = useState("Yogyakarta");
    const [data, setData] = useState([]);

    // deklarasi untuk waktu sholat
    const sholat = ["Imsak", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    // ubah hari english menjadi bahasa indonesia
    const hariIndo = {
        Monday: "Senin",
        Tuesday: "Selasa",
        Wednesday: "Rabu",
        Thursday: "Kamis",
        Friday: "Jumat",
        Saturday: "Sabtu",
        Sunday: "Minggu",
    };

    // ubah nama waktu sholat menjadi bahasa indonesia
    const sholatIndo = {
        Imsak: "Imsak",
        Fajr: "Subuh",
        Dhuhr: "Dzuhur",
        Asr: "Ashar",
        Maghrib: "Maghrib",
        Isha: "Isya",
    };

    useEffect(() => {
        fetch(`http://api.aladhan.com/v1/timingsByAddress?address=${term}`)
            // lalu jadikan data yang didapat dari API menjadi response json
            .then((res) => res.json())
            .then((res) => setData(res.data));
    }, [term]);
    return (
        <div className="flex flex-col gap-5 justify-center items-center rounded-xl font-poppins  md:h-screen mt-5">
            {/* card */}
            {/* bg-[url('./assets/masjid-2.jpeg')] */}
            <div className="w-[470px] h-[580px] rounded-2xl p-5 bg-[url('./assets/masjid-2.jpeg')] bg-cover m-5 rounded-lg w-full">
                <div className="flex flex-col w-full  items-center gap-3">
                    {/* FORM SEARCH */}
                    {/* ketika input di klik/cari panggil onSubmit */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // set term menjadi input
                            setTerm(input);
                            // kembalikan input ke default
                            setInput("");
                        }}
                    >
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            // onChange={handleInput}
                            type="text"
                            className="w-[300px] mt-3 py-3 px-4 rounded-full text-[14px] text-slate-600 outline-none focus:shadow-lg"
                            placeholder="Cari lokasi.."
                            value={input}
                        />
                        <input type="submit" value="" />
                    </form>
                    <div className="w-full flex justify-between px-[70px] text-[#e3e6e3] mt-5">
                        <div>
                            {/* use namaIndo untuk menampilkan hari */}
                            <div>
                                {data.date && (
                                    <div className="font-bold text-lg">
                                        {
                                            hariIndo[
                                                data.date.gregorian.weekday.en
                                            ]
                                        }
                                    </div>
                                )}
                            </div>
                            <div>{data.date && data.date.readable}</div>
                        </div>
                        <div className="font-bold text-lg">{term}</div>
                    </div>
                    {/* HASIL */}
                    <ul className="flex flex-col rounded-3xl w-[300px] bg-[#3b3b3b] py-4 px-3 mt-14">
                        {/* pada tailwindcss bisa menggunakan odd jika li dalam keadaan ganjil */}
                        {/* melakukan perulangan */}
                        {data &&
                            // p adalah isi dari array sholat
                            sholat.map((p) => {
                                const mappedPrayeName = sholatIndo[p];

                                return (
                                    <li className="odd:text-[#26a767] even:text-[#dbdbd9] flex justify-between p-3">
                                        {/* nama waktu shalat */}
                                        <div>{mappedPrayeName}</div>
                                        <div className="font-bold">
                                            {data.timings &&
                                                data.timings[`${p}`]}
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
            <p className="text-black text-center text-sm">
                * Data bersumber dari {data.meta && data.meta.method.name}
            </p>
        </div>
    );
}

export default App;
