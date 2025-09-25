import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import OtherDetails from "./components/OtherDetails";
import useWeather from "./hooks/useWeatherData";
import CurrentWeather from "./components/CurrentWeather";
import ThreeHourForecast from "./components/ThreeHourForecast";
import FiveDayForecast from "./components/FiveDayForecast";
import SunnyBG from "../src/assets/backgrounds/Clear.jpg";
import CloudsBG from "../src/assets/backgrounds/Clouds.jpg";
import ThunderBG from "../src/assets/backgrounds/Thunder.jpeg";
import HazeBG from "../src/assets/backgrounds/Haze.webp";
import RainBG from "../src/assets/backgrounds/Rain.jpeg";
import SmokeBG from "../src/assets/backgrounds/Smoke.jpeg";
import SnowBG from "../src/assets/backgrounds/Snow.webp";
import DefaultBG from "../src/assets/backgrounds/bg.jpg";
import usePreLoadImage from "./hooks/usePreLoadImage";
import { useParams, useNavigate } from "react-router-dom";

const MainComponent = () => {
  //Dynamic Routing
  const navigate = useNavigate(); //in SearchBAr
  const { city: cityParam } = useParams();
  const [city, setCity] = useState(cityParam || "Lahore");

  const { current, currentDay, fiveDay, threeHour, loading, error } =
    useWeather(city);

  const currentWeather = current?.weather[0].main;

  const BgImg = {
    Snow: SnowBG,
    Thunderstorm: ThunderBG,
    Clear: SunnyBG,
    Rain: RainBG,
    Drizzle: RainBG,
    Haze: HazeBG,
    Smoke: SmokeBG,
    Clouds: CloudsBG,
    Mist: HazeBG,
    Fog: HazeBG,
    Dust: HazeBG,
    Sand: HazeBG,
    Ash: HazeBG,
    Squall: ThunderBG,
    Tornado: ThunderBG,
  };

  const BgSrc = current ? BgImg[currentWeather] : DefaultBG;
  const BgLoaded = usePreLoadImage(BgSrc);

  return (
    <div
      className={`min-h-screen bg-no-repeat w-full  bg-center bg-cover flex items-center justify-center p-8`}
      style={{
        backgroundImage: BgLoaded ? `url(${BgSrc})` : `url(${DefaultBG})`,
      }}
    >
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 flex flex-col gap-8 min-h-[60vh] min-w-[80vw] md:min-w-[400px] lg:min-w-[500px]">
        <div className="relative">
          <SearchBar
            onSearch={(newCity) => {
              setCity(newCity);
              navigate(`/weather/${newCity.toLowerCase()}`);
            }}
            weather={currentWeather}
          />
        </div>

        {loading ? (
          <p className="flex justify-center items-center text-white text-xl">
            Loading...
          </p>
        ) : error ? (
          <p className="flex justify-center items-center text-white text-xl">
            {error}
          </p>
        ) : current && currentDay && fiveDay && threeHour ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CurrentWeather current={current} />

            {/* Forecast + Other Details */}
            <div className="flex flex-col gap-6 text-white">
              <ThreeHourForecast threeHour={threeHour} />
              <FiveDayForecast fiveDay={fiveDay} />
              <OtherDetails current={current} currentDay={currentDay} />
            </div>
          </div>
        ) : (
          <p className="flex justify-center items-center text-white text-xl">
            No data available
          </p>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
