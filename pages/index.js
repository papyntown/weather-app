import Background from "@/components/Background";
import Card from "@/components/Card";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const index = ({ clientweatherDataList, clientweatherData }) => {
    const [inputValue, setInputValue] = useState("Perpignan");
    const [weatherData, setWeatherData] = useState();
    const [weatherDataList, setWeatherDataList] = useState();
    const [language, setLanguage] = useState("fr");

    async function getData() {
        await axios
            .get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=812a258460a7833e26564ccf4c70473b&units=metric&lang=${language}`
            )
            .then((response) => {
                setWeatherData(response.data);
                setWeatherDataList(response.data.list);
                console.log(response.data);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault(e);
    };
    console.log(clientweatherData);
    return (
        <div className=" ">
            <Background />
            <div className=" pt-6">
                <form
                    className="mx-auto w-4/5 mb-5  flex items-center justify-center align-center lg:justify-between  "
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
                <h1 className="city text-center  mx-auto  w-4/6 rounded-lg text-#ff6a46 bg-violet-800 lg:w-2/6">
                    {weatherData && clientweatherData
                        ? weatherData.city.name
                        : clientweatherData.city.name}
                </h1>

                <div className="contain-data mx-auto  w-11/12 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 lg:max-w-8xl   gap-y-10 gap-x-8 px-4 py-8 ">
                    {weatherDataList && clientweatherDataList
                        ? weatherDataList.map((meteo) => {
                              return <Card key={meteo.dt} meteo={meteo} />;
                          })
                        : clientweatherDataList.map((meteo) => {
                              return <Card key={meteo.dt} meteo={meteo} />;
                          })}
                </div>
            </div>
        </div>
    );
};

export default index;
export const getStaticProps = async () => {
    const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=perpignan&appid=812a258460a7833e26564ccf4c70473b&units=metric&lang=fr`
    );

    const clientweatherData = await res.data;
    const clientweatherDataList = await res.data.list;
    /// Les logs tu peux les voir sur ton terminal
    //  console.log(articles);
    return {
        props: {
            clientweatherDataList: clientweatherDataList,
            clientweatherData: clientweatherData,
        },
    };
};
