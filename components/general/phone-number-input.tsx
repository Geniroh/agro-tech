import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import {
  CountryCode,
  isValidNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";

const CustomPhoneNumberInput = ({
  defaultCountry,
  name,
  onChange,
  defaultValue,
}: {
  defaultCountry: CountryCode;
  name: string;
  onChange: (value: E164Number | undefined) => void;
  defaultValue?: string;
}) => {
  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [formattedNumber, setFormattedNumber] = useState<string>("");

  const handlePhoneChange = (value: E164Number | undefined) => {
    setPhoneNumber(value);

    if (value) {
      const phoneNumberObj = parsePhoneNumberFromString(value, defaultCountry);

      if (phoneNumberObj && isValidNumber(value, defaultCountry)) {
        setIsValid(true);
        setFormattedNumber(phoneNumberObj.formatInternational());
      } else {
        setIsValid(false);
        setFormattedNumber("");
      }
    } else {
      setIsValid(true);
      setFormattedNumber("");
    }

    onChange(value);
  };

  return (
    <div className="">
      <PhoneInput
        international
        country={defaultCountry}
        value={defaultValue || phoneNumber}
        onChange={handlePhoneChange}
        defaultCountry={defaultCountry}
        className="bg-[#f0f0f0] py-2 px-3 rounded-md w-full"
        style={{ background: "#f0f0f0" }}
      />
      {isValid ? "" : <p style={{ color: "red" }}>Invalid phone number</p>}
    </div>
  );
};

export default CustomPhoneNumberInput;
