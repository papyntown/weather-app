import Image from "next/image";
import React from "react";

const Card = ({ meteo }) => {
    const timestamp = meteo.dt;
    const date = new Date(timestamp * 1000);
    const daysOfWeek = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
    ];
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return (
        <div className=" bg-inherit shadow-2xl rounded-xl border border-red-200 ">
            <div className="top-card flex justify-between items-center ">
                <div className="img">
                    {
                        <Image
                            src={`http://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
                            alt={meteo.weather[0].description}
                            width={100}
                            height={100}
                            className="rounded-t-lg"
                        />
                    }
                </div>
                <div className="temp pr-5 text-6xl">
                    <h2>{Math.floor(meteo.main.temp) + "   °C"}</h2>
                </div>
            </div>
            <div className="weather-description  w-4/5 mx-auto">
                <h3>
                    {meteo.weather[0].description.charAt(0).toUpperCase() +
                        meteo.weather[0].description.slice(1)}
                </h3>
            </div>
            <div className="value w-4/5 mx-auto pt-4 pb-4 flex justify-between items-center ">
                <div className="date max-w-20 ">
                    <h4>{`${dayOfWeek} à ${hours < 10 ? "0" + hours : hours}H${
                        minutes < 10 ? "0" + minutes : minutes
                    }`}</h4>
                </div>
                {/* Barre entre la date et détail */}
                {/* <div className="relative">
                    <div className="  h-14"></div>
                    <div className="absolute inset-0 bg-slate-400 h-15  w-px left-5"></div>
                </div> */}

                <div className="detail">
                    <ul>
                        <li className=" text-xs font-light">
                            Temp ressentit : {Math.floor(meteo.main.feels_like)}
                            °C
                        </li>
                        <li className="text-xs font-light">
                            Humidité : {meteo.main.humidity}%
                        </li>
                        <li className="text-xs font-light">
                            Vent : {meteo.wind.speed} km/h
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Card;
