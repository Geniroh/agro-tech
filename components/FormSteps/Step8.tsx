"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { IoTrashBin } from "react-icons/io5";
import { useFormSubmit } from "@/hooks/multi-step-submit";
import { ClipLoader } from "react-spinners";

const formSchema = z.object({
  isGenderFriendly: z.boolean(),
  gender_description: z.string().optional(),
});

const Step8: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    mySteps,
    submitStatus,
    setSubmitStatus,
  } = useFormContext();

  const { handleSubmit } = useFormSubmit();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  const saveData = (values: z.infer<typeof formSchema>) => {
    setFormData({ ...formData, ...values });
  };

  const nextStep = () => {
    if (currentStep < mySteps - 1) {
      form.handleSubmit(saveData)();
      setCurrentStep(currentStep + 1);
    }
  };

  const finalStep = async () => {
    setLoading(true);
    try {
      form.handleSubmit(saveData)();
      await handleSubmit(formData);
    } catch (error) {
      console.log({ error });
    }
    setLoading(false);
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
          name="isGenderFriendly"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is this product Gender friendly?</FormLabel>
              <FormControl>
                <Select
                  value={String(field.value)}
                  onValueChange={(value: string) => {
                    const booleanValue = value === "true";
                    field.onChange(booleanValue);
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

        {form.watch("isGenderFriendly") && (
          <FormField
            control={form.control}
            name={`gender_description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Briefly describe how this technology is inclusive of the
                  female gender.
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Description"
                    rows={4}
                    className="bg-[#fafafa]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          onClick={form.handleSubmit(finalStep)}
          disabled={loading}
        >
          {loading ? <ClipLoader color="#fff" /> : " Submit Innovation"}
        </Button>
      </div>
    </Form>
  );
};

export default Step8;
