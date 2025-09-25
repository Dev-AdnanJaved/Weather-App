import React from "react";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiSunrise, WiSunset } from "react-icons/wi";

const OtherDetails = ({ current, currentDay }) => {
  // Max/Min
  const { max_temp, min_temp } = currentDay;

  // Sunrise & Sunset
  const sunrise = new Date(current.sys.sunrise * 1000);
  const sunset = new Date(current.sys.sunset * 1000);

  const sunriseHours = sunrise.getHours() % 12 || 12;
  const sunriseMinutes = sunrise.getMinutes().toString().padStart(2, "0");
  const sunriseAmPm = sunrise.getHours() >= 12 ? "PM" : "AM";

  const sunsetHours = sunset.getHours() % 12 || 12;
  const sunsetMinutes = sunset.getMinutes().toString().padStart(2, "0");
  const sunsetAmPm = sunset.getHours() >= 12 ? "PM" : "AM";

  return (
    <>
      <h3 className="text-2xl font-semibold mb-3 mt-4 text-white">
        Other Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        {/* Max / Min */}
        <div className="bg-white/10 p-3 rounded-2xl text-center flex flex-col justify-center items-center">
          <FaTemperatureHigh className="text-red-400 text-2xl mb-2" />
          <h4 className="font-semibold mt-1">Max / Min</h4>
          <p className="mt-1">
            {max_temp}°C / {min_temp}°C
          </p>
        </div>

        {/* Sunrise & Sunset */}
        <div className="bg-white/10 p-4 rounded-2xl text-center flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <WiSunrise className="text-yellow-400 text-2xl mb-2" />
            <WiSunset className="text-orange-400 text-2xl ml-3 mb-2" />
          </div>
          <h4 className="font-semibold mt-1">Sunrise & Sunset</h4>
          <p className="mt-1">
            {sunriseHours}:{sunriseMinutes} {sunriseAmPm} / {sunsetHours}:
            {sunsetMinutes} {sunsetAmPm}
          </p>
        </div>
      </div>
    </>
  );
};

export default OtherDetails;
