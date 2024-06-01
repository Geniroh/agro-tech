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
// import { Button } from "@/components/ui/button";
// import { IoTrashBin } from "react-icons/io5";
// import { Input } from "../ui/input";

// const baseSchema = z.object({
//   isInstruction: z.string(),
// });

// const instructionSchema = z.object({
//   instructions: z
//     .array(
//       z.object({
//         instruction_step: z.string().min(2, { message: "Required" }),
//       })
//     )
//     .min(1, { message: "At least one step is required" }),
// });

// const Step4: React.FC = () => {
//   const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
//     useFormContext();

//   const formSchema = baseSchema.extend(
//     formData.isInstruction === "true"
//       ? { steps: instructionSchema.shape.instructions }
//       : {}
//   );

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: formData,
//     mode: "onChange",
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "steps",
//   });

//   const handleIsInstructionChange = (value: string) => {
//     form.setValue("isInstruction", value);
//     if (value === "false") {
//       form.setValue("instructions", []);
//     }
//   };
//   // const handleIsInstructionChange = (value: string) => {
//   //   form.setValue("isInstruction", value);
//   //   if (value === "false") {
//   //     form.setValue("instructions", []);
//   //   } else if (value === "true" && !form.getValues("instructions")) {
//   //     append({ instruction_step: "" });
//   //   }
//   // };

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

//   return (
//     <Form {...form}>
//       <div className="space-y-6">
//         <FormField
//           control={form.control}
//           name="isInstruction"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Do You Have User Instructions?</FormLabel>
//               <FormControl>
//                 <Select
//                   value={field.value}
//                   onValueChange={(value: string) => {
//                     field.onChange(value);
//                     handleIsInstructionChange(value);
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

//         {form.watch("isInstruction") === "true" && (
//           <h1 className="text-muted-foreground">
//             {" "}
//             Please provide the Instruction in Steps
//           </h1>
//         )}

//         {form.watch("isInstruction") === "true" &&
//           fields.map((field, index) => (
//             <div key={field.id}>
//               {index > 0 && (
//                 <Button
//                   variant="destructive"
//                   className="p-1"
//                   onClick={() => remove(index)}
//                 >
//                   <IoTrashBin />
//                 </Button>
//               )}

//               <FormField
//                 control={form.control}
//                 name={`instructions.${index}.instruction_step`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>{`Step ${index + 1}`}</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         placeholder="Please Enter Info"
//                         className="bg-[#fafafa]"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           ))}

//         {form.watch("isInstruction") === "true" && (
//           <div className="w-full flex justify-center">
//             <button
//               className="text-[#329632]"
//               type="button"
//               onClick={() => append({ instruction_step: "" })}
//             >
//               Add a step +
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

// export default Step4;

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
import { Button } from "@/components/ui/button";
import { IoTrashBin } from "react-icons/io5";
import { Input } from "../ui/input";

const baseSchema = z.object({
  isInstruction: z.string(),
});

const instructionSchema = z.object({
  instructions: z
    .array(
      z.object({
        instruction_step: z.string().min(2, { message: "Required" }),
      })
    )
    .min(1, { message: "At least one step is required" }),
});

const Step4: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();

  const formSchema = baseSchema.extend(
    formData.isInstruction === "true"
      ? { instructions: instructionSchema.shape.instructions }
      : {}
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  const handleIsInstructionChange = (value: string) => {
    form.setValue("isInstruction", value);
    if (value === "false") {
      form.setValue("instructions", []);
    } else if (
      value === "true" &&
      form.getValues("instructions")?.length === 0
    ) {
      append({ instruction_step: "" });
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

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="isInstruction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do You Have User Instructions?</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: string) => {
                    field.onChange(value);
                    handleIsInstructionChange(value);
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

        {form.watch("isInstruction") === "true" && (
          <h1 className="text-muted-foreground">
            Please provide the Instruction in Steps
          </h1>
        )}

        {form.watch("isInstruction") === "true" &&
          fields.map((field, index) => (
            <div key={field.id}>
              {index > 0 && (
                <Button
                  variant="destructive"
                  className="p-1"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <IoTrashBin />
                </Button>
              )}

              <FormField
                control={form.control}
                name={`instructions.${index}.instruction_step`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Step ${index + 1}`}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Info"
                        className="bg-[#fafafa]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

        {form.watch("isInstruction") === "true" && (
          <div className="w-full flex justify-center">
            <button
              className="text-[#329632]"
              type="button"
              onClick={() => append({ instruction_step: "" })}
            >
              Add a step +
            </button>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-y-4">
        <button
          type="button"
          className="disabled:cursor-not-allowed text-[16px] leading-[22px] font-semibold mt-10"
          onClick={prevStep}
          disabled={currentStep < 1}
        >
          Go Back
        </button>
        <Button
          size="lg"
          variant="default"
          className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-semibold disabled:cursor-not-allowed"
          onClick={form.handleSubmit(nextStep)}
          disabled={!(currentStep < mySteps - 1)}
        >
          Continue
        </Button>
        <Button
          type="button"
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

export default Step4;