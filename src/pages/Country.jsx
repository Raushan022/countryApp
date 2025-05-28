import React, { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/postApi";
import Loader from "../components/UI/Loader";
import CountryCard from "../components/Layout/CountryCard";
import SearchFilter from "../components/UI/SearchFilter";

const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      // console.log(res);
      setCountries(res.data);
    });
  }, []);

  if (isPending) return <Loader />;

  const filterByRegion = (countryName) => {
    if (filter === "all") return countryName;

    return countryName.region === filter;
  };

  const searchCountry = (countryName) => {
    if (search) {
      return countryName.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
    }
    return countryName;
  };

  // main logic to search and filter
  const filteredCountries = countries.filter(
    (country) => searchCountry(country) && filterByRegion(country)
  );

  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />
      <ul className="grid grid-four-cols">
        {filteredCountries.map((country, index) => (
          <CountryCard key={index} country={country} />
        ))}
      </ul>
    </section>
  );
};

export default Country;
