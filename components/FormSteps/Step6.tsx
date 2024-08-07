"use client";
import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, message } from "antd";
import { useFormContext } from "@/context/FormContext";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  convertObjectToSupplierArray,
  reverseArrayToSupplierObject,
} from "@/utils/multi-step";
import {
  createValidatePhoneNumber,
  getCountryCode,
  validateEmail,
  validatePhoneNumber,
} from "@/utils/function";
import { CountryCode } from "libphonenumber-js";

const { TextArea } = Input;
const { Option } = Select;
const { Item } = Form;

const Step6: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const [form] = Form.useForm();
  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [inputGroups, setInputGroups] = useState<number[]>([]);
  const [code, setCode] = useState<CountryCode>("NG");

  const handleSelectChange = (value: boolean) => {
    setShowInputs(value);
    setInputGroups(value ? [0] : []);
  };

  const addInputGroup = () => {
    setInputGroups([...inputGroups, inputGroups.length]);
  };

  const removeInputGroup = () => {
    setInputGroups(inputGroups.slice(0, -1));
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      const { isSupplier, ...fields } = values;

      if (isSupplier) {
        const newSupplier = convertObjectToSupplierArray(fields);
        setFormData({ ...formData, isSupplier, supplier: newSupplier });
      } else {
        setFormData({ ...formData, isSupplier, supplier: [] });
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error(
        "Please fill in correctly all required fields for each inventor"
      );
    }
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
        const { isSupplier, ...suppliers } = values;

        if (isSupplier) {
          const newInventor = convertObjectToSupplierArray(suppliers);
          localStorage.setItem(
            "formData",
            JSON.stringify({
              ...formData,
              isSupplier,
              supplier: newInventor,
            })
          );
        } else {
          localStorage.setItem(
            "formData",
            JSON.stringify({
              ...formData,
              isSupplier,
              supplier: [],
            })
          );
        }
        localStorage.setItem("currentStep", currentStep.toString());
        localStorage.setItem("totalSteps", mySteps.toString());
      }
      message.success("Your progress has been saved");
    } catch (error) {
      message.error("Please fill in all required fields");
    }
  };

  useEffect(() => {
    if (formData.isSupplier) {
      setShowInputs(formData.isSupplier);
    }
    if (formData.supplier && formData.supplier.length > 0) {
      const instanceCount = formData.supplier.length;
      setInputGroups(Array.from({ length: instanceCount }, (_, i) => i));
    }

    const prev = reverseArrayToSupplierObject(formData.supplier || []);
    form.setFieldsValue({ ...formData, ...prev });

    setCode(getCountryCode(formData?.innovation_country));
  }, [formData]);

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
            Do you have a Supplier?
          </h3>
          <Item
            name="isSupplier"
            rules={[{ required: true, message: "Please Select an Option" }]}
          >
            <Select
              size="large"
              onChange={(value) => handleSelectChange(value)}
              variant="filled"
            >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Item>
        </div>

        {showInputs && (
          <>
            <div>
              <h2 className="text-muted-foreground text-[14px] leading-[20px] mb-3">
                Please provide details below.
              </h2>
              {inputGroups.map((group, index) => (
                <div key={index}>
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                      Name
                    </h3>

                    <Item
                      className="w-full"
                      name={`supplier_${index + 1}_name`}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input
                        variant="filled"
                        placeholder="Please Enter Your Name"
                        size="large"
                      />
                    </Item>
                  </div>

                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                      Email
                    </h3>

                    <Item
                      className="w-full"
                      name={`supplier_${index + 1}_email`}
                      rules={[
                        { required: true, message: "Required" },
                        {
                          validator: validateEmail,
                          message: "Please enter a valid email address",
                        },
                      ]}
                    >
                      <Input
                        variant="filled"
                        placeholder="Please Enter Your Email"
                        size="large"
                      />
                    </Item>
                  </div>

                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                      Phone
                    </h3>

                    <Item
                      className="w-full"
                      name={`supplier_${index + 1}_contact`}
                      rules={[
                        // { required: true, message: "Required" },
                        {
                          validator: createValidatePhoneNumber(code),
                          message: "Please enter a valid phone number",
                        },
                      ]}
                    >
                      <Input
                        variant="filled"
                        placeholder="Please Enter Your Contact"
                        size="large"
                      />
                    </Item>
                  </div>

                  {index > 0 && (
                    <Button
                      type="dashed"
                      style={{ color: "red" }}
                      onClick={removeInputGroup}
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
                    onClick={addInputGroup}
                    icon={<PlusOutlined />}
                  >
                    Add Supplier
                  </Button>
                </Form.Item>
              </div>
            </div>
          </>
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

export default Step6;
