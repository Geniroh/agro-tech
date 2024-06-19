"use client";
import React, { useState, useEffect } from "react";
import { useFormContext } from "@/context/FormContext";
import { Input, Form, Select, Button, Upload } from "antd";
import { toast } from "sonner";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Item } = Form;
const { TextArea } = Input;

const Step2: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>(
    formData.product_media ? [formData.product_media] : []
  );

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const uploadFileProps: UploadProps = {
    name: "file",
    action: "/api/v1/upload",
    fileList: fileList,
    onChange(info) {
      const { status, name, response } = info.file;
      if (status === "uploading") {
        setFileList(info.fileList);
      }
      if (status === "done") {
        toast.success(`${info.file.name} file uploaded successfully`);
        const { url } = info.file.response;

        const uploadedFile = {
          name: info.file.name,
          url,
          type: info.file.type,
          size: info.file.size,
        };
        setFileList([uploadedFile]);
        form.setFieldsValue({ product_media: uploadedFile });
        setFormData({ ...formData, product_media: uploadedFile });
      } else if (info.file.status === "error") {
        toast.error(`${info.file.name} file upload failed.`);
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
      setFileList([]);
      setFormData({ ...formData, product_media: null });
    },
  };

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      saveData(values);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      toast.error("Please fill in all required fields");
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
      toast.success("Your progress has been saved");
    } catch (error) {
      toast.error("Please fill in all required fields");
    }
  };

  const implementationPhaseOptions = [
    { value: "Testing", label: "Testing" },
    { value: "Distribution", label: "Distribution" },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      className="space-y-4"
      initialValues={{ ...formData }}
    >
      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
          Implementation Phase
        </h3>
        <Item
          name="innovation_phase"
          rules={[
            { required: true, message: "Please select an Innovation Phase" },
          ]}
        >
          <Select
            showSearch
            placeholder="Select Implementation Phase"
            className="w-full"
            size="large"
            options={implementationPhaseOptions}
          />
        </Item>
      </div>

      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
          Product Usage
        </h3>
        <Item
          name="product_usage"
          rules={[
            { required: true, message: "Please Enter Product Description" },
          ]}
        >
          <Input size="large" placeholder="Please Enter Product Use" />
        </Item>
      </div>

      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
          Product Description
        </h3>
        <Item
          name="product_description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <TextArea
            placeholder="Please Enter A Brief Description Of Product"
            className="bg-[#fafafa]"
            size="large"
            rows={4}
          />
        </Item>
      </div>

      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
          Product Media
        </h3>
        <Item
          name="product_media"
          rules={[{ required: true, message: "Please upload a file" }]}
        >
          <Upload {...uploadFileProps}>
            <Button icon={<UploadOutlined />} className="w-full">
              Click to add images/videos of product
            </Button>
          </Upload>
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

export default Step2;
