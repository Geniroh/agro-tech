"use client";
import React, { useEffect, useState } from "react";
import { useFormContext } from "@/context/FormContext";
import { Input, Form, Select, Button, message } from "antd";
import { toast } from "sonner";
import { StyledFileInput } from "@/components/general/upload-input";
import { PRODUCT_PHASE_OPTIONS } from "@/constants/options";
import { MdDeleteOutline } from "react-icons/md";

const { Item } = Form;
const { TextArea } = Input;

const Step2: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const [mediaFiles, setMediaFiles] = useState<any[]>(
    formData.product_media || []
  );

  const [form] = Form.useForm();

  const clearMedia = () => {
    setFormData({ ...formData, product_media: [] });
    setMediaFiles([]);
  };

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleFileChange = (
    fileDataArray: {
      url: string | null;
      name: string | null;
      size: number | null;
      type: string | null;
    }[]
  ) => {
    const fileList = [...fileDataArray, ...mediaFiles];
    setMediaFiles(fileList);
    if (fileDataArray.some((file) => file.url === null)) {
      message.error("Some files failed to upload.");
    } else {
      message.success("Files uploaded successfully.");
      setFormData({ ...formData, product_media: fileList });
    }
  };

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
            variant="filled"
            className="w-full"
            size="large"
            options={PRODUCT_PHASE_OPTIONS}
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
          <Input
            size="large"
            placeholder="Please Enter Product Use"
            variant="filled"
          />
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
            variant="filled"
            size="large"
            rows={4}
          />
        </Item>
      </div>

      <div>
        <div className="w-full items-center justify-between flex">
          <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
            Product Media
          </h3>
          {/* <span className="text-mygreen cursor-pointer">Use links?</span> */}
        </div>
        <Item
          name="product_media"
          rules={[{ required: true, message: "Please upload a file" }]}
        >
          <StyledFileInput
            id={"product_media"}
            name={"product_media"}
            placeholder="Click to add images/videos of product"
            defaultValue={formData.product_media}
            onChange={handleFileChange}
          />
        </Item>
        <div className="flex justify-between">
          <div className="text-[10px] text-muted-foreground flex gap-x-2 items-center flex-wrap">
            <span className="text-[12px] text-[#000]">Media:</span>
            {mediaFiles.map((file, i) => (
              <span key={i}>{file.name}</span>
            ))}
          </div>
          <div>
            <MdDeleteOutline
              className="text-destructive text-[14px] cursor-pointer"
              onClick={clearMedia}
            />
          </div>
        </div>
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
