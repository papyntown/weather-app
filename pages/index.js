import Card from "@/components/Card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const index = () => {
    const [inputValue, setInputValue] = useState("Perpignan");
    const [weatherData, setWeatherData] = useState();

    async function getData() {
        console.log(inputValue);
        await axios
            .get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=812a258460a7833e26564ccf4c70473b&units=metric`
            )
            .then((response) => {
                setWeatherData(response.data);
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
        <div className="mx-32 text-center rounded-lg border-double border-2 border-indigo-600">
            <header></header>
            <div className="city-input">
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                        getData();
                    }}>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder={"Ex : Perpignan"}
                            id="search"
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                        />
                        <input type="submit" value="Rechercher" id="submit" />
                    </div>
                </form>
            </div>
            <h1>{weatherData ? weatherData.city.name : "pas de data"}</h1>
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
