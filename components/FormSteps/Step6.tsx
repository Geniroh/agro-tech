"use client";
import React from "react";
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
  isSupplier: z.boolean(),
});

const supplierSchema = z.object({
  supplier: z
    .array(
      z.object({
        supplier_name: z.string().min(2, { message: "Name is required" }),
        supplier_email: z.string().email({ message: "Invalid email address" }),
        supplier_contact: z.string().optional(),
      })
    )
    .min(1, { message: "At least one supplier is required" }),
});

const Step6: React.FC = () => {
  const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
    useFormContext();

  const formSchema = baseSchema.extend(
    formData.isSupplier ? { supplier: supplierSchema.shape.supplier } : {}
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "supplier",
  });

  const handleIsSupplierChange = (value: boolean) => {
    form.setValue("isSupplier", value);
    if (!value) {
      form.setValue("supplier", []);
    } else if (value && form.getValues("supplier")?.length === 0) {
      append({ supplier_name: "", supplier_email: "", supplier_contact: "" });
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
          name="isSupplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do You Have a Supplier?</FormLabel>
              <FormControl>
                <Select
                  value={String(field.value)}
                  onValueChange={(value: string) => {
                    const booleanValue = value === "true";
                    field.onChange(booleanValue);
                    handleIsSupplierChange(booleanValue);
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

        {form.watch("isSupplier") &&
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
                name={`supplier.${index}.supplier_name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Supplier's Name"
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
                name={`supplier.${index}.supplier_email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Supplier's Email"
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
                name={`supplier.${index}.supplier_contact`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Please Enter Supplier's Contact"
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

        {form.watch("isSupplier") && (
          <div className="w-full flex justify-center">
            <Button
              type="button"
              variant="ghost"
              className="text-[#329632]"
              onClick={() =>
                append({
                  supplier_name: "",
                  supplier_email: "",
                  supplier_contact: "",
                })
              }
            >
              Add another supplier +
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

export default Step6;
