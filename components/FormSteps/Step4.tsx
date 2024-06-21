"use client";
import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, message } from "antd";
import { useFormContext } from "@/context/FormContext";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Item } = Form;

interface IInstructionStep {
  instruction_step: string;
}

const Step4: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const [form] = Form.useForm();
  const [selectValue, setSelectValue] = useState<boolean | null>(
    formData.isInstruction ?? null
  );
  const [stepInstructions, setStepInstructions] = useState<IInstructionStep[]>(
    formData.instructions || []
  );

  useEffect(() => {
    if (selectValue === true && stepInstructions.length === 0) {
      setStepInstructions([{ instruction_step: "" }]);
    } else if (selectValue === false) {
      setStepInstructions([]);
    }
  }, [selectValue]);

  const handleSelectChange = (value: boolean) => {
    setSelectValue(value);
    if (!value) {
      setStepInstructions([]);
    }
    setFormData({ ...formData, isInstruction: value });
  };

  const addInstruction = () => {
    setStepInstructions([...stepInstructions, { instruction_step: "" }]);
  };

  const removeInstruction = (index: number) => {
    if (index === 0) return;
    setStepInstructions(stepInstructions.filter((_, i) => i !== index));
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...stepInstructions];
    updatedInstructions[index].instruction_step = value;
    setStepInstructions(updatedInstructions);
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      if (selectValue) {
        for (const instruction of stepInstructions) {
          if (!instruction.instruction_step) {
            throw new Error("Please fill in all required fields for each step");
          }
        }
      }
      saveData(values);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error("Please fill in all required fields for each step");
    }
  };

  const saveData = (values: any) => {
    setFormData({ ...formData, ...values, instructions: stepInstructions });
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
          JSON.stringify({
            ...formData,
            ...values,
            instructions: stepInstructions,
          })
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
            Do you have User Instructions ?
          </h3>
          <Item
            name="isInstruction"
            rules={[{ required: true, message: "Please Select an Option" }]}
          >
            <Select
              size="large"
              value={selectValue}
              onChange={handleSelectChange}
              variant="filled"
            >
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Item>
        </div>

        {selectValue && (
          <div>
            <h2 className="text-muted-foreground text-[14px] leading-[20px] mb-3">
              Please provide the Instructions in steps.
            </h2>
            {stepInstructions.map((instruction, index) => (
              <div key={index}>
                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                    Step {index + 1}
                  </h3>
                  <Item
                    className="w-full"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input
                      value={instruction.instruction_step}
                      placeholder="Please Enter Info"
                      size="large"
                      variant="filled"
                      onChange={(e) =>
                        handleInstructionChange(index, e.target.value)
                      }
                      required
                    />
                  </Item>
                </div>
                {index > 0 && (
                  <Button
                    type="dashed"
                    style={{ color: "red" }}
                    onClick={() => removeInstruction(index)}
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
                  onClick={addInstruction}
                  icon={<PlusOutlined />}
                >
                  Add Instruction
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

export default Step4;
