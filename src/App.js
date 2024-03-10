import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [input, setInput] = useState("");
    const [term, setTerm] = useState("Yogyakarta");
    const [data, setData] = useState([]);
    // time
    const [time, setTime] = useState(new Date());

    // useRef
    const inputRef = useRef(null);

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
        const timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setTime(new Date());
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://api.aladhan.com/v1/timingsByAddress?address=${term}`
                );
                const data = await response.json();
                setData(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [term]);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    return (
        <div className="flex flex-col gap-5 justify-center items-center rounded-xl font-poppins md:h-screen mt-5 ">
            {/* card */}
            {/* bg-[url('./assets/masjid-2.jpeg')] */}
            <div className="w-[370px] md:w-[500px] h-[600px] rounded-2xl p-5 m-5 border-2 border-lime-400 shadow-xl">
                <div className="flex flex-col w-full items-center gap-3">
                    {/* TIME */}
                    <h2 className="mt-4">
                        {/* {time.toLocaleTimeString({ hour12: false })} */}
                        <h2 className="font-bold text-lg">
                            {time.toLocaleTimeString("en-US", {
                                hour12: false,
                            })}
                        </h2>
                    </h2>
                    {/* FORM SEARCH */}
                    {/* ketika input di klik/cari panggil onSubmit */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // set term menjadi input
                            setTerm(input);
                            // kembalikan input ke default
                            setInput("");
                            // Hide the keyboard by focusing on a different element
                            inputRef.current.blur();
                        }}
                    >
                        <input
                            // onChange={(e) => setInput(e.target.value)}
                            onChange={handleInput}
                            type="text"
                            className="w-[300px] border-2 mt-3 py-3 px-4 rounded-full text-[14px] text-slate-600 outline-none focus:shadow-lg border-slate-600"
                            placeholder="Cari lokasi.."
                            value={input}
                        />

                        <input type="submit" value="" />
                    </form>
                    <div className="w-full flex justify-between px-[10px] md:px-[70px] text-[#e3e6e3] mt-5">
                        <div>
                            {/* use namaIndo untuk menampilkan hari */}
                            <div>
                                {data.date && (
                                    <div className="font-bold text-[15px] text-black">
                                        {
                                            hariIndo[
                                                data.date.gregorian.weekday.en
                                            ]
                                        }
                                    </div>
                                )}
                            </div>
                            <div className="text-black text-[14px]">
                                {data.date && data.date.readable}
                            </div>
                        </div>
                        <div className="font-bold text-[17px] text-black mt-2 underline">
                            {term}
                        </div>
                    </div>
                    {/* HASIL */}
                    <ul className="flex flex-col rounded-3xl w-[300px] bg-[#3b3b3b] py-4 px-3 mt-4">
                        {/* pada tailwindcss bisa menggunakan odd jika li dalam keadaan ganjil */}
                        {/* melakukan perulangan */}
                        {data &&
                            // p adalah isi dari array sholat
                            sholat.map((p) => {
                                const mappedPrayeName = sholatIndo[p];

                                return (
                                    // even:text-[#dbdbd9]
                                    <li className="odd:text-[#26a767] even:text-white flex justify-between p-3">
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
                *Data bersumber dari {data.meta && data.meta.method.name}
            </p>
        </div>
    );
}

export default App;
