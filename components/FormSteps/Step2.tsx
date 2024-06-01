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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StyledFileInput } from "@/components/general/upload-input";

const formSchema = z.object({
  innovation_phase: z.string().min(2, { message: "Phase is required" }),
  product_usage: z.string(),
  product_description: z
    .string()
    .min(2, { message: "Description is required." }),
  product_media: z.object({
    url: z.string().url({ message: "A valid URL is required" }),
    name: z.string().min(1, { message: "File name is required" }),
  }),
});

const Step2: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
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

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="innovation_phase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Implementation Phase</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: string) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full bg-[#fafafa]">
                    <SelectValue placeholder="Select phase" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="distribution">Distribution</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="product_usage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Use</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Please Enter Product Use"
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
          name="product_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Product</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Please Enter A Brief Description Of Product"
                  className="bg-[#fafafa]"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="product_media"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instance Media Upload</FormLabel>
              <FormControl>
                <StyledFileInput
                  id={"product_media"}
                  name={"product_media"}
                  placeholder="Click to add images/videos of product"
                  defaultValue={formData.product_media?.name}
                  onChange={({ url, name }) => {
                    field.onChange({ url, name });
                    setIsUploading(!url);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-semibold disabled:cursor-not-allowed"
          onClick={form.handleSubmit(nextStep)}
          disabled={!(currentStep < mySteps - 1) || isUploading}
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

export default Step2;
