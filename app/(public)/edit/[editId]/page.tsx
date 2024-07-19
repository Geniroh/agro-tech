"use client";
import {
  MONTH_OPTIONS,
  PRODUCT_PHASE_OPTIONS,
  VALUE_CHAIN_OPTIONS,
} from "@/constants/options";
import { countriesData } from "@/data/country-region";
import axiosInstance from "@/utils/axiosInstance";
import {
  generateCountryOptions,
  generateYearOptions,
  getCountryCurrency,
  getCurrencyOptions,
} from "@/utils/function";
import { Form, Input, Button, Select, InputNumber, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";

const { TextArea } = Input;
const { Option } = Select;

const EditFormPage = () => {
  const params = useParams<{ editId: string }>();
  const [innovation, setInnovation] = useState<IInnovationType>();
  const router = useRouter();
  const { editId } = params;

  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState<string>("NGN");

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
      onSuccess: (data) => {
        form.setFieldsValue(data);
        setInnovation(data);
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
    mutateAsync(values);
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
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={data}
        >
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
              <Form.Item name="currency">
                <Select
                  size="large"
                  className="w-full"
                  variant="filled"
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={getCurrencyOptions()}
                />
              </Form.Item>
              <Form.Item name="cost">
                <InputNumber
                  min={0}
                  className="w-full"
                  variant="filled"
                  size="large"
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

          <div>
            <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
              About Product
            </h3>
            <Form.Item name="productDescription">
              <TextArea rows={4} variant="filled" size="large" />
            </Form.Item>
          </div>

          <div>
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
              Briefly describe how this technology is inclusive of the female
              gender.
            </h3>

            <Form.Item name="productGenderDescription">
              <TextArea rows={4} variant="filled" size="large" />
            </Form.Item>
          </div>

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
        </Form>
      </div>
    </div>
  );
};

export default EditFormPage;
