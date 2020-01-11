import { useState, useEffect } from "react";

import config from "../config";

const useWeatherData = locationData => {
  const [result, setResult] = useState(null);

  const [makeCall, setMakeCall] = useState(false);

  useEffect(() => {
    if (makeCall === true) {
      setMakeCall(false);

      fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}"
      )
        .then(res => {
          console.log("res: ", res.data);
        })
        .catch(err => {
          console.log("err: ", err.response);
        });
    }
  }, [makeCall, setMakeCall]);

  if (locationData !== null)
    setTimeout(() => setMakeCall(true), [config.weatherCallFrequency]);
};

export default useWeatherData;
