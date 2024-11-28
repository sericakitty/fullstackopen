const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  const data = Array.isArray(country.data) ? country.data[0] : country.data;

  return (
    <>
      <h3>{data.name.common}</h3>
      <div>capital {data.capital}</div>
      <div>population {data.population}</div>
      <img
        src={data.flags.png}
        height="100"
        alt={`flag of ${data.name.common}`}
      />
    </>
  );
};

export default Country;