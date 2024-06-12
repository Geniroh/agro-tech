"use client";
import React, { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoTrashBin } from "react-icons/io5";

const baseSchema = z.object({
  isInventor: z.boolean(),
});

const inventorSchema = z.object({
  inventor: z
    .array(
      z.object({
        inventor_name: z.string().min(2, { message: "Name is required" }),
        inventor_email: z.string().email({ message: "Invalid email address" }),
        inventor_contact: z.string(),
      })
    )
    .min(1, { message: "At least one inventor is required" }),
});

const Step5: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();

  const [areExtraFieldsValid, setAreExtraFieldsValid] = useState(false);

  const formSchema = baseSchema.extend(
    formData.isInventor ? { inventor: inventorSchema.shape.inventor } : {}
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "inventor",
  });

  const handleIsInventorChange = (value: boolean) => {
    form.setValue("isInventor", value);
    if (!value) {
      form.setValue("inventor", []);
    } else if (value && form.getValues("inventor")?.length === 0) {
      append({ inventor_name: "", inventor_email: "", inventor_contact: "" });
    }
  };

  const saveData = (values: z.infer<typeof formSchema>) => {
    setFormData({ ...formData, ...values });
  };

  const nextStep = () => {
    form.handleSubmit((values) => {
      saveData(values);
      if (currentStep < mySteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    })();
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
    const inventor = form.getValues("inventor");
    if (form.watch("isInventor")) {
      const isValid = inventor.every(
        (inventor: any) =>
          inventor.inventor_name.length >= 2 &&
          inventor.inventor_email.length >= 2
      );
      setAreExtraFieldsValid(isValid);
    } else {
      setAreExtraFieldsValid(true);
    }
  };

  useEffect(() => {
    checkExtraFieldsValidity();
  }, [form.watch("isInventor"), form.watch("inventor")]);

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="isInventor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are You An Inventor On This Product?</FormLabel>
              <FormControl>
                <Select
                  value={String(field.value)}
                  onValueChange={(value: string) => {
                    const booleanValue = value === "true";
                    field.onChange(booleanValue);
                    handleIsInventorChange(booleanValue);
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

        {form.watch("isInventor") &&
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
                name={`inventor.${index}.inventor_name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Your Name"
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
                name={`inventor.${index}.inventor_email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Your Email"
                        type="email"
                        className="bg-[#fafafa]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`inventor.${index}.inventor_contact`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Your Contact"
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

        {form.watch("isInventor") && (
          <div className="w-full flex justify-center">
            <Button
              type="button"
              variant="ghost"
              className="text-[#329632]"
              onClick={() =>
                append({
                  inventor_name: "",
                  inventor_email: "",
                  inventor_contact: "",
                })
              }
            >
              Add inventor +
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
          onClick={nextStep}
          disabled={!(currentStep < mySteps - 1) || !areExtraFieldsValid}
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

export default Step5;
