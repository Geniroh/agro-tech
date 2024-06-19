"use client";
import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, Upload, message } from "antd";
import { useFormContext } from "@/context/FormContext";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";

const { TextArea } = Input;

const { Option } = Select;
const { Item } = Form;

interface IMedia {
  uid: string;
  name: string;
  url: string;
  type?: string;
  size?: number;
}

interface IInstances {
  instance_description: string;
  instance_media: IMedia[];
}

const Step3: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const [selectValue, setSelectValue] = useState<boolean | null>(null);
  const [exampleInstances, setExampleInstances] = useState<IInstances[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectValue === true && exampleInstances.length === 0) {
      setExampleInstances([{ instance_description: "", instance_media: [] }]);
    } else if (selectValue === false) {
      setExampleInstances([]);
    } else if (selectValue === null && formData.isUsageExample !== undefined) {
      setSelectValue(formData.isUsageExample);
      setExampleInstances(formData.instances || []);
    }
  }, [selectValue]);

  const handleSelectChange = (value: boolean) => {
    setSelectValue(value);
    if (!value) {
      setExampleInstances([]);
    }
    setFormData({ ...formData, isUsageExample: value });
  };

  const addInstance = () => {
    setExampleInstances([
      ...exampleInstances,
      { instance_description: "", instance_media: [] },
    ]);
  };

  const removeInstance = (index: number) => {
    if (index === 0) return;
    setExampleInstances(exampleInstances.filter((_, i) => i !== index));
  };

  const handleInstanceChange = (
    index: number,
    field: keyof IInstances,
    value: any
  ) => {
    const updatedInstance = [...exampleInstances];
    if (field === "instance_description") {
      updatedInstance[index]["instance_description"] = value;
    } else if (field === "instance_media") {
      updatedInstance[index]["instance_media"] = value;
    }
    setExampleInstances(updatedInstance);
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      if (selectValue) {
        for (const instance of exampleInstances) {
          if (
            !instance.instance_description ||
            instance.instance_media.length === 0
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
      message.error("Please fill in all required fields for each instance");
    }
  };

  const saveData = (values: any) => {
    setFormData({ ...formData, ...values, instances: exampleInstances });
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
            instances: exampleInstances,
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

  const uploadFileProps = (index: number): UploadProps => ({
    name: "file",
    action: "/api/v1/upload",
    fileList: exampleInstances[index].instance_media.map((media) => ({
      uid: media.uid,
      name: media.name,
      status: "done",
      url: media.url,
      type: media.type,
      size: media.size,
    })),
    onChange(info) {
      const { status, response } = info.file;
      if (status === "uploading") {
        const updatedMedia = info.fileList.map((file) => ({
          uid: file.uid,
          name: file.name,
          url: file.url || "",
          type: file.type,
          size: file.size,
        }));
        handleInstanceChange(index, "instance_media", updatedMedia);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        const { url } = response;

        const uploadedFile: IMedia = {
          uid: info.file.uid,
          name: info.file.name,
          url,
          type: info.file.type,
          size: info.file.size,
        };

        const updatedMedia = [
          ...exampleInstances[index].instance_media,
          uploadedFile,
        ];
        handleInstanceChange(index, "instance_media", updatedMedia);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    onRemove(file) {
      const updatedMedia = exampleInstances[index].instance_media.filter(
        (media) => media.uid !== file.uid
      );
      handleInstanceChange(index, "instance_media", updatedMedia);
    },
  });

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
            <Select size="large" onChange={handleSelectChange}>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Item>
        </div>

        {selectValue && (
          <div>
            {exampleInstances.map((example, index) => (
              <div key={index}>
                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                    Instance Media Upload
                  </h3>

                  <Item
                    className="w-full"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Upload {...uploadFileProps(index)}>
                      <Button
                        icon={<UploadOutlined />}
                        className="w-full"
                        size="large"
                      >
                        Click to add images/videos of product
                      </Button>
                    </Upload>
                  </Item>
                </div>

                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                    Add very Brief Description
                  </h3>

                  <Item
                    className="w-full"
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <TextArea
                      value={example.instance_description}
                      placeholder="Please enter brief description to support image"
                      size="large"
                      onChange={(e) =>
                        handleInstanceChange(
                          index,
                          "instance_description",
                          e.target.value
                        )
                      }
                      required
                      rows={4}
                    />
                  </Item>
                </div>

                {index > 0 && (
                  <Button
                    type="dashed"
                    style={{ color: "red" }}
                    onClick={() => removeInstance(index)}
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
                  onClick={addInstance}
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

export default Step3;
