// "use client";
// import React, { useEffect, useState } from "react";
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

// const baseSchema = z.object({
//   isUsageExample: z.string(),
// });

// const instancesSchema = z.object({
//   instances: z
//     .array(
//       z.object({
//         instance_description: z
//           .string()
//           .min(2, { message: "Description must be at least 2 characters." }),
//         instance_media: z.instanceof(File).optional(),
//       })
//     )
//     .min(1, { message: "At least one instance is required" }),
// });

// const Step3: React.FC = () => {
//   const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
//     useFormContext();

//   const formSchema = baseSchema.extend(
//     formData.isUsageExample === "true"
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

//   const handleIsUsageExampleChange = (value: string) => {
//     form.setValue("isUsageExample", value);
//     if (value === "false") {
//       form.setValue("instances", []);
//     }
//   };

//   const saveData = (values: z.infer<typeof formSchema>) => {
//     setFormData({ ...formData, ...values });
//   };

//   const nextStep = () => {
//     if (currentStep < mySteps - 1) {
//       form.handleSubmit(saveData)();
//       setCurrentStep(currentStep + 1);
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

//   useEffect(() => {
//     form.reset(formData);
//   }, [formData]);

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
//                   value={field.value}
//                   onValueChange={(value: string) => {
//                     field.onChange(value);
//                     handleIsUsageExampleChange(value);
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

//         {form.watch("isUsageExample") === "true" &&
//           fields.map((field, index) => (
//             <div key={field.id}>
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
//                         onChange={(file) => field.onChange(file)}
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

//         {form.watch("isUsageExample") === "true" && (
//           <div className="w-full flex justify-center">
//             <Button
//               variant={"ghost"}
//               className="text-[#329632]"
//               onClick={() =>
//                 append({ instance_description: "", instance_media: null })
//               }
//             >
//               Add instance example +
//             </Button>
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
//           className=" text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-semibold disabled:cursor-not-allowed"
//           onClick={form.handleSubmit(nextStep)}
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

"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useFormContext } from "@/context/FormContext";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StyledFileInput } from "@/components/general/upload-input";
import { IoTrashBin } from "react-icons/io5";

const baseSchema = z.object({
  isUsageExample: z.string(),
});

const instancesSchema = z.object({
  instances: z
    .array(
      z.object({
        instance_description: z
          .string()
          .min(2, { message: "Description must be at least 2 characters." }),
        // instance_media: z.instanceof(File).optional(),
        instance_media: z
          .object({
            url: z.string().url({ message: "A valid URL is required" }),
            name: z.string().min(1, { message: "File name is required" }),
          })
          .optional(),
      })
    )
    .min(1, { message: "At least one instance is required" }),
});

const Step3: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();

  const formSchema = baseSchema.extend(
    formData.isUsageExample === "true"
      ? { instances: instancesSchema.shape.instances }
      : {}
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "instances",
  });

  const handleIsUsageExampleChange = (value: string) => {
    form.setValue("isUsageExample", value);
    if (value === "false") {
      form.setValue("instances", []);
    } else if (value === "true" && !form.getValues("instances")) {
      append({ instance_description: "", instance_media: null });
    }
  };

  const saveData = (values: z.infer<typeof formSchema>) => {
    setFormData({ ...formData, ...values });
  };

  const nextStep = () => {
    if (currentStep < mySteps - 1) {
      form.handleSubmit(saveData)();
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveStep = () => {
    form.handleSubmit(saveData)();
  };

  useEffect(() => {
    form.reset(formData);
  }, [formData]);

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="isUsageExample"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do You Have Usage Examples To Show?</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: string) => {
                    field.onChange(value);
                    handleIsUsageExampleChange(value);
                  }}
                >
                  <SelectTrigger className="w-full bg-[#fafafa]">
                    <SelectValue placeholder="Please select an option" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("isUsageExample") === "true" &&
          fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              {index > 0 && (
                <Button
                  variant="destructive"
                  className="p-2"
                  onClick={() => remove(index)}
                >
                  <IoTrashBin />
                </Button>
              )}

              <FormField
                control={form.control}
                name={`instances.${index}.instance_media`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instance Media Upload</FormLabel>
                    <FormControl>
                      <StyledFileInput
                        id={`instances.${index}.instance_media`}
                        name={`instances.${index}.instance_media`}
                        placeholder="Click to add images/videos of product"
                        defaultValue={field.value?.name}
                        onChange={({ url, name }) => {
                          field.onChange({ url, name });
                          // setIsUploading(!url);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`instances.${index}.instance_description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Very Brief Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Please Enter A Brief Description To Support Image"
                        className="bg-[#fafafa]"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

        {form.watch("isUsageExample") === "true" && (
          <div className="w-full flex justify-center">
            <button
              type="button"
              className="text-[#329632]"
              onClick={() =>
                append({ instance_description: "", instance_media: null })
              }
            >
              Add instance example +
            </button>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-y-4">
        <button
          className="disabled:cursor-not-allowed text-[16px] leading-[22px] font-semibold mt-10"
          onClick={prevStep}
          disabled={currentStep < 1}
        >
          Go Back
        </button>
        <Button
          size="lg"
          variant="default"
          className=" text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-semibold disabled:cursor-not-allowed"
          onClick={form.handleSubmit(nextStep)}
          disabled={!(currentStep < mySteps - 1)}
        >
          Continue
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-[16px] leading-[22px] rounded-xl font-semibold border-[#242424]"
          onClick={saveStep}
        >
          Save Progress
        </Button>
      </div>
    </Form>
  );
};

export default Step3;