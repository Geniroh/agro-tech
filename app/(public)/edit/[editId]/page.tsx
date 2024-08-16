"use client";
import {
  MONTH_OPTIONS,
  PRODUCT_PHASE_OPTIONS,
  VALUE_CHAIN_OPTIONS,
} from "@/constants/options";
import { countriesData } from "@/data/country-region";
import axiosInstance from "@/utils/axiosInstance";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  generateCountryOptions,
  generateYearOptions,
  getCountryCurrency,
  getCurrencyOptions,
} from "@/utils/function";
import { Form, Input, Button, Select, message, Space } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import currencyToSymbolMap from "currency-symbol-map";
import { Progress } from "@/components/ui/progress";
import { RenderMediaUrl } from "@/components/general/render-media-url";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { StyledFileInput } from "@/components/general/upload-input";

const { TextArea } = Input;
const { Option } = Select;

const EditFormPage = () => {
  const params = useParams<{ editId: string }>();
  const [innovation, setInnovation] = useState<IInnovationType>();
  const router = useRouter();
  const { editId } = params;

  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState<string>("NGN");
  const [editSteps, setEditSteps] = useState<number>(1);
  const [mediaList, setMediaList] = useState<any>();
  const [showIsExample, setShowIsExample] = useState<boolean>(false);
  const [showIsInventor, setShowIsInventor] = useState<boolean>(false);
  const [showIsSupplier, setShowIsSupplier] = useState<boolean>(false);
  const [showIsInstruction, setShowIsInstruction] = useState<boolean>(false);
  const [showIsGuideline, setShowIsGuideline] = useState<boolean>(false);
  const [showIsGenderFriendly, setShowGenderFriendly] =
    useState<boolean>(false);
  const [productMediaEdit, setAllowProductMediaEdit] = useState<boolean>(false);
  const [canFill, setCanFill] = useState<boolean>(true);

  const [formData, setFormData] = useState<any>({});

  console.log({ formData });
  const [mediaFiles, setMediaFiles] = useState<any[]>(
    formData.product_media || []
  );

  const checkRequest = async (id: string) => {
    const { data } = await axiosInstance.get(`/edit/${id}`);
    return data;
  };

  const { data, isLoading } = useQuery(
    ["get-all-request-info", editId],
    () => checkRequest(editId),
    {
      enabled: !!editId,
      onError: (error) => {
        console.log(error);
        setCanFill(false);
      },
      onSuccess: (data: IInnovationType) => {
        form.setFieldsValue(data);
        setInnovation(data);
        setMediaList(data?.productMedia);
        setShowIsExample(data?.isExample);
        setShowIsInstruction(data?.isInstruction);
        setShowIsInventor(data?.isInventor);
        setShowIsSupplier(data?.isSupplier);
        setShowIsGuideline(data?.isHSEGuidelines);
        setShowGenderFriendly(data?.isGenderFriendly || false);
      },
    }
  );

  const handleCountrySelect = (value: string) => {
    const code = getCountryCurrency(value);
    setCountryCode(code);
  };

  const updateInnovation = async (values: any) => {
    if (innovation) {
      const { data } = await axiosInstance.patch(
        `/innovation/${innovation.id}`,
        values
      );
      return data;
    } else {
      message.error("No Innovation found");
    }
  };

  const { mutateAsync, isLoading: isSubmitting } = useMutation(
    updateInnovation,
    {
      onSuccess: () => {
        message.success("Edited");
        router.push("/");
      },
      onError: (error: any) => {
        console.error("Failed to update:", error);
        message.error("Failed to edit");
      },
    }
  );

  const onFinish = (values: any) => {
    const payload = {
      ...formData,
      cost: Number(formData?.cost),
    };
    mutateAsync(payload);
  };

  const prevStep = () => {
    if (editSteps > 0) {
      setEditSteps(editSteps - 1);
    }
  };

  const handleNext = () => {
    form.validateFields().then((values) => {
      setFormData({ ...formData, ...values });
      setEditSteps(editSteps + 1);
    });
  };

  const handleFileChange = (
    fileDataArray: {
      url: string | null;
      name: string | null;
      size: number | null;
      type: string | null;
    }[]
  ) => {
    const fileList = [...fileDataArray, ...mediaFiles];

    if (fileDataArray.some((file) => file.url === null)) {
    } else {
      message.success("Files uploaded successfully.");
      setMediaFiles(fileList);
      setAllowProductMediaEdit(false);
      setFormData({ ...formData, productMedia: fileList });
    }
  };

  return (
    <div className="container pb-20">
      <h1 className="w-full text-center text-2xl md:text-4xl font-playfair font-semibold mt-[50px]">
        Edit Innovation
      </h1>
      <h3 className="text-muted-foreground text-md w-full text-center my-3 mb-5">
        Fill out this form accurately and concisely, and note all edit will
        still be subject to approval.
      </h3>

      <div className="max-w-[600px] mx-auto">
        <Progress value={(editSteps / 7) * 100} className="mb-3" />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={data}
        >
          {editSteps === 1 && (
            <>
              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Innovation Name
                </h3>
                <Form.Item name="productName">
                  <Input
                    variant="filled"
                    size="large"
                    placeholder="Enter innovation name"
                  />
                </Form.Item>
              </div>

              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Year Invented
                </h3>
                <Form.Item name="yearInvented">
                  <Select
                    showSearch
                    placeholder="Select Innovation Year"
                    optionFilterProp="label"
                    className="w-full"
                    variant="filled"
                    size="large"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={generateYearOptions()}
                  />
                </Form.Item>
              </div>

              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Month
                </h3>
                <Form.Item name="month">
                  <Select
                    placeholder="Select Innovation Month"
                    className="w-full"
                    size="large"
                    options={MONTH_OPTIONS}
                    variant="filled"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                  />
                </Form.Item>
              </div>

              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Country
                </h3>
                <Form.Item name="country">
                  <Select
                    showSearch
                    placeholder="Select Innovation Year"
                    optionFilterProp="label"
                    className="w-full"
                    variant="filled"
                    size="large"
                    onChange={handleCountrySelect}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={generateCountryOptions(countriesData)}
                  />
                </Form.Item>
              </div>

              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Cost
                </h3>

                <div className="w-full flex">
                  <Space className="w-full">
                    <Form.Item name="cost">
                      <Input
                        size="large"
                        type="number"
                        variant="filled"
                        placeholder="How much does this innovation cost"
                        className="w-full block"
                        addonBefore={
                          <span className="font-bold">
                            {currencyToSymbolMap(
                              innovation?.currency || countryCode
                            )}
                          </span>
                        }
                      />
                    </Form.Item>
                  </Space>
                </div>
              </div>

              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Value Chains
                </h3>
                <Form.Item name="productChain">
                  <Select
                    mode="tags"
                    size="large"
                    className="w-full"
                    variant="filled"
                    placeholder="Select a Value Chain"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={VALUE_CHAIN_OPTIONS}
                  />
                </Form.Item>
              </div>

              <Button
                onClick={handleNext}
                size="large"
                className="w-full bg-secondary text-white"
                disabled={!canFill || isLoading}
              >
                Next
              </Button>
            </>
          )}

          {editSteps === 2 && (
            <>
              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Implementation Phase
                </h3>
                <Form.Item name="productPhase">
                  <Select
                    showSearch
                    placeholder="Select Implementation Phase"
                    variant="filled"
                    className="w-full"
                    size="large"
                    options={PRODUCT_PHASE_OPTIONS}
                  />
                </Form.Item>
              </div>

              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Product Use
                </h3>
                <Form.Item name="productUse">
                  <Input variant="filled" size="large" />
                </Form.Item>
              </div>

              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  About Product
                </h3>
                <Form.Item name="productDescription">
                  <TextArea rows={4} variant="filled" size="large" />
                </Form.Item>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[16px] leading-[24px] font-semibold">
                    Product Media
                  </h3>
                  <span
                    className="text-mygreen cursor-pointer"
                    onClick={() => setAllowProductMediaEdit(!productMediaEdit)}
                  >
                    {!productMediaEdit ? "Edit Media" : "View Media"}
                  </span>
                </div>

                {!productMediaEdit ? (
                  <div className="py-5 rounded-md border border-[#F5F5F5] w-full flex gap-3 flex-wrap items-center px-5 mb-3">
                    {formData?.productMedia ? (
                      <>
                        {formData?.productMedia?.map((item: any, i: number) => (
                          <RenderMediaUrl
                            url={item.url}
                            className="w-[48px] h-[48px]"
                            key={i}
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        {innovation &&
                          innovation?.productMedia?.map((item, i) => (
                            <RenderMediaUrl
                              url={item.url}
                              className="w-[48px] h-[48px]"
                              key={i}
                            />
                          ))}
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <Form.Item name="productMedia">
                      <StyledFileInput
                        id={"product_media"}
                        name={"productMedia"}
                        placeholder="Click to add images/videos of product"
                        defaultValue=""
                        onChange={handleFileChange}
                      />
                    </Form.Item>
                  </>
                )}
              </div>

              <div className="space-y-4 mt-5">
                <Button onClick={prevStep} size="large" className="w-full ">
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  size="large"
                  type="primary"
                  className="w-full"
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {editSteps === 3 && (
            <>
              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Do you have User Instructions ?
                </h3>
                <Form.Item name="isInstruction">
                  <Select
                    size="large"
                    variant="filled"
                    onChange={(value) => {
                      setShowIsInstruction(value);
                    }}
                  >
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </div>

              {showIsInstruction && (
                <Form.List
                  name="productInstruction"
                  initialValue={innovation?.productInstruction}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <Form.Item
                            {...field}
                            label={
                              <h3 className="text-[16px] leading-[24px] font-semibold">
                                {`Instruction Step ${index + 1}`}
                              </h3>
                            }
                            name={[field.name, "instruction_step"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input the instruction step",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter instruction step"
                              variant="filled"
                              size="large"
                            />
                          </Form.Item>

                          <div className="w-full flex justify-end">
                            <Button
                              type="dashed"
                              style={{ color: "red" }}
                              onClick={() => remove(field.name)}
                              icon={<DeleteOutlined />}
                            />
                          </div>
                        </div>
                      ))}

                      <Form.Item>
                        <Button
                          type="text"
                          block
                          style={{ color: "#329632" }}
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add Instruction
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              )}

              <div className="space-y-4 mt-5">
                <Button
                  onClick={prevStep}
                  size="large"
                  className="w-full bg-secondary text-white"
                >
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  size="large"
                  type="primary"
                  className="w-full bg-secondary text-white"
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {editSteps === 4 && (
            <>
              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Are you an Inventor on this Product?
                </h3>
                <Form.Item name="isInventor">
                  <Select
                    size="large"
                    variant="filled"
                    onChange={(value) => setShowIsInventor(value)}
                  >
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </div>

              {showIsInventor && (
                <Form.List
                  name="productInventor"
                  initialValue={innovation?.productInventor}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <Form.Item
                            {...field}
                            label={
                              <h3 className="text-[16px] leading-[24px] font-semibold">
                                {`Inventor Name ${index + 1}`}
                              </h3>
                            }
                            name={[field.name, "inventor_name"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input inventor name",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter inventor name"
                              variant="filled"
                              size="large"
                            />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            label={
                              <h3 className="text-[16px] leading-[24px] font-semibold">
                                {`Inventor Contact ${index + 1}`}
                              </h3>
                            }
                            name={[field.name, "inventor_contact"]}
                          >
                            <Input
                              placeholder="Enter inventor contact"
                              variant="filled"
                              size="large"
                            />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            label={
                              <h3 className="text-[16px] leading-[24px] font-semibold">
                                {`Inventor Email ${index + 1}`}
                              </h3>
                            }
                            name={[field.name, "inventor_email"]}
                            rules={[
                              {
                                type: "email",
                                message: "Please input a valid email",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter inventor email"
                              variant="filled"
                              size="large"
                            />
                          </Form.Item>

                          <div className="w-full flex justify-end">
                            <Button
                              type="dashed"
                              style={{ color: "red" }}
                              onClick={() => remove(field.name)}
                              icon={<DeleteOutlined />}
                            />
                          </div>
                        </div>
                      ))}

                      <Form.Item>
                        <Button
                          type="text"
                          block
                          style={{ color: "#329632" }}
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add Inventor
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              )}

              <div className="space-y-4 mt-5">
                <Button
                  onClick={prevStep}
                  size="large"
                  className="w-full bg-secondary text-white"
                >
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  size="large"
                  type="primary"
                  className="w-full bg-secondary text-white"
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {editSteps === 5 && (
            <>
              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Do you have a Supplier?
                </h3>
                <Form.Item name="isSupplier">
                  <Select
                    size="large"
                    variant="filled"
                    onChange={(value) => setShowIsSupplier(value)}
                  >
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </div>

              {showIsSupplier && (
                <Form.List
                  name="productSupplier"
                  initialValue={innovation?.productSupplier}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <Form.Item
                            {...field}
                            label={
                              <h3 className="text-[16px] leading-[24px] font-semibold">
                                {`Supplier Name ${index + 1}`}
                              </h3>
                            }
                            name={[field.name, "supplier_name"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input supplier name",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter supplier name"
                              variant="filled"
                              size="large"
                            />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            label={
                              <h3 className="text-[16px] leading-[24px] font-semibold">
                                {`Supplier Contact ${index + 1}`}
                              </h3>
                            }
                            name={[field.name, "supplier_contact"]}
                          >
                            <Input
                              placeholder="Enter supplier contact"
                              variant="filled"
                              size="large"
                            />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            label={
                              <h3 className="text-[16px] leading-[24px] font-semibold">
                                {`Supplier Email ${index + 1}`}
                              </h3>
                            }
                            name={[field.name, "supplier_email"]}
                            rules={[
                              {
                                type: "email",
                                message: "Please input a valid email",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter supplier email"
                              variant="filled"
                              size="large"
                            />
                          </Form.Item>

                          <div className="w-full flex justify-end">
                            <Button
                              type="dashed"
                              style={{ color: "red" }}
                              onClick={() => remove(field.name)}
                              icon={<DeleteOutlined />}
                            />
                          </div>
                        </div>
                      ))}

                      <Form.Item>
                        <Button
                          type="text"
                          block
                          style={{ color: "#329632" }}
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add Supplier
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              )}

              <div className="space-y-4 mt-5">
                <Button
                  onClick={prevStep}
                  size="large"
                  className="w-full bg-secondary text-white"
                >
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  size="large"
                  type="primary"
                  className="w-full bg-secondary text-white"
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {editSteps === 6 && (
            <>
              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Does this product Have HSE Guidelines?
                </h3>
                <Form.Item name="isHSEGuidelines">
                  <Select
                    size="large"
                    variant="filled"
                    onChange={(value) => {
                      setShowIsGuideline(value);
                    }}
                  >
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </div>

              {showIsGuideline && (
                <Form.List
                  name="productGuidelines"
                  initialValue={innovation?.productGuidelines}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <Form.Item
                            {...field}
                            label={
                              <h3 className="text-[16px] leading-[24px] font-semibold">
                                {`${index + 1}`}
                              </h3>
                            }
                            name={[field.name, "name"]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter guideline",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter guideline"
                              variant="filled"
                              size="large"
                            />
                          </Form.Item>

                          <div className="w-full flex justify-end">
                            <Button
                              type="dashed"
                              style={{ color: "red" }}
                              onClick={() => remove(field.name)}
                              icon={<DeleteOutlined />}
                            />
                          </div>
                        </div>
                      ))}

                      <Form.Item>
                        <Button
                          type="text"
                          block
                          style={{ color: "#329632" }}
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add Guideline
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              )}

              <div className="space-y-4 mt-5">
                <Button
                  onClick={prevStep}
                  size="large"
                  className="w-full bg-secondary text-white"
                >
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  size="large"
                  type="primary"
                  className="w-full bg-secondary text-white"
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {editSteps === 7 && (
            <>
              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Is this product gender friendly ?
                </h3>

                <Form.Item name="isGenderFriendly" label="Is Gender Friendly">
                  <Select
                    variant="filled"
                    size="large"
                    onChange={(value) => setShowGenderFriendly(value)}
                  >
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </div>

              {showIsGenderFriendly && (
                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                    Briefly describe how this technology is inclusive of the
                    female gender.
                  </h3>

                  <Form.Item name="productGenderDescription">
                    <TextArea rows={4} variant="filled" size="large" />
                  </Form.Item>
                </div>
              )}

              <div className="space-y-4 mt-5">
                <Button
                  onClick={prevStep}
                  size="large"
                  className="w-full bg-secondary text-white"
                >
                  Previous
                </Button>

                <Button
                  onClick={form.submit}
                  size="large"
                  type="primary"
                  className="w-full bg-primary text-white"
                  disabled={isSubmitting || isLoading || !canFill}
                  loading={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default EditFormPage;
