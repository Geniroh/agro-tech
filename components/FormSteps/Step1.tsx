"use client";
import React, { useEffect } from "react";
import { useFormContext } from "@/context/FormContext";
import { Input, Form, Select, Button, message } from "antd";
import { countriesData, ICountry } from "@/data/country-region";
import { MONTH_OPTIONS, VALUE_CHAIN_OPTIONS } from "@/constants/options";

const { Item } = Form;

const Step1: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      saveData(values);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error("Please fill in all required fields");
    }
  };

  const saveData = (values: any) => {
    setFormData({ ...formData, ...values });
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveStep = async () => {
    try {
      const values = await form.validateFields();
      if (values && typeof window !== "undefined") {
        localStorage.setItem(
          "formData",
          JSON.stringify({ ...formData, ...values })
        );
        localStorage.setItem("currentStep", currentStep.toString());
        localStorage.setItem("totalSteps", mySteps.toString());
      }
      message.success("Your progress has been saved");
    } catch (error) {
      message.error("Please fill in all required fields");
    }
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push({ value: year.toString(), label: year.toString() });
    }
    return years;
  };

  const generateCountryOptions = (countries: ICountry[]) => {
    return countries.map((country) => ({
      value: country.countryName,
      label: country.countryName,
    }));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="space-y-4"
      initialValues={{ ...formData }}
    >
      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
          Innovation Name
        </h3>
        <Item
          name="innovation_name"
          rules={[
            { required: true, message: "Please enter the Innovation name" },
          ]}
        >
          <Input
            size="large"
            placeholder="Please Enter the Name of the Innovation Here"
            variant="filled"
          />
        </Item>
      </div>

      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
          Year Invented
        </h3>
        <Item
          name="innovation_year"
          rules={[
            { required: true, message: "Please select the Innovation year" },
          ]}
        >
          <Select
            showSearch
            placeholder="Select Innovation Year"
            optionFilterProp="label"
            className="w-full"
            variant="filled"
            size="large"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={generateYearOptions()}
          />
        </Item>
      </div>

      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">Month</h3>
        <Item
          name="innovation_month"
          rules={[
            { required: true, message: "Please select the Innovation month" },
          ]}
        >
          <Select
            placeholder="Select Innovation Month"
            className="w-full"
            size="large"
            options={MONTH_OPTIONS}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            variant="filled"
          />
        </Item>
      </div>

      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
          Country
        </h3>
        <Item
          name="innovation_country"
          rules={[{ required: true, message: "Please select a country" }]}
        >
          <Select
            showSearch
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
      </div>

      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
          Cost (Naira)
        </h3>

        <Item
          name="innovation_cost"
          rules={[{ required: true, message: "Please Enter Product Cost" }]}
        >
          <Input
            size="large"
            type="number"
            variant="filled"
            placeholder="How Much Does This Innovation Cost"
          />
        </Item>
      </div>

      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
          Value Chains
        </h3>
        <Item
          name="innovation_value_chain"
          rules={[{ required: true, message: "Please select a Value Chain" }]}
        >
          <Select
            mode="tags"
            allowClear
            size="large"
            className="w-full"
            variant="filled"
            placeholder="Select a Value Chain"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={VALUE_CHAIN_OPTIONS}
          />
        </Item>
      </div>

      <div>
        <div className="mt-10 flex flex-col gap-y-4">
          <Button
            className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-bold disabled:cursor-not-allowed"
            size="large"
            type="text"
            onClick={prevStep}
            disabled={currentStep < 1}
          >
            Go Back
          </Button>
          <Button
            className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-bold disabled:cursor-not-allowed"
            size="large"
            type="primary"
            onClick={handleNextStep}
          >
            Continue
          </Button>
          <Button
            className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-bold disabled:cursor-not-allowed"
            size="large"
            type="default"
            onClick={handleSaveStep}
          >
            Save Progress
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Step1;
