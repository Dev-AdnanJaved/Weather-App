import { useState, useEffect } from "react";

const API_KEY = "53e2b6c89d2766767033e7d291f427d8";

const useWeather = (city) => {
  const [data, setData] = useState({
    current: null,
    forecast: null,
    fiveDay: null,
    threeHour: null,
    currentDay: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [weatherRes, forecastRes] = await Promise.all([
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          ),
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
          ),
        ]);

        if (!weatherRes.ok || !forecastRes.ok) {
          throw new Error("Not Found");
        }

        const [weatherData, forecastData] = await Promise.all([
          weatherRes.json(),
          forecastRes.json(),
        ]);

        // timezone
        const timezone = forecastData.city.timezone;

        // format 3-hour forecast
        const threeHour = forecastData.list.map((item) => {
          const dt = item.dt;
          const dateObj = new Date((dt + timezone) * 1000);

          const temp = Math.floor(item.main.temp);
          const weather = item.weather[0].main;

          let hours = dateObj.getUTCHours();
          const ampm = hours >= 12 ? " PM" : " AM";
          const hours12 = hours % 12 === 0 ? 12 : hours % 12;
          hours = hours12 + ampm;

          return { hours, weather, temp };
        });

        // format 5-day forecast
        const daily = forecastData.list.filter((item) =>
          item.dt_txt.includes("00:00:00")
        );

        const fiveDay = daily.map((item) => {
          const dt = item.dt;
          const dateObj = new Date((dt + timezone) * 1000);

          const weather = item.weather[0].main;
          const date = dateObj.getDate();
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
          const monthName = months[dateObj.getMonth()];
          const temp = Math.floor(item.main.temp);

          return { date, monthName, temp, weather };
        });

        // today’s max/min
        const now = new Date(Date.now() + timezone * 1000);
        const today = now.getDate();
        const todayForecasts = forecastData.list.filter((item) => {
          const dt = new Date(item.dt * 1000);
          return dt.getDate() === today;
        });

        const minTemps = todayForecasts.map((i) => i.main.temp_min);
        const maxTemps = todayForecasts.map((i) => i.main.temp_max);

        const currentDay = {
          max_temp: Math.floor(Math.max(...maxTemps)),
          min_temp: Math.floor(Math.min(...minTemps)),
        };

        // final
        setData({
          current: weatherData,
          forecast: forecastData,
          fiveDay,
          threeHour,
          currentDay,
        });
      } catch (err) {
        setError(err.message);
        setData({
          current: null,
          forecast: null,
          fiveDay: null,
          threeHour: null,
          currentDay: null,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return { ...data, loading, error };
};

export default useWeather;
