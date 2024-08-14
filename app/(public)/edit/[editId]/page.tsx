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
  countryCodeToShortCode,
  generateCountryOptions,
  generateYearOptions,
  getCountryCurrency,
  getCurrencyOptions,
} from "@/utils/function";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  message,
  Upload,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import currencyToSymbolMap from "currency-symbol-map";
import { Progress } from "@/components/ui/progress";
import { RenderMedia } from "@/components/general/render-media";
import { UploadOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import { RenderMediaUrl } from "@/components/general/render-media-url";
import "/node_modules/flag-icons/css/flag-icons.min.css";

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
      },
      onSuccess: (data: IInnovationType) => {
        console.log({ data });
        form.setFieldsValue(data);
        setInnovation(data);
        setMediaList(data?.productMedia);
        setShowIsExample(data?.isExample);
        setShowIsInstruction(data?.isInventor);
        setShowIsInventor(data?.isInventor);
        setShowIsSupplier(data?.isSupplier);
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

  const handleChange = (info: any) => {
    console.log(info.fileList);
    setMediaList(info.fileList);
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
    console.log({ values });
    // mutateAsync(values);
  };

  const prevStep = () => {
    if (editSteps > 0) {
      setEditSteps(editSteps - 1);
    }
  };

  const handleNext = () => {
    setEditSteps(editSteps + 1);
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
        <Progress value={(editSteps / 3) * 100} className="mb-3" />
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
                  <Input variant="filled" size="large" />
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

              {/* <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Product Media
                </h3>

                <div className="py-5 rounded-md border border-[#F5F5F5] w-full flex gap-3 flex-wrap items-center px-5 mb-3">
                  {innovation &&
                    innovation?.productMedia?.map((item, i) => (
                      <RenderMediaUrl
                        url={item.url}
                        className="w-[48px] h-[48px]"
                        key={i}
                      />
                    ))}
                </div>
              </div> */}

              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Product Description
                </h3>
                <Form.Item name="productDescription">
                  <TextArea rows={4} variant="filled" size="large" />
                </Form.Item>
              </div>

              <Button
                type="default"
                block
                className="w-full mb-3 mt-8"
                size="large"
                onClick={handleNext}
              >
                Next
              </Button>
              {/* <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Is this product gender friendly ?
                </h3>

                <Form.Item name="isGenderFriendly" label="Is Gender Friendly">
                  <Select variant="filled" size="large">
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </div>

              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Briefly describe how this technology is inclusive of the
                  female gender.
                </h3>

                <Form.Item name="productGenderDescription">
                  <TextArea rows={4} variant="filled" size="large" />
                </Form.Item>
              </div> */}
            </>
          )}

          {editSteps === 2 && (
            <>
              <div>
                <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
                  Do you have Usage Example to Show?
                </h3>
                <Form.Item name="isInstruction">
                  <Select
                    size="large"
                    variant="filled"
                    onChange={(value) => {
                      setShowIsExample(value);
                    }}
                  >
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </div>

              {showIsExample && (
                <Form.List
                  name="instructions"
                  initialValue={innovation?.productInstruction}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <Form.Item
                            {...field}
                            label={
                              <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
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
                            <Input placeholder="Enter instruction step" />
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

              <div className="space-y-4 mb-3 mt-8">
                <Button
                  type="text"
                  block
                  className="w-full"
                  size="large"
                  onClick={prevStep}
                >
                  Previous
                </Button>

                <Button
                  type="default"
                  block
                  className="w-full"
                  size="large"
                  onClick={handleNext}
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
              {/* 
              {innovation &&
                innovation.productInventor.map((inventor, index) => (
                  <div key={index}>
                    <Form.Item
                      label={`Inventor Name ${index + 1}`}
                      name={`inventor_name_${index}`}
                      initialValue={inventor.inventor_name}
                      rules={[
                        {
                          required: true,
                          message: "Please input inventor name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter inventor name" />
                    </Form.Item>

                    <Form.Item
                      label={`Inventor Contact ${index + 1}`}
                      name={`inventor_contact_${index}`}
                      initialValue={inventor.inventor_contact}
                      rules={[
                        {
                          required: true,
                          message: "Please input inventor contact",
                        },
                      ]}
                    >
                      <Input placeholder="Enter inventor contact" />
                    </Form.Item>

                    <Form.Item
                      label={`Inventor Email ${index + 1}`}
                      name={`inventor_email_${index}`}
                      initialValue={inventor.inventor_email}
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please input a valid email",
                        },
                      ]}
                    >
                      <Input placeholder="Enter inventor email" />
                    </Form.Item>
                  </div>
                ))} */}

              {showIsInventor && (
                <Form.List
                  name="inventors"
                  initialValue={innovation?.productInventor}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <Form.Item
                            {...field}
                            label={`Inventor Name ${index + 1}`}
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
                            label={`Inventor Contact ${index + 1}`}
                            name={[field.name, "inventor_contact"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input inventor contact",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter inventor contact"
                              variant="filled"
                              size="large"
                            />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            label={`Inventor Email ${index + 1}`}
                            name={[field.name, "inventor_email"]}
                            rules={[
                              {
                                required: true,
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

                          {/* <Button
                          type="dashed"
                          onClick={() => remove(field.name)}
                          block
                        >
                          <DeleteOutlined />
                        </Button> */}
                        </div>
                      ))}
                      {/* 
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block>
                        Add Inventor
                      </Button>
                    </Form.Item> */}

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

              <div className="space-y-4">
                <Button
                  type="default"
                  block
                  className="w-full mb-3"
                  size="large"
                  onClick={prevStep}
                >
                  Previous
                </Button>

                <Button
                  type="default"
                  block
                  className="w-full mb-3"
                  size="large"
                  onClick={handleNext}
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
              {/* 
              {innovation &&
                innovation.productInventor.map((inventor, index) => (
                  <div key={index}>
                    <Form.Item
                      label={`Inventor Name ${index + 1}`}
                      name={`inventor_name_${index}`}
                      initialValue={inventor.inventor_name}
                      rules={[
                        {
                          required: true,
                          message: "Please input inventor name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter inventor name" />
                    </Form.Item>

                    <Form.Item
                      label={`Inventor Contact ${index + 1}`}
                      name={`inventor_contact_${index}`}
                      initialValue={inventor.inventor_contact}
                      rules={[
                        {
                          required: true,
                          message: "Please input inventor contact",
                        },
                      ]}
                    >
                      <Input placeholder="Enter inventor contact" />
                    </Form.Item>

                    <Form.Item
                      label={`Inventor Email ${index + 1}`}
                      name={`inventor_email_${index}`}
                      initialValue={inventor.inventor_email}
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Please input a valid email",
                        },
                      ]}
                    >
                      <Input placeholder="Enter inventor email" />
                    </Form.Item>
                  </div>
                ))} */}

              {showIsSupplier && (
                <Form.List
                  name="inventors"
                  initialValue={innovation?.productSupplier}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <Form.Item
                            {...field}
                            label={`Inventor Name ${index + 1}`}
                            name={[field.name, "supplier_name"]}
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
                            label={`Inventor Contact ${index + 1}`}
                            name={[field.name, "supplier_contact"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input inventor contact",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter inventor contact"
                              variant="filled"
                              size="large"
                            />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            label={`Inventor Email ${index + 1}`}
                            name={[field.name, "supplier_email"]}
                            rules={[
                              {
                                required: true,
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
                          Add Supplier
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              )}

              <div className="space-y-4">
                <Button
                  type="default"
                  block
                  className="w-full mb-3"
                  size="large"
                  onClick={prevStep}
                >
                  Previous
                </Button>

                <Button
                  type="default"
                  block
                  className="w-full mb-3"
                  size="large"
                  onClick={handleNext}
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
                  Does this product Have HSE Guidelines?
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

              {showIsExample && (
                <Form.List
                  name="instructions"
                  initialValue={innovation?.productInstruction}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <div key={field.key}>
                          <Form.Item
                            {...field}
                            label={
                              <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
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
                            <Input placeholder="Enter instruction step" />
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

              <div className="space-y-4 mb-3 mt-8">
                <Button
                  type="text"
                  block
                  className="w-full"
                  size="large"
                  onClick={prevStep}
                >
                  Previous
                </Button>

                <Button
                  type="default"
                  block
                  className="w-full"
                  size="large"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            </>
          )}

          <div className="space-y-4">
            <Form.Item>
              <Button
                type="primary"
                block
                className="w-full"
                size="large"
                htmlType="submit"
                disabled={isSubmitting || isLoading}
                loading={isSubmitting}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditFormPage;
