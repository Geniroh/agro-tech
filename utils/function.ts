import { RuleObject } from "antd/lib/form";
import { countriesData } from "@/data/country-region";
import { countryCurrencies } from "@/data/country-currency";

import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

const generalAfricanPhoneRegex = /^(\+2[0-9]{1,3}|002[0-9]{1,3})?[0-9]{8,12}$/;

export const createValidatePhoneNumber =
  (countryCode?: CountryCode) =>
  (rule: RuleObject, value: any, callback: (error?: string) => void) => {
    if (!value) {
      callback();
      return;
    }

    if (countryCode) {
      const phoneNumber = parsePhoneNumberFromString(value, countryCode);
      if (phoneNumber && phoneNumber.isValid()) {
        callback();
        return;
      } else {
        callback("Please enter a valid phone number");
        return;
      }
    } else {
      if (value.match(generalAfricanPhoneRegex)) {
        callback();
        return;
      } else {
        callback("Please enter a valid phone number");
        return;
      }
    }
  };

// export const validatePhoneNumber = (
//   rule: RuleObject,
//   value: any,
//   callback: (error?: string) => void,
//   countryCode?: CountryCode
// ) => {
//   if (!value) {
//     callback();
//     return;
//   }

//   if (countryCode) {
//     const phoneNumber = parsePhoneNumberFromString(value, countryCode);
//     if (phoneNumber && phoneNumber.isValid()) {
//       callback();
//       return;
//     } else {
//       callback("Please enter a valid African phone number");
//       return;
//     }
//   } else {
//     if (value.match(generalAfricanPhoneRegex)) {
//       callback();
//       return;
//     } else {
//       callback("Please enter a valid African phone number");
//       return;
//     }
//   }
// };

export const getFirstName = (fullName: string | undefined | null) => {
  if (!fullName) return "";
  const names = fullName.trim().split(/\s+/);

  const firstName = names[0]
    ? names[0][0].toUpperCase() + names[0].slice(1).toLowerCase()
    : "";

  return firstName;
};

export const generateArrayFromNumber = (number: number) => {
  if (number > 0) {
    const newArray = Array.from({ length: number }, (_, i) => i + 1);
    return newArray;
  } else {
    return [];
  }
};

export const knumberformatter = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num.toString();
  }
};

export function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const validateEmail = (
  rule: RuleObject,
  value: any,
  callback: (error?: string) => void
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value || value.match(emailRegex)) {
    callback();
  } else {
    callback("Please enter a valid email address");
  }
};

export const validatePhoneNumber = (
  rule: RuleObject,
  value: any,
  callback: (error?: string) => void
) => {
  const phoneRegex = /^(?:\+?234)?(?:0)?([7-9][0-9]{9})$/;

  if (!value || value.match(phoneRegex)) {
    callback();
  } else {
    callback("Please enter a valid phone number");
  }
};

//CHARTS FUNCTION
export const transformInnovationsToChartData = (
  innovations: IInnovationType[]
): ChartData[] => {
  const innovationCounts: { [year: string]: number } = {};

  for (const innovation of innovations) {
    const year = innovation.yearInvented;
    innovationCounts[year] = (innovationCounts[year] || 0) + 1;
  }

  return Object.entries(innovationCounts).map(([year, count]) => ({
    name: year,
    value: count,
  }));
};

export const countValueChainOccurrences = (
  innovations: IInnovationType[],
  valueChainOptions: string[]
): ChartData[] => {
  const valueChainCounts: { [chain: string]: number } = {};

  for (const innovation of innovations) {
    for (const chain of innovation.productChain) {
      if (valueChainOptions.includes(chain)) {
        valueChainCounts[chain] = (valueChainCounts[chain] || 0) + 1;
      }
    }
  }

  return Object.entries(valueChainCounts).map(([chain, count]) => ({
    name: chain,
    value: count,
  }));
};

export function countProductPhaseOccurrences(
  data: IInnovationType[],
  productPhases: string[],
  colors: string[]
): { title: string; value: number; color: string }[] {
  const result: { title: string; value: number; color: string }[] = [];

  // Map product phases to their count
  const phaseCounts = productPhases.reduce((acc, phase) => {
    acc[phase] = 0;
    return acc;
  }, {} as Record<string, number>);

  data.forEach((item) => {
    phaseCounts[item.productPhase]++;
  });

  // Create result object for each product phase
  productPhases.forEach((phase, index) => {
    result.push({
      title: phase,
      value: phaseCounts[phase],
      color: colors[index % colors.length],
    });
  });

  return result;
}

// DATA FUNCTIONS
export const getCountryCode = (countryString: string): CountryCode => {
  const code = countriesData
    .filter((country) => country.countryName == countryString)
    .map((country) => country.countryShortCode);
  return code[0] || "NG";
};

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push({ value: year.toString(), label: year.toString() });
  }
  return years;
};
