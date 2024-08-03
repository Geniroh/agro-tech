"use client";
import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, message } from "antd";
import { useFormContext } from "@/context/FormContext";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Item } = Form;

interface IGuidelines {
  name: string;
}

const Step7: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const [selectValue, setSelectValue] = useState<boolean | null>(null);
  const [guidelines, setGuidelines] = useState<IGuidelines[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectValue === true && guidelines.length === 0) {
      setGuidelines([{ name: "" }]);
    } else if (selectValue === false) {
      setGuidelines([]);
    } else if (selectValue === null && formData.isHSEGuidelines !== undefined) {
      setSelectValue(formData.isSupplier);
      setGuidelines(formData.hseguidelines || []);
    }
  }, [selectValue]);

  const handleSelectChange = (value: boolean) => {
    setSelectValue(value);
    if (!value) {
      setGuidelines([]);
    }
    setFormData({ ...formData, isHSEGuideline: value });
  };

  const addGuideline = () => {
    setGuidelines([...guidelines, { name: "" }]);
  };

  const removeGuideline = (index: number) => {
    if (index === 0) return;
    setGuidelines(guidelines.filter((_, i) => i !== index));
  };

  const handleGuidelineChange = (
    index: number,
    field: keyof IGuidelines,
    value: any
  ) => {
    const updatedInstance = [...guidelines];
    updatedInstance[index][field] = value;
    setGuidelines(updatedInstance);
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      if (selectValue) {
        for (const guideline of guidelines) {
          if (!guideline.name) {
            throw new Error(
              "Please fill in all required fields for each instance"
            );
          }
        }
      }
      saveData(values);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error("Please fill in all required fields guideline");
    }
  };

  const saveData = (values: any) => {
    setFormData({ ...formData, ...values, hseguidelines: guidelines });
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
          JSON.stringify({ ...formData, ...values, hseguidelines: guidelines })
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
            Does this product Have HSE Guidelines?{" "}
            <span className="text-red-600">*</span>
          </h3>
          <Item
            name="isHSEGuidelines"
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
            <h2 className="text-muted-foreground text-[14px] leading-[20px] mb-3">
              Please Provide all Necessary HSE Guidelines
            </h2>
            {guidelines.map((guideline, index) => (
              <div key={index}>
                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                    {index + 1}
                  </h3>

                  <Item
                    className="w-full"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input
                      value={guideline.name}
                      placeholder="Please Enter Info"
                      size="large"
                      onChange={(e) =>
                        handleGuidelineChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </Item>
                </div>

                {index > 0 && (
                  <Button
                    type="dashed"
                    style={{ color: "red" }}
                    onClick={() => removeGuideline(index)}
                    icon={<DeleteOutlined />}
                  />
                )}
              </div>
            ))}
            <div className="w-full flex justify-center items-center">
              <Form.Item>
                <Button
                  type="text"
                  style={{ color: "#329632" }}
                  onClick={addGuideline}
                  icon={<PlusOutlined />}
                >
                  Add Instance
                </Button>
              </Form.Item>
            </div>
          </div>
        )}

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
      </Form>
    </div>
  );
};

export default Step7;
