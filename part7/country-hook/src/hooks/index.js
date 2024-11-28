import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (name) => { // 7.7 custom hook for fetching country data
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) {
      return;
    }

    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        );
        console.log(response.data);
        setCountry({ found: true, data: response.data });
      } catch (error) {
        setCountry({ found: false });
      }
    };

    fetchCountry();
  }, [name]);

  return country;
};

export default useCountry;
