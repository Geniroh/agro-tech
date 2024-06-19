"use client";
import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, Upload, message } from "antd";
import { useFormContext } from "@/context/FormContext";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { validateEmail, validatePhoneNumber } from "@/utils/function";

const { TextArea } = Input;

const { Option } = Select;
const { Item } = Form;

interface IISupplier {
  supplier_email: string;
  supplier_name: string;
  supplier_contact: string;
}

const Step6: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const [selectValue, setSelectValue] = useState<boolean | null>(null);
  const [suppliers, setSuppliers] = useState<IISupplier[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectValue === true && suppliers.length === 0) {
      setSuppliers([
        { supplier_contact: "", supplier_email: "", supplier_name: "" },
      ]);
    } else if (selectValue === false) {
      setSuppliers([]);
    } else if (selectValue === null && formData.isSupplier !== undefined) {
      setSelectValue(formData.isSupplier);
      setSuppliers(formData.supplier || []);
    }
  }, [selectValue]);

  const handleSelectChange = (value: boolean) => {
    setSelectValue(value);
    if (!value) {
      setSuppliers([]);
    }
    setFormData({ ...formData, isSupplier: value });
  };

  const addSupplier = () => {
    setSuppliers([
      ...suppliers,
      { supplier_contact: "", supplier_email: "", supplier_name: "" },
    ]);
  };

  const removeSupplier = (index: number) => {
    if (index === 0) return;
    setSuppliers(suppliers.filter((_, i) => i !== index));
  };

  const handleSupplierChange = (
    index: number,
    field: keyof IISupplier,
    value: any
  ) => {
    const updatedInstance = [...suppliers];
    updatedInstance[index][field] = value;
    setSuppliers(updatedInstance);
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      if (selectValue) {
        for (const supplier of suppliers) {
          if (
            !supplier.supplier_contact ||
            !supplier.supplier_email ||
            !supplier.supplier_name
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
      message.error("Please fill in all required fields for each supplier");
    }
  };

  const saveData = (values: any) => {
    setFormData({ ...formData, ...values, supplier: suppliers });
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
          JSON.stringify({ ...formData, ...values, supplier: suppliers })
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
            Do you have a supplier?
          </h3>
          <Item
            name="isSupplier"
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
              Please provide details below.
            </h2>
            {suppliers.map((supplier, index) => (
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
                      value={supplier.supplier_name}
                      placeholder="Please Enter Your Name"
                      size="large"
                      onChange={(e) =>
                        handleSupplierChange(
                          index,
                          "supplier_name",
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
                      value={supplier.supplier_email}
                      placeholder="Please Enter Your Email"
                      type="email"
                      size="large"
                      onChange={(e) =>
                        handleSupplierChange(
                          index,
                          "supplier_email",
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
                      value={supplier.supplier_contact}
                      placeholder="Please Enter Your Contact"
                      suffix="Nigeria"
                      prefix="234"
                      size="large"
                      onChange={(e) =>
                        handleSupplierChange(
                          index,
                          "supplier_contact",
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
                    onClick={() => removeSupplier(index)}
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
                  onClick={addSupplier}
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

export default Step6;
