import { useState, useEffect } from "react";

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

const useWeatherApi = (city) => {
  const [cityWeather, setCityWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCityWeather(null);
    setError(null);
    const fetchWeatherData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53e2b6c89d2766767033e7d291f427d8&units=metric`
      );

      if (!res.ok) {
        setError("Not Found");
        setCityWeather(null);
        return;
      }

      const cityWeather = await res.json();

      //Converting to Varibales from Data
      const countryCode = cityWeather?.sys.country;
      const countryName = countries[countryCode] || "Not Found";
      const cityName = cityWeather?.name;
      const weather = cityWeather?.weather[0].main;
      const temp = Math.floor(cityWeather?.main.temp);
      const humidity = cityWeather?.main.humidity;
      const windSpeed = cityWeather?.wind.speed;
      const feelsLike = Math.floor(cityWeather?.main.feels_like);
      const visibility = cityWeather?.visibility / 1000;

      //Date And Day Process
      const dt = cityWeather?.dt;
      const timezone = cityWeather?.timezone;
      const dateAndTime = new Date((dt + timezone) * 1000);

      // Day
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day = days[dateAndTime.getUTCDay()];

      // Date
      const date = dateAndTime.getUTCDate();

      // Month
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthName = months[dateAndTime.getUTCMonth()];

      //SunSet and SunRise
      const sunriseDT = cityWeather?.sys.sunrise;
      const sunsetDT = cityWeather?.sys.sunset;

      // Sunrise
      const Rise = new Date((sunriseDT + timezone) * 1000);
      let sunriseHours = Rise.getUTCHours();
      let sunriseMinutes = Rise.getUTCMinutes().toString().padStart(2, "0");
      const sunriseAmPm = sunriseHours >= 12 ? "PM" : "AM";
      sunriseHours = sunriseHours % 12 || 12; // convert 0 → 12

      // Sunset
      const Set = new Date((sunsetDT + timezone) * 1000);
      let sunsetHours = Set.getUTCHours();
      let sunsetMinutes = Set.getUTCMinutes().toString().padStart(2, "0");
      const sunsetAmPm = sunsetHours >= 12 ? "PM" : "AM";
      sunsetHours = sunsetHours % 12 || 12;

      setCityWeather({
        cityName,
        countryName,
        day,
        date,
        monthName,
        weather,
        humidity,
        temp,
        windSpeed,
        feelsLike,
        sunriseHours,
        sunriseMinutes,
        sunsetHours,
        sunsetMinutes,
        sunsetAmPm,
        sunriseAmPm,
        visibility,
      });
    };

    fetchWeatherData();
  }, [city]);

  return { cityWeather, error };
};

export default useWeatherApi;
