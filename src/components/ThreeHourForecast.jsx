import React from "react";
import clouds from "../assets/weather/clouds.svg";
import sunny from "../assets/weather/clear.svg";
import thunder from "../assets/weather/thunderstorm.svg";
import snow from "../assets/weather/snow.svg";
import rain from "../assets/weather/rain.svg";
import haze from "../assets/weather/atmosphere.svg";
import smoke from "../assets/weather/smoke.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

const weatherIcons = {
  Snow: snow,
  Thunderstorm: thunder,
  Clear: sunny,
  Rain: rain,
  Drizzle: rain,
  Haze: haze,
  Smoke: smoke,
  Clouds: clouds,
  Mist: haze,
  Fog: haze,
  Dust: haze,
  Sand: haze,
  Ash: haze,
  Squall: thunder,
  Tornado: thunder,
};

const ThreeHourForecast = ({ threeHour }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-3">3-Hour Forecast</h3>

      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        modules={[Scrollbar, Mousewheel]}
        scrollbar={{
          el: ".my-custom-scrollbar",
          draggable: true,
        }}
        mousewheel={true}
        className="pb-4"
      >
        {threeHour && threeHour.length > 0 ? (
          threeHour.map((item, index) => (
            <SwiperSlide key={index} style={{ width: "90px" }}>
              <div className="flex flex-col items-center cursor-pointer bg-white/10 hover:bg-white/20 transition p-4 rounded-xl">
                <p>{item.hours}</p>
                <img
                  src={weatherIcons[item.weather]}
                  alt={item.weather}
                  className={`w-8 my-2 mr-3 ${
                    item.weather === "Smoke" ? "brightness-0 invert" : ""
                  }`}
                />
                <p className="font-bold">{item.temp}°C</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>Not Found</p>
        )}
      </Swiper>
      <div className="my-custom-scrollbar h-1 bg-white/20 rounded-full mt-3"></div>
    </div>
  );
};

export default ThreeHourForecast;
