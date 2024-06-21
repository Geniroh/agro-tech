"use client";
import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, message } from "antd";
import { useFormContext } from "@/context/FormContext";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { StyledFileInput } from "../general/upload-input";
import {
  formatInstanceData,
  reverseFormatInstanceData,
} from "@/utils/multi-step";

const { TextArea } = Input;
const { Option } = Select;
const { Item } = Form;

const Step3: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const [form] = Form.useForm();
  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [inputGroups, setInputGroups] = useState<number[]>([]);

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
      const { isUsageExample, ...instances } = values;

      if (isUsageExample) {
        const newInstance = formatInstanceData(instances);
        setFormData({ ...formData, isUsageExample, instances: newInstance });
      } else {
        setFormData({ ...formData, isUsageExample, instances: [] });
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error("Please fill in all required fields for each instance");
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
        const { isUsageExample, ...instances } = values;

        if (isUsageExample) {
          const newInstance = formatInstanceData(instances);
          localStorage.setItem(
            "formData",
            JSON.stringify({
              ...formData,
              isUsageExample,
              instances: newInstance,
            })
          );
        } else {
          localStorage.setItem(
            "formData",
            JSON.stringify({
              ...formData,
              isUsageExample,
              instances: [],
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

  const handleFileChange = (
    fileDataArray: {
      url: string | null;
      name: string | null;
      size: number | null;
      type: string | null;
    }[]
  ) => {
    if (fileDataArray.some((file) => file.url === null)) {
      message.error("Some files failed to upload.");
    } else {
      message.success("Files uploaded successfully.");
    }
  };

  useEffect(() => {
    if (formData.isUsageExample) {
      setShowInputs(formData.isUsageExample);
    }
    if (formData.instances && formData.instances.length > 0) {
      const instanceCount = formData.instances.length;
      setInputGroups(Array.from({ length: instanceCount }, (_, i) => i));
    }

    const prev = reverseFormatInstanceData(formData.instances || []);
    form.setFieldsValue({ ...formData, ...prev });
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
            Do you have Usage Example to Show?
          </h3>
          <Item
            name="isUsageExample"
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
              {inputGroups.map((group, index) => (
                <div key={index}>
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                      Instance Media Upload
                    </h3>

                    <Item
                      className="w-full"
                      name={`instance_${index + 1}_media`}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <StyledFileInput
                        id={`instance_${index + 1}_media`}
                        name={`instance_${index + 1}_media`}
                        max={1}
                        defaultValue={
                          formData.instances && formData.instances
                            ? formData.instances[index].instance_media
                            : undefined
                        }
                        placeholder="Click to add images/videos of product"
                        onChange={handleFileChange}
                      />
                    </Item>
                  </div>

                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                      Add very Brief Description
                    </h3>

                    <Item
                      className="w-full"
                      name={`instance_${index + 1}_description`}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <TextArea
                        placeholder="Please enter brief description to support image"
                        size="large"
                        variant="filled"
                        rows={4}
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
                    Add Instance
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

export default Step3;
