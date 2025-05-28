import React, { useEffect, useState, useTransition } from "react";
import { getCountryIndData } from "../../api/postApi";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../UI/Loader";

const CountryDetails = () => {
  const params = useParams();
  //   console.log(params.id);
  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState();

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryIndData(params.id);
      // console.log(res.data[0]);
      if (res.status === 200) {
        setCountry(res.data[0]);
      }
    });
  }, []);

  if (isPending) return <Loader />;

  return (
    <section className="card country-details-card container">
      <div className="container-card bg-white-box">
        {country && (
          <div className="country-image grid grid-two-cols">
            <img src={country.flags.svg} alt={country.flags.alt} />

            <div className="country-content">
              <p className="card-title">{country.name.common}</p>
              <p>
                <span className="card-description">Native Name:</span>
                {Object.keys(country.name.nativeName)
                  .map((x) => country.name.nativeName[x].common)
                  .join(", ")}
              </p>
              <p>
                <span className="card-description">Population:</span>
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="card-description">Region:</span>
                {country.region}
              </p>
              <p>
                <span className="card-description">Sub Region:</span>
                {country.subregion}
              </p>
              <p>
                <span className="card-description">Capital:</span>
                {country.capital[0]}
              </p>
              <p>
                <span className="card-description">Top Level Domain:</span>
                {country.tld[0]}
              </p>
              <p>
                <span className="card-description">Currencies:</span>
                {Object.keys(country.currencies)
                  .map((x) => country.currencies[x].name)
                  .join(", ")}
              </p>
              <p>
                <span className="card-description">Languages:</span>
                {Object.keys(country.languages)
                  .map((x) => country.languages[x])
                  .join(", ")}
              </p>
            </div>
          </div>
        )}
        <div className="country-card-backBtn">
          <NavLink to={"/country"} className="backBtn">
            <button>Go Back</button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default CountryDetails;
