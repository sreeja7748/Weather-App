import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/images/search.png'
import heavysnow_icon from '../assets/images/heavysnow-removebg-preview.png'
import heavywind_icon from '../assets/images/heavywind-removebg-preview.png'
import partialcloud_icon from '../assets/images/partialcloud-removebg-preview.png'
import rainy_icon from '../assets/images/rainy-removebg-preview.png'
import snowy_icon from '../assets/images/snowy-removebg-preview.png'
import sunny_icon from '../assets/images/sunny-removebg-preview.png'
import windy_icon from '../assets/images/windy-removebg-preview.png'

const Weather = () => {

    const [weatherData, setweatherData] = useState(false);
    const [city, setCity] = useState("");

    const allIcons = {
        "01d": sunny_icon,
        "01n": sunny_icon,
        "02d": partialcloud_icon,
        "02n": partialcloud_icon,
        "03d": partialcloud_icon,
        "03n": partialcloud_icon,
        "04d": snowy_icon,
        "04n": snowy_icon,
        "09d": rainy_icon,
        "10d": rainy_icon,
        "10n": rainy_icon,
        "13d": heavysnow_icon,
        "13n": heavysnow_icon,
    }

    const search = async (city)=>{
        if(city === ""){
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            console.log(data); 
            const icon = allIcons[data.weather[0].icon] || sunny_icon;
            setweatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            setweatherData(false);
            console.error("Error in fetching weather data");
        }
    }

    useEffect(()=>{
        search("new york");
    },[])
  return (
    <div className='weather'>
        <div className="search-bar">
            <input
                type="text"
                placeholder='Search'
                value={city}
                onChange={e => setCity(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") search(city);
                }}
            />
            <img
                src={search_icon}
                alt="searchIcon"
                style={{cursor: "pointer"}}
                onClick={() => search(city)}
            />
        </div>
        {weatherData?<>
         <img src={weatherData.icon || sunny_icon} alt="weatherIcon" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature ? weatherData.temperature + "°c" : "--"}</p>
        <p className='location'>{weatherData.location || "--"}</p>
        <div className="weather-data">
            <div className="col">
                <img src={windy_icon} alt="humidity" />
                <div>
                    <p>{weatherData.humidity || "--"}</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={heavywind_icon} alt="windSpeed" />
                <div>
                    <p>{weatherData.windSpeed || "--"}</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
    </div>
  )
}

export default Weather
