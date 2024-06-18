import React, { useState, useEffect } from "react";
import { Select, Button, Input, Form, Upload } from "antd";
import { useFormContext } from "@/context/FormContext";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { toast } from "sonner";

const { Option } = Select;
const { Item } = Form;

interface IMedia {
  name: string;
  url: string;
  type?: string;
  size?: string;
}

interface IInstances {
  instance_description: string;
  instance_media: IMedia;
}

const Step3: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const [selectValue, setSelectValue] = useState<boolean | null>(null);
  const [exampleInstances, setExampleInstances] = useState<IInstances[]>([]);
  const [form] = Form.useForm();

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

  useEffect(() => {
    if (selectValue && exampleInstances.length === 0) {
      setExampleInstances([
        { instance_description: "", instance_media: { name: "", url: "" } },
      ]);
    } else if (selectValue) {
      setExampleInstances([]);
    }
  }, [selectValue]);

  const handleSelectChange = (value: boolean) => {
    setSelectValue(value);
    if (!value) {
      console.log("No selected");
      // Do something here when 'No' is selected
    }
  };

  const addInstance = () => {
    setExampleInstances([
      ...exampleInstances,
      { instance_description: "", instance_media: { name: "", url: "" } },
    ]);
  };

  const removeInstance = (index: number) => {
    if (index === 0) return;
    setExampleInstances(exampleInstances.filter((_, i) => i != index));
  };

  const handleInstanceChange = (
    index: number,
    field: keyof IInstances,
    value: string
  ) => {
    const updatedInstance = [...exampleInstances];
    if (field === "instance_description") {
      updatedInstance[index]["instance_description"] = value;
    } else if (field === "instance_media") {
    }
    setExampleInstances(updatedInstance);
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
                <Item label="Instance Description" required className="w-full">
                  <Input
                    value={example.instance_description}
                    onChange={(e) =>
                      handleInstanceChange(
                        index,
                        "instance_description",
                        e.target.value
                      )
                    }
                    required
                  />
                </Item>

                <Item label="Instance Media" required className="w-full">
                  <Upload {...uploadFileProps}>
                    <Button icon={<UploadOutlined />} className="w-full">
                      Click to Upload
                    </Button>
                  </Upload>
                </Item>

                {index > 0 && (
                  <Button
                    type="dashed"
                    onClick={() => removeInstance(index)}
                    icon={<MinusCircleOutlined />}
                  />
                )}
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={addInstance}
                icon={<PlusOutlined />}
              >
                Add Person
              </Button>
            </Form.Item>
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

// "use client";
// import React, { useCallback, useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, useFieldArray } from "react-hook-form";
// import { z } from "zod";
// import { useFormContext } from "@/context/FormContext";
// import {
//   Form,
//   FormControl,
//   FormMessage,
//   FormItem,
//   FormField,
//   FormLabel,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { StyledFileInput } from "@/components/general/upload-input";
// import { IoTrashBin } from "react-icons/io5";
// import { toast } from "sonner";

// const baseSchema = z.object({
//   isUsageExample: z.boolean(),
// });

// const instancesSchema = z.object({
//   instances: z
//     .array(
//       z.object({
//         instance_description: z
//           .string()
//           .min(2, { message: "Description is required." }),
//         instance_media: z.object({
//           url: z.string().url({ message: "A valid URL is required" }),
//           name: z.string().min(1, { message: "File name is required" }),
//         }),
//       })
//     )
//     .min(1, { message: "At least one instance is required" }),
// });

// const Step3: React.FC = () => {
//   const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
//     useFormContext();
//   const [areExtraFieldsValid, setAreExtraFieldsValid] = useState(false);

//   const formSchema = baseSchema.extend(
//     formData.isUsageExample
//       ? { instances: instancesSchema.shape.instances }
//       : {}
//   );

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: formData,
//     mode: "onChange",
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "instances",
//   });

//   const handleIsUsageExampleChange = (value: boolean) => {
//     form.setValue("isUsageExample", value);
//     if (!value) {
//       form.setValue("instances", []);
//     } else if (value && form.getValues("instances")?.length === 0) {
//       append({
//         instance_description: "",
//         instance_media: { url: "", name: "" },
//       });
//     }
//   };

//   const saveData = (values: z.infer<typeof formSchema>) => {
//     setFormData({ ...formData, ...values });
//   };

//   const nextStep = () => {
//     if (currentStep < mySteps - 1) {
//       form.handleSubmit(saveData)();

//       checkExtraFieldsValidity();

//       if (areExtraFieldsValid) {
//         setCurrentStep(currentStep + 1);
//       } else {
//         toast.error(
//           "Please ensure you have filled all required fields then continue!"
//         );
//       }
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const saveStep = () => {
//     form.handleSubmit(saveData)();
//   };

//   const watchExample = form.watch("isUsageExample");
//   const watchInstance = form.watch("instances");

//   const checkExtraFieldsValidity = useCallback(() => {
//     const instances = form.getValues("instances");
//     if (form.watch("isUsageExample")) {
//       const isValid = instances.every(
//         (instance: any) =>
//           instance.instance_description.length >= 2 &&
//           instance.instance_media?.url &&
//           instance.instance_media?.name
//       );
//       setAreExtraFieldsValid(isValid);
//     } else {
//       setAreExtraFieldsValid(true);
//     }
//   }, [watchExample, watchInstance]);

//   useEffect(() => {
//     checkExtraFieldsValidity();
//   }, [checkExtraFieldsValidity]);

//   return (
//     <Form {...form}>
//       <div className="space-y-6">
//         <FormField
//           control={form.control}
//           name="isUsageExample"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Do You Have Usage Examples To Show?</FormLabel>
//               <FormControl>
//                 <Select
//                   value={String(field.value)}
//                   onValueChange={(value: string) => {
//                     const booleanValue = value === "true";
//                     field.onChange(booleanValue);
//                     handleIsUsageExampleChange(booleanValue);
//                   }}
//                 >
//                   <SelectTrigger className="w-full bg-[#fafafa]">
//                     <SelectValue placeholder="Please select an option" />
//                   </SelectTrigger>
//                   <SelectContent position="popper">
//                     <SelectItem value="true">Yes</SelectItem>
//                     <SelectItem value="false">No</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {form.watch("isUsageExample") &&
//           fields.map((field, index) => (
//             <div key={field.id} className="space-y-4">
//               {index > 0 && (
//                 <Button
//                   variant="destructive"
//                   className="p-2"
//                   onClick={() => remove(index)}
//                 >
//                   <IoTrashBin />
//                 </Button>
//               )}

//               <FormField
//                 control={form.control}
//                 name={`instances.${index}.instance_media`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Instance Media Upload</FormLabel>
//                     <FormControl>
//                       <StyledFileInput
//                         id={`instances.${index}.instance_media`}
//                         name={`instances.${index}.instance_media`}
//                         placeholder="Click to add images/videos of product"
//                         defaultValue={field.value?.name}
//                         onChange={({ url, name }) => {
//                           field.onChange({ url, name });
//                         }}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name={`instances.${index}.instance_description`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Add Very Brief Description</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         {...field}
//                         placeholder="Please Enter A Brief Description To Support Image"
//                         className="bg-[#fafafa]"
//                         rows={4}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           ))}

//         {form.watch("isUsageExample") && (
//           <div className="w-full flex justify-center">
//             <button
//               type="button"
//               className="text-[#329632]"
//               onClick={() =>
//                 append({
//                   instance_description: "",
//                   instance_media: { url: "", name: "" },
//                 })
//               }
//             >
//               Add instance example +
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="mt-10 flex flex-col gap-y-4">
//         <button
//           className="disabled:cursor-not-allowed text-[16px] leading-[22px] font-semibold mt-10"
//           onClick={prevStep}
//           disabled={currentStep < 1}
//         >
//           Go Back
//         </button>
//         <Button
//           size="lg"
//           variant="default"
//           className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-semibold disabled:cursor-not-allowed"
//           onClick={form.handleSubmit(nextStep)}
//           title={
//             !areExtraFieldsValid ? "Please all required field to continue" : ""
//           }
//           disabled={!(currentStep < mySteps - 1)}
//         >
//           Continue
//         </Button>
//         <Button
//           size="lg"
//           variant="outline"
//           className="text-[16px] leading-[22px] rounded-xl font-semibold border-[#242424]"
//           onClick={saveStep}
//         >
//           Save Progress
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default Step3;
