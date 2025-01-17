import { useEffect, useState } from "react";
import { CustomOption, CustomSelect } from "./CustomSelect";

type CountryObjectType = {
  value: string;
  label: string;
};

const CountrySelector = () => {
  const [countries, setCountries] = useState<CountryObjectType[] | null>(null); //countries state

  // loading country into state
  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
      });
  }, []);

  return (
    // container for country selector
    <div>
      {/* country selector title */}
      <h4 className="mb-2 text-xs font-medium text-[#808191]">Country</h4>
      {/* checking if countries state is loaded */}
      {countries ? (
        // custom select for countries
        <CustomSelect placeholder="country" name="country">
          {countries.map((country) => (
            <CustomOption id={country.value} value={country.label} key={country.value}>
              <div className="pl-4 py-4 w-full text-left overflow-hidden text-ellipsis">{country.label}</div>
            </CustomOption>
          ))}
        </CustomSelect>
      ) : (
        // show blank if countries not loaded
        <div className="min-w-full min-h-[53.93x] w-full p-4 text-sm placeholder-white bg-[#35353E] rounded-lg sm:min-h-[51.96px]" />
      )}
    </div>
  );
};

export default CountrySelector;
