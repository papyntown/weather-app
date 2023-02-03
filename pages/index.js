import Card from "@/components/Card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const index = () => {
    const [inputValue, setInputValue] = useState("Perpignan");
    const [latitude, setLatitudeValue] = useState();
    const [longitude, setLongitudeValue] = useState();
    const [inputValuenow, setInputValuenow] = useState("");
    const [weatherData, setWeatherData] = useState();

    const gps = async () => {
        console.log("T'es passez dedans");
        await axios
            .get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=812a258460a7833e26564ccf4c70473b`
            )
            .then((res) => {
                setLatitudeValue(parseFloat(res.data[0].lat.toFixed(2)));
                setLongitudeValue(parseFloat(res.data[0].lon.toFixed(2)));

                axios
                    .get(
                        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=812a258460a7833e26564ccf4c70473b&units=metric`
                    )
                    .then((res) => {
                        setWeatherData(res.data);
                        console.log(latitude);
                    });
            });
    };
    useEffect(() => {
        gps();
    }, []);
    return (
        <div className="mx-32 text-center rounded-lg border-double border-2 border-indigo-600">
            <header>{`Voici ta longitude : ${longitude} et ta latitude: ${latitude}`}</header>
            <div className="city-input">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setInputValue(inputValuenow);
                        gps();
                    }}>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder={"Ex : Perpignan"}
                            id="search"
                            onChange={(e) => {
                                setInputValuenow(e.target.value);
                            }}
                        />
                        <input type="submit" value="Rechercher" id="submit" />
                    </div>
                </form>
            </div>
            <h1>{weatherData ? weatherData.name : "pas de data"}</h1>
            <Card />
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
