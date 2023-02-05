import Background from "@/components/Background";
import Card from "@/components/Card";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const index = () => {
    const [inputValue, setInputValue] = useState("Perpignan");
    const [weatherData, setWeatherData] = useState();
    const [weatherDataList, setWeatherDataList] = useState();

    async function getData() {
        console.log(inputValue);
        await axios
            .get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=812a258460a7833e26564ccf4c70473b&units=metric`
            )
            .then((response) => {
                setWeatherData(response.data);
                setWeatherDataList(response.data.list);
                console.log(response.data);
            });
    }

    useEffect(() => {
        getData();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault(e);
    };
    return (
        <div className=" ">
            <Background />
            <div className="mx-auto w-4/5 pt-6">
                <form
                    className=" mb-5  flex justify-center align-center lg:justify-between  "
                    onSubmit={(e) => {
                        handleSubmit(e);
                        getData();
                    }}>
                    <div className="search-container">
                        <input
                            className=" bg-white focus:outline-none focus:shadow-outline border  border-gray-300 rounded-t-lg py-2 px-4 block w-full text-black appearance-none leading-normal"
                            type="text"
                            placeholder={"Ex : Perpignan"}
                            id="search"
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                        />
                        <input
                            type="submit"
                            value="Rechercher"
                            id="submit"
                            className="cursor-pointer font-bold py-2 px-4 w-full bg-slate-300 text-black opacity-75 rounded-b-lg hover:bg-slate-700 hover:text-white"
                        />
                    </div>
                    <div className="img hidden lg:block ">
                        <Image
                            src={"/weather-icon.png"}
                            width={100}
                            height={100}
                            alt={"API-icon"}
                        />
                    </div>
                </form>
                <div className="">
                    <h1>
                        {weatherData ? weatherData.city.name : "pas de data"}
                    </h1>
                    <Card />
                </div>
            </div>
        </div>
    );
};

export default index;
// export const getStaticProps = async () => {
//     const res = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=Perpignan&limit=5&appid=812a258460a7833e26564ccf4c70473b`
//     );
//     const position = await res.json();
//     /// Les logs tu peux les voir sur ton terminal
//     //  console.log(articles);
//     return {
//         props: {
//             position: position[0],
//         },
//     };
// };
