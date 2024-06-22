"use client";
import { OCCUPATION_OPTIONS, VALUE_CHAIN_OPTIONS } from "@/constants/options";
import { validatePhoneNumber } from "@/utils/function";
import { Button, Form, Input, Select, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import { FaMobileAlt, FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineWork } from "react-icons/md";
import { countriesData, ICountry } from "@/data/country-region";
import { useCurrentUser } from "@/hooks/current-user";
import { TfiWorld } from "react-icons/tfi";
import axios from "axios";

const { Item } = Form;

export const UserDetailsForm = () => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [form] = Form.useForm();
  const user = useCurrentUser();

  const generateCountryOptions = (countries: ICountry[]) => {
    return countries.map((country) => ({
      value: country.countryName,
      label: country.countryName,
    }));
  };

  const generateStateOptions = (state: string = "Nigeria") => {
    const res = countriesData
      .filter((country) => country.countryName === state)
      .map((country) => country.regions)
      .flat()
      .map((state) => ({
        value: state.name,
        label: state.name,
      }));
    return res;
  };

  const handleUserUpdate = async () => {
    try {
      const values = await form.validateFields();

      const { data } = await axios.put("/api/v1/user/details", values);
      console.log({ data });
      console.log(values);
    } catch (error) {
      message.error("Update failed, please try again");
      console.log(error);
    }
  };
  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/details");
      console.log(data);
      form.setFieldsValue(data);
    } catch (error) {
      message.error("Network error");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  });

  return (
    <div>
      <div className="mt-5 pb-4 border-b flex justify-between">
        <div className="flex gap-4">
          <button
            className={`${
              activeSection == 1
                ? "text-white bg-mygreen"
                : "bg-myoffwhie text-black"
            } py-1 px-6 rounded-3xl text-[14px]`}
            onClick={() => setActiveSection(1)}
          >
            Personal Information
          </button>
          <button
            className={`${
              activeSection == 2
                ? "text-white bg-mygreen"
                : "bg-myoffwhie text-black"
            } py-1 px-6 rounded-3xl text-[14px]`}
            onClick={() => setActiveSection(2)}
          >
            Address
          </button>
          <button
            className={`${
              activeSection == 3
                ? "text-white bg-mygreen"
                : "bg-myoffwhie text-black"
            } py-1 px-6 rounded-3xl text-[14px]`}
            onClick={() => setActiveSection(3)}
          >
            Company Info and association
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <Form
            layout="vertical"
            form={form}
            requiredMark={undefined}
            scrollToFirstError
          >
            {activeSection == 1 && (
              <Space className="mt-5 w-full" direction="vertical">
                <Item
                  name="username"
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">Name</span>{" "}
                    </div>
                  }
                >
                  <Input
                    prefix={<FaUser color="#888888" />}
                    placeholder="Username"
                    variant="filled"
                    size="large"
                    className="rounded-md"
                  />
                </Item>

                <Item
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">Email</span>{" "}
                    </div>
                  }
                >
                  <Input
                    prefix={<MdEmail color="#888888" />}
                    placeholder={`${user?.email}`}
                    variant="filled"
                    size="large"
                    readOnly
                    className="rounded-md"
                  />
                </Item>

                <Item
                  name="phone"
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">
                        Phone Number
                      </span>{" "}
                    </div>
                  }
                  rules={[{ validator: validatePhoneNumber }]}
                >
                  <Input
                    prefix={<FaMobileAlt color="#888888" />}
                    placeholder="+2340000000000"
                    variant="filled"
                    size="large"
                    className="rounded-md"
                  />
                </Item>

                <Item
                  name="occupation"
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">Occupation</span>{" "}
                    </div>
                  }
                >
                  <Select
                    showSearch
                    // suffixIcon={<MdOutlineWork />}
                    allowClear
                    placeholder="Select An Occupation"
                    optionFilterProp="label"
                    className="w-full"
                    size="large"
                    variant="filled"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={OCCUPATION_OPTIONS}
                  />
                </Item>

                <Item
                  name="country"
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">Country</span>{" "}
                    </div>
                  }
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select A Country"
                    optionFilterProp="label"
                    className="w-full"
                    size="large"
                    variant="filled"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={generateCountryOptions(countriesData)}
                  />
                </Item>
              </Space>
            )}

            {activeSection === 2 && (
              <Space className="mt-5 w-full" direction="vertical">
                <Item
                  name="state"
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">State</span>{" "}
                    </div>
                  }
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder=""
                    optionFilterProp="label"
                    className="w-full"
                    size="large"
                    variant="filled"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={generateStateOptions()}
                  />
                </Item>

                <Item
                  name="lga"
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">LGA</span>{" "}
                    </div>
                  }
                >
                  <Input
                    placeholder=""
                    variant="filled"
                    size="large"
                    className="rounded-md"
                  />
                </Item>

                <Item
                  name="address"
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">Address</span>{" "}
                    </div>
                  }
                >
                  <Input
                    placeholder=""
                    variant="filled"
                    size="large"
                    className="rounded-md"
                  />
                </Item>
              </Space>
            )}

            {activeSection === 3 && (
              <Space className="mt-5 w-full" direction="vertical">
                <Item
                  name="company_name"
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">
                        Company Name
                      </span>{" "}
                    </div>
                  }
                >
                  <Input
                    placeholder=""
                    variant="filled"
                    size="large"
                    className="rounded-md"
                  />
                </Item>

                <Item
                  name="position"
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">Position</span>{" "}
                    </div>
                  }
                >
                  <Input
                    placeholder=""
                    variant="filled"
                    size="large"
                    className="rounded-md"
                  />
                </Item>

                <Item
                  name="association"
                  label={
                    <div className="w-full flex justify-between items-center text-[14px]">
                      <span className="text-muted-foreground">
                        Associations
                      </span>{" "}
                    </div>
                  }
                >
                  <Input
                    placeholder=""
                    variant="filled"
                    size="large"
                    className="rounded-md"
                  />
                </Item>
              </Space>
            )}

            <div className="w-full flex justify-end">
              <Button
                // style={{ borderRadius: "32px" }}
                type="primary"
                onClick={handleUserUpdate}
                size="large"
                shape="round"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
