"use client";
import React from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFormSubmit } from "@/hooks/multi-step-submit";

const formSchema = z.object({
  isGenderFriendly: z.string(),
  gender_description: z.string(),
});

const Step9: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();

  const { handleSubmit } = useFormSubmit();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  const saveData = (values: z.infer<typeof formSchema>) => {
    setFormData({ ...formData, ...values });
    handleSubmit(formData);
  };

  const nextStep = () => {
    form.handleSubmit((values) => {
      saveData(values);
      if (currentStep < mySteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    })();
  };

  // const nextStep = () => {
  //   if (currentStep < mySteps - 1) {
  //     form.handleSubmit(saveData)();
  //     setCurrentStep(currentStep + 1);
  //   }
  // };

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
                  value={field.value}
                  onValueChange={(value: string) => {
                    field.onChange(value);
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

        {form.watch("isGenderFriendly") === "true" && (
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
          onClick={form.handleSubmit(nextStep)}
          disabled={!(currentStep < mySteps - 1)}
        >
          Continue
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-[16px] leading-[22px] rounded-xl font-semibold"
          onClick={saveStep}
        >
          Save Progress
        </Button>
      </div>
    </Form>
  );
};

export default Step9;
