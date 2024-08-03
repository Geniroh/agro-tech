"use client";
import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, message } from "antd";
import { useFormContext } from "@/context/FormContext";
import { useFormSubmit } from "@/hooks/multi-step-submit";

const { TextArea } = Input;

const { Option } = Select;
const { Item } = Form;

const Step8: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const { handleSubmit } = useFormSubmit();
  const [selectValue, setSelectValue] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleSelectChange = (value: boolean) => {
    setSelectValue(value);
    setFormData({ ...formData, value });
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      saveData(values);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error("Please fill in all required fields guideline");
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

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        className="space-y-4"
        initialValues={{ ...formData }}
      >
        <div>
          <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
            Is this product gender friendly ?{" "}
            <span className="text-red-600">*</span>
          </h3>
          <Item
            name="isGenderFriendly"
            rules={[{ required: true, message: "Please Select an Option" }]}
          >
            <Select size="large" onChange={handleSelectChange}>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Item>
        </div>

        {selectValue && (
          <div>
            <div>
              <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                Briefly describe how this technology is inclusive of the female
                gender.
              </h3>

              <Item
                className="w-full"
                name="gender_description"
                rules={[
                  { required: true, message: "Please provide some details" },
                ]}
              >
                <TextArea
                  placeholder="Please enter brief description to support"
                  size="large"
                  rows={4}
                />
              </Item>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-y-4">
          <Button
            className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-bold disabled:cursor-not-allowed"
            size="large"
            type="text"
            onClick={prevStep}
            disabled={currentStep < 1 || loading}
          >
            Go Back
          </Button>
          <Button
            className="text-white bg-myblack rounded-xl text-[16px] leading-[22px] font-bold disabled:cursor-not-allowed"
            size="large"
            type="primary"
            loading={loading}
            disabled={loading}
            onClick={handleNextStep}
          >
            Preview
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Step8;
