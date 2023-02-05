import { useEffect, useState } from "react";
import Country from "./Country";

const FETCH_ALL_COUNTRIES_URI: string =
  "https://restcountries.com/v3.1/all" as const;

export type CountryNeeded = {
  name: string;
  nativeName: string;
  capital: string;
  population: string;
  region: string;
  subregion: string;
  topLevelDomain: string;
  borderCode: string;
  borderCountries: string[];
  flagLink: string;
  languages: string[];
  currencies: string[];
};

type CountryAllProps = {
  [key: string]: any;
};

type ErrorObject = {
  message: string;
};

const CountriesSection = () => {
  const [countries, setCountries] = useState(Array<CountryNeeded>);

  useEffect(() => {
    const fetchDataAndSetCountries = async (): Promise<void> => {
      const countriesAllProps: CountryAllProps[] = await fetch(
        FETCH_ALL_COUNTRIES_URI
      )
        .then((dataRaw) => dataRaw.json())
        .catch((err: ErrorObject) => console.error(err.message));

      const clearedCountries: CountryNeeded[] = countriesAllProps.map(
        (country: CountryAllProps): CountryNeeded => {
          return {
            name: country.name.common,
            nativeName: country.name.nativeName,
            population: country.population,
            region: country.region,
            subregion: country.subregion,
            topLevelDomain: country.tld,
            capital: country.capital,
            borderCode: country.cca3,
            borderCountries: country.borders,
            flagLink: country.flags.svg,
            languages: country.languages,
            currencies: country.currencies,
          };
        }
      );
      setCountries(clearedCountries);
    };

    fetchDataAndSetCountries();
  }, []);

  return (
    <main className="grid grid-cols-4 gap-5 p-5">
      {countries.map((country) => (
        <Country key={country.borderCode} country={country} />
      ))}
    </main>
  );
};

export default CountriesSection;
