import React from "react";

const CountryCard = ({ country }) => {
  const { flags, name, capital, population, region } = country;
  return (
    <li className="country-card card">
      <div className="container-card bg-white-box">
        {/* svg image is good as compared to png image because svg do not distort when zoomed */}
        <img src={flags.svg} alt={flags.alt} />

        <div className="countryInfo">
          <p className="card-title">
            {name.common.length > 10
              ? name.common.slice(0, 10) + "..."
              : name.common}
          </p>
          <p>
            <span className="card-description">Population:</span>
            {population.toLocaleString()}
          </p>
          <p>
            <span className="card-description">Region:</span>
            {region}
          </p>
          <p>
            <span className="card-description">Capital:</span>
            {capital[0]}
          </p>
        </div>
      </div>
    </li>
  );
};

export default CountryCard;
