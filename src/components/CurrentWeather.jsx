import React from "react";
import {
  FaTint,
  FaMapMarkerAlt,
  FaWind,
  FaTemperatureHigh,
} from "react-icons/fa";
import { WiSunrise, WiSunset, WiDayFog } from "react-icons/wi";
import clouds from "../assets/weather/clouds.svg";
import sunny from "../assets/weather/clear.svg";
import thunder from "../assets/weather/thunderstorm.svg";
import snow from "../assets/weather/snow.svg";
import rain from "../assets/weather/rain.svg";
import smoke from "../assets/weather/smoke.png";
import haze from "../assets/weather/atmosphere.svg";

const countries = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AR: "Argentina",
  AM: "Armenia",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BR: "Brazil",
  BN: "Brunei",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  EE: "Estonia",
  ET: "Ethiopia",
  FI: "Finland",
  FR: "France",
  DE: "Germany",
  GH: "Ghana",
  GR: "Greece",
  GL: "Greenland",
  GT: "Guatemala",
  HT: "Haiti",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran",
  IQ: "Iraq",
  IE: "Ireland",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KR: "South Korea",
  KW: "Kuwait",
  LB: "Lebanon",
  LY: "Libya",
  LT: "Lithuania",
  LU: "Luxembourg",
  MG: "Madagascar",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MX: "Mexico",
  MD: "Moldova",
  MN: "Mongolia",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NP: "Nepal",
  NL: "Netherlands",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NG: "Nigeria",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PA: "Panama",
  PE: "Peru",
  PH: "Philippines",
  PL: "Poland",
  PT: "Portugal",
  QA: "Qatar",
  RO: "Romania",
  RU: "Russia",
  SA: "Saudi Arabia",
  RS: "Serbia",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SO: "Somalia",
  ZA: "South Africa",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syria",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TH: "Thailand",
  TR: "Turkey",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VE: "Venezuela",
  VN: "Vietnam",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

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

const CurrentWeather = ({ current }) => {
  // extracting values
  const temp = Math.round(current.main.temp);
  const feelsLike = Math.round(current.main.feels_like);
  const humidity = current.main.humidity;
  const wind = current.wind.speed;
  const visibility = (current.visibility / 1000).toFixed(1); // in km
  const weather = current.weather[0].main;

  // location
  const cityName = current.name;
  const countryCode = current.sys.country;
  const country = countries[countryCode] || "Not Found";

  // date
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const date = now.getDate();
  const month = now.toLocaleDateString("en-US", { month: "short" });

  // sunrise & sunset
  const sunrise = new Date(current.sys.sunrise * 1000);
  const sunset = new Date(current.sys.sunset * 1000);

  const sunriseHours = sunrise.getHours() % 12 || 12;
  const sunriseMinutes = sunrise.getMinutes().toString().padStart(2, "0");
  const sunriseAmPm = sunrise.getHours() >= 12 ? "PM" : "AM";

  const sunsetHours = sunset.getHours() % 12 || 12;
  const sunsetMinutes = sunset.getMinutes().toString().padStart(2, "0");
  const sunsetAmPm = sunset.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="md:col-span-2 flex flex-col justify-center items-center text-white p-6 rounded-3xl bg-white/10 hover:bg-white/20 transition">
      <h2 className="text-6xl font-bold">{temp}°C</h2>
      <p className="text-2xl mt-2">{weather}</p>
      <img
        src={weatherIcons[weather]}
        alt="weather"
        className={`w-20 mr-3 ${
          weather === "Smoke" ? "brightness-0 invert" : ""
        }`}
      />
      <p className="text-lg flex mt-2">
        <FaMapMarkerAlt className="mt-1 text-md mr-2" /> {cityName}, {country}
      </p>
      <p className="text-sm opacity-70">
        {day}, {date} {month}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 text-center text-sm md:text-base">
        <div className="bg-white/10 p-3 rounded-xl">
          <FaTint className="text-gray-200 text-2xl ml-5 flex flex-col mb-2" />
          <span className="font-semibold">Humidity</span>
          <br />
          {humidity} %
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <FaWind className="text-gray-200 text-2xl ml-5 flex flex-col mb-2" />
          <span className="font-semibold">Wind</span>
          <br />
          {wind} m/s
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <FaTemperatureHigh className="text-red-400 text-2xl ml-6 flex flex-col mb-2" />
          <span className="font-semibold">Feels Like</span>
          <br />
          {feelsLike}°C
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <WiSunrise className="text-yellow-500 text-3xl ml-4 flex flex-col" />
          <span className="font-semibold">Sunrise</span>
          <br />
          {sunriseHours}:{sunriseMinutes} {sunriseAmPm}
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <WiSunset className="text-orange-400 text-3xl ml-4 flex flex-col" />
          <span className="font-semibold">Sunset</span>
          <br />
          {sunsetHours}:{sunsetMinutes} {sunsetAmPm}
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <WiDayFog className="text-gray-300 text-3xl  ml-4 flex flex-col" />
          <span className="font-semibold">Visibility</span>
          <br />
          {visibility} km
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
