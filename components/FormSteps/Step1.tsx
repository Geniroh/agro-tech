"use client";
import React, { useEffect, useState } from "react";
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
import { countriesData } from "@/data/country-region";

const formSchema = z.object({
  innovation_name: z.string().min(3, { message: "Name is required" }),
  innovation_year: z.string().min(3, { message: "Please select a year" }),
  innovation_country: z.string().min(3, { message: "Country is required" }),
  innovation_cost: z
    .string()
    .regex(/^\d+$/, { message: "Cost must be a number" }),
  innovation_value_chain: z
    .string()
    .min(2, { message: "Value chain is required" }),
});

const Step1: React.FC = () => {
  const [years, setYears] = useState<number[]>([]);
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();

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

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveStep = () => {
    form.handleSubmit(saveData)();
  };

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from(
      { length: currentYear - 1970 + 1 },
      (_, index) => 1970 + index
    );
    yearsArray.sort((a, b) => b - a);
    setYears(yearsArray);
  };

  useEffect(() => {
    getYears();
  }, []);

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="innovation_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Innovation Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Please Enter the Name Of the Innovation Here"
                  type="text"
                  className="bg-[#fafafa]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="innovation_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year Invented</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: string) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full bg-[#fafafa]">
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="innovation_country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: string) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full bg-[#fafafa]">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {countriesData.map((country) => (
                      <SelectItem
                        key={country.countryName}
                        value={country.countryName}
                      >
                        {country.countryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="innovation_cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost (Naira)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="How Much Does This Innovation Cost"
                  type="number"
                  className="bg-[#fafafa]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="innovation_value_chain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value Chain</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                  type="text"
                  className="bg-[#fafafa]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-semibold disabled:cursor-not-allowed"
            onClick={form.handleSubmit(nextStep)}
            disabled={!(currentStep < mySteps - 1)}
          >
            Continue
          </Button>
          <Button
            size="lg"
            variant="outline"
            type="button"
            className="text-[16px] leading-[22px] rounded-xl font-semibold border-[#242424]"
            onClick={form.handleSubmit(saveStep)}
          >
            Save Progress
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Step1;
