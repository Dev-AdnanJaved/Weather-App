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
const FiveDayForecast = ({ fiveDay }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-3">5-Day Forecast</h3>
      {/* <div className="flex gap-4 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"> */}
      {/* Loop */}

      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        modules={[Scrollbar, Mousewheel]}
        scrollbar={{
          el: ".my-custom-scrollbar2",
          draggable: true,
        }}
        mousewheel={true}
        className="pb-4"
      >
        {fiveDay && fiveDay.length > 0 ? (
          fiveDay.map((item, index) => {
            return (
              <SwiperSlide key={index} style={{ width: "90px" }}>
                <div className="flex flex-col items-center bg-white/10 cursor-pointer hover:bg-white/20 transition p-4 rounded-xl min-w-[90px]">
                  <p>
                    {item.date} {item.monthName}{" "}
                  </p>
                  <img
                    src={
                      item.weather == "Clouds"
                        ? clouds
                        : item.weather == "Thunderstorm"
                        ? thunder
                        : item.weather == "Clear"
                        ? sunny
                        : item.weather == "Rain"
                        ? rain
                        : item.weather == "Haze"
                        ? haze
                        : item.weather == "Smoke"
                        ? smoke
                        : snow
                    }
                    alt={item.weather}
                    className={` w-8 my-2 mr-3 ${
                      item.weather === "Smoke" ? "brightness-0 invert" : ""
                    }`}
                  />
                  <p className="font-bold">{item.temp}°C</p>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <p>Not Found</p>
        )}{" "}
      </Swiper>
      <div className="my-custom-scrollbar2 h-1 bg-white/20 rounded-full mt-3"></div>
    </div>
    // </div>
  );
};

export default FiveDayForecast;
