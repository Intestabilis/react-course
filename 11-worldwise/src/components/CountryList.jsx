import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../context/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner></Spinner>;

  if (!cities.length)
    return (
      <Message message="Add the first city by clicking on the map"></Message>
    );

  const countries = cities.reduce(
    (arr, city) =>
      !arr.map((el) => el.country).includes(city.country)
        ? [...arr, { country: city.country, emoji: city.emoji }]
        : arr,
    [],
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country}></CountryItem>
      ))}
    </ul>
  );
}

export default CountryList;
