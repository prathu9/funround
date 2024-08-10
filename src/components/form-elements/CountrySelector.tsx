import { useEffect, useState } from "react";
import { CustomOption, CustomSelect } from "./CustomSelect";

type CountryObjectType = {
  value: string;
  label: string;
};

const CountrySelector = () => {
  const [countries, setCountries] = useState<CountryObjectType[] | null>(null);

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
    <div>
      <h4 className="mb-2 text-xs font-medium text-[#808191]">Country</h4>
      {countries ? (
        <CustomSelect defaultValue={countries[0].value} name="country">
          {countries.map((country) => (
            <CustomOption value={country.value} key={country.value}>
              <div className="p-4">{country.label}</div>
            </CustomOption>
          ))}
        </CustomSelect>
      ) : (
        <div className="min-w-full min-h-[53.93x] w-full p-4 text-sm placeholder-white bg-[#35353E] rounded-lg sm:min-h-[51.96px]" />
      )}
    </div>
  );
};

export default CountrySelector;
