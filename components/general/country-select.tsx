import { countriesData } from '@/data/country-region';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const CountrySelect = () => {
  // Extract list of countries from JSON data
  const countries = countriesData.map((country) => ({
    name: country.countryName,
    regions: country.regions
  }));

  const handleChange = (selectedCountry:string) => {
    // Handle selection logic here
    console.log('Selected Country:', selectedCountry);
  };

  return (

    <Select>
        <SelectTrigger className="w-full bg-[#fafafa]">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent position='popper' >
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
        </SelectContent>
    </Select>
    // <Select onChange={handleChange}>
    //   <SelectTrigger className="w-full bg-[#fafafa]">
    //     <SelectValue placeholder="Select Country" />
    //   </SelectTrigger>
    //   <SelectContent position='popper'>
    //     {countries.map((country, index) => (
    //       <optgroup key={index} label={country.name}>
    //         {country.regions.map((region, idx) => (
    //           <SelectItem key={idx} value={region.shortCode}>
    //             {region.name}
    //           </SelectItem>
    //         ))}
    //       </optgroup>
    //     ))}
    //   </SelectContent>
    // </Select>
  );
};
