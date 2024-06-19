"use client";
import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, Upload, message } from "antd";
import { useFormContext } from "@/context/FormContext";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { validateEmail, validatePhoneNumber } from "@/utils/function";

const { TextArea } = Input;

const { Option } = Select;
const { Item } = Form;

interface IInventor {
  inventor_email: string;
  inventor_name: string;
  inventor_contact: string;
}

const Step5: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const [selectValue, setSelectValue] = useState<boolean | null>(null);
  const [inventors, setInventors] = useState<IInventor[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectValue === true && inventors.length === 0) {
      setInventors([
        { inventor_contact: "", inventor_email: "", inventor_name: "" },
      ]);
    } else if (selectValue === false) {
      setInventors([]);
    } else if (selectValue === null && formData.isInventor !== undefined) {
      setSelectValue(formData.isInventor);
      setInventors(formData.inventor || []);
    }
  }, [selectValue]);

  const handleSelectChange = (value: boolean) => {
    setSelectValue(value);
    if (!value) {
      setInventors([]);
    }
    setFormData({ ...formData, isInventor: value });
  };

  const addInventor = () => {
    setInventors([
      ...inventors,
      { inventor_contact: "", inventor_email: "", inventor_name: "" },
    ]);
  };

  const removeInventor = (index: number) => {
    if (index === 0) return;
    setInventors(inventors.filter((_, i) => i !== index));
  };

  const handleInventorChange = (
    index: number,
    field: keyof IInventor,
    value: any
  ) => {
    const updatedInstance = [...inventors];
    updatedInstance[index][field] = value;
    setInventors(updatedInstance);
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      if (selectValue) {
        for (const inventor of inventors) {
          if (
            !inventor.inventor_contact ||
            !inventor.inventor_email ||
            !inventor.inventor_name
          ) {
            throw new Error(
              "Please fill in all required fields for each instance"
            );
          }
        }
      }
      saveData(values);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error("Please fill in all required fields for each inventor");
    }
  };

  const saveData = (values: any) => {
    setFormData({ ...formData, ...values, inventor: inventors });
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
          JSON.stringify({ ...formData, ...values, inventor: inventors })
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
            Are you an inventor on this product?
          </h3>
          <Item
            name="isInventor"
            rules={[{ required: true, message: "Please Select an Option" }]}
          >
            <Select size="large" onChange={handleSelectChange}>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Item>
          <h2 className="text-muted-foreground text-[14px] leading-[20px]">
            Please provide details below.
          </h2>
        </div>

        {selectValue && (
          <div>
            {inventors.map((inventor, index) => (
              <div key={index}>
                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                    Name
                  </h3>

                  <Item
                    className="w-full"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input
                      value={inventor.inventor_name}
                      placeholder="Please Enter Your Name"
                      size="large"
                      onChange={(e) =>
                        handleInventorChange(
                          index,
                          "inventor_name",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Item>
                </div>

                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                    Email
                  </h3>

                  <Item
                    className="w-full"
                    rules={[
                      { required: true, message: "Required" },
                      { validator: validateEmail },
                    ]}
                  >
                    <Input
                      value={inventor.inventor_email}
                      placeholder="Please Enter Your Email"
                      type="email"
                      size="large"
                      onChange={(e) =>
                        handleInventorChange(
                          index,
                          "inventor_email",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Item>
                </div>

                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                    Contact
                  </h3>

                  <Item
                    className="w-full"
                    rules={[
                      { required: true, message: "Required" },
                      { validator: validatePhoneNumber },
                    ]}
                  >
                    <Input
                      value={inventor.inventor_contact}
                      placeholder="Please Enter Your Contact"
                      suffix="Nigeria"
                      prefix="234"
                      size="large"
                      onChange={(e) =>
                        handleInventorChange(
                          index,
                          "inventor_contact",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Item>
                </div>

                {index > 0 && (
                  <Button
                    type="dashed"
                    style={{ color: "red" }}
                    onClick={() => removeInventor(index)}
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
                  onClick={addInventor}
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

export default Step5;
