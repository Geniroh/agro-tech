"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useFormContext } from "@/context/FormContext";
import { toast } from "sonner";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoTrashBin } from "react-icons/io5";

const baseSchema = z.object({
  isHSEGuideline: z.boolean(),
});

const guidelineSchema = z.object({
  hseguidelines: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
      })
    )
    .min(1, { message: "At least one guideline is required" }),
});

const Step7: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();

  const [areExtraFieldsValid, setAreExtraFieldsValid] = useState(false);

  const formSchema = baseSchema.extend(
    formData.isHSEGuideline
      ? { hseguidelines: guidelineSchema.shape.hseguidelines }
      : {}
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "hseguidelines",
  });

  const handleIsHSEChange = (value: boolean) => {
    form.setValue("isHSEGuideline", value);
    if (!value) {
      form.setValue("hseguidelines", []);
    } else if (value && form.getValues("hseguidelines")?.length === 0) {
      append({ name: "" });
    }
  };

  const saveData = (values: z.infer<typeof formSchema>) => {
    setFormData({ ...formData, ...values });
    checkExtraFieldsValidity();
  };

  // const nextStep = () => {
  //   form.handleSubmit((values) => {
  //     saveData(values);
  //     if (currentStep < mySteps - 1) {
  //       setCurrentStep(currentStep + 1);
  //     }
  //   })();
  // };

  const nextStep = () => {
    if (currentStep < mySteps - 1) {
      form.handleSubmit(saveData)();
      if (areExtraFieldsValid) {
        setCurrentStep(currentStep + 1);
      } else {
        toast.error(
          "Please ensure you have filled all required fields then continue!"
        );
      }
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

  const checkExtraFieldsValidity = () => {
    const guidelines = form.getValues("hseguidelines");
    if (form.watch("isHSEGuideline")) {
      const isValid = guidelines.every(
        (guideline: any) => guideline.name.length >= 2
      );
      setAreExtraFieldsValid(isValid);
    } else {
      setAreExtraFieldsValid(true);
    }
  };

  useEffect(() => {
    checkExtraFieldsValidity();
  }, [form.watch("isHSEGuideline"), form.watch("hseguidelines")]);

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="isHSEGuideline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Does This Product Have HSE Guidelines?</FormLabel>
              <FormControl>
                <Select
                  value={String(field.value)}
                  onValueChange={(value: string) => {
                    const booleanValue = value === "true";
                    field.onChange(booleanValue);
                    handleIsHSEChange(booleanValue);
                  }}
                >
                  <SelectTrigger className="w-full bg-[#fafafa]">
                    <SelectValue placeholder="Please select an option" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value={"true"}>Yes</SelectItem>
                    <SelectItem value={"false"}>No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("isHSEGuideline") &&
          fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              {index > 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  className="p-1"
                  onClick={() => remove(index)}
                >
                  <IoTrashBin />
                </Button>
              )}

              <FormField
                control={form.control}
                name={`hseguidelines.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{index + 1}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Info"
                        type="text"
                        className="bg-[#fafafa]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

        {form.watch("isHSEGuideline") && (
          <div className="w-full flex justify-center">
            <Button
              type="button"
              variant="ghost"
              className="text-[#329632]"
              onClick={() => append({ name: "" })}
            >
              Add guideline +
            </Button>
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
          onClick={form.handleSubmit(saveStep)}
        >
          Save Progress
        </Button>
      </div>
    </Form>
  );
};

export default Step7;
