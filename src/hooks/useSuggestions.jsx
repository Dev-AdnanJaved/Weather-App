import { useEffect, useState } from "react";

const useSuggestions = (InputValue) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Debouncing
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(InputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [InputValue]);

  useEffect(() => {
    if (!debounceValue || debounceValue.trim() === "") {
      setSuggestions([]);
      return;
    }

    //Initiliazation of AbortConroller
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${debounceValue}`,
          {
            headers: {
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key":
                "96bb378b30msh074dbc9cdc48ad8p1ee37ejsn791f6cf40abe",
            },

            signal: controller.signal,
          }
        );

        const Alldata = await res.json();

        if (debounceValue !== InputValue) return; //For safety
        const onlyCities = Alldata.data
          .filter((item) => item.type === "CITY")
          .map((item) => ({
            city: item.city,
            region: item.region,
            country: item.country,
          }));

        setSuggestions(onlyCities);
      } catch (err) {
        if (err.name === "AbortError") return; //For Safety
        setError("Not Found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [debounceValue]);

  return { suggestions, loading, error };
};

export default useSuggestions;
