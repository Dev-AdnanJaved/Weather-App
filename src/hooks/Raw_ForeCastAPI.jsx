import { useState, useEffect } from "react";
import ThreeHourForecast from "../components/ThreeHourForecast";

const ForeCastAPI = (city) => {
  const [ForcastData, setForeCastData] = useState(null);
  useEffect(() => {
    setForeCastData(null);
    const fetchData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=53e2b6c89d2766767033e7d291f427d8&units=metric`
      );
      const data = await res.json();
      const timezone = data.city.timezone;

      // FOR THREE HOURS FORECAST
      const ThreeDayFormattedData = data.list.map((item) => {
        const dt = item.dt;
        const DateAndTime = new Date((dt + timezone) * 1000);

        //Temp
        const temp = Math.floor(item.main.temp);

        //Forecast Weather Detail
        const weather = item.weather[0].main;

        let hours = DateAndTime.getUTCHours();
        let ampm = hours > 12 ? " PM" : " AM";

        const hours12 = hours % 12 === 0 ? 12 : hours % 12;
        hours = hours12 + ampm;

        return { hours, weather, temp };
      });

      //For FIVE DAY FORECAST
      const daily = data.list.filter((item) =>
        item.dt_txt.includes("00:00:00")
      );

      //Loop to get 5 day forcast data
      const FiveDayFormattedData = daily.map((item) => {
        const dt = item.dt;
        const DateAndTime = new Date((dt + timezone) * 1000);

        //Forecast Weather Detail
        const weather = item.weather[0].main;

        //Date
        const date = DateAndTime.getDate();

        //Month
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
        const monthName = months[DateAndTime.getMonth()];

        //Temp
        const temp = Math.floor(item.main.temp);

        return { date, monthName, temp, weather };
      });

      //FOR TODAY MAX_MIN TEMPERATURE
      //Today Date
      const now = new Date(Date.now() + timezone * 1000);
      const today = now.getDate();
      // Filter all forecast entries for today
      const todayForecasts = data.list.filter((item) => {
        const dt = new Date(item.dt * 1000);
        return dt.getDate() === today;
      });

      // Extract temps
      const min_temps = todayForecasts.map((item) => item.main.temp_min);
      const max_temps = todayForecasts.map((item) => item.main.temp_max);

      // Find min/max
      const max_temp = Math.max(...max_temps);
      const min_temp = Math.min(...min_temps);

      const currentDayFormattedData = {
        max_temp: Math.floor(max_temp),
        min_temp: Math.floor(min_temp),
      };
      setForeCastData({
        fiveDay: FiveDayFormattedData,
        threeHour: ThreeDayFormattedData,
        currentDay: currentDayFormattedData,
      });
    };

    fetchData();
  }, [city]);

  return ForcastData;
};

export default ForeCastAPI;
