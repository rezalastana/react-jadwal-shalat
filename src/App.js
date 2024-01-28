import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [input, setInput] = useState("");
    const [term, setTerm] = useState("Jakarta");
    const [data, setData] = useState([]);

    // deklarasi untuk waktu sholat
    const sholat = ["Imsak", "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

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
        <div className="flex flex-col gap-5 md:h-screen justify-center items-center m-5 rounded-xl font-poppins">
            {/* card */}
            <div className="w-[500px] h-[600px] rounded-2xl p-5 bg-[url('./assets/masjid-2.jpeg')] bg-cover">
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
                            className="w-[250px] py-2 px-4 rounded-full text-[14px] text-slate-600 outline-none focus:shadow-lg"
                            placeholder="Cari lokasi.."
                            value={input}
                        />
                        <input type="submit" value="" />
                    </form>
                    <div className="w-full flex justify-between px-[70px] text-[#e3e6e3] mt-5">
                        <div>
                            <div className="font-bold">
                                {data.date && data.date.gregorian.weekday.en}
                            </div>
                            <div>{data.date && data.date.readable}</div>
                        </div>
                        <div className="font-bold text-xl">{term}</div>
                    </div>
                    {/* HASIL */}
                    <ul className="flex flex-col rounded-3xl w-[300px] bg-[#313131] py-4 mt-14">
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
