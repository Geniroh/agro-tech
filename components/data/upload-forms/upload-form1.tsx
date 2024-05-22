"use client"
import React, { FormEvent, useState } from 'react';
import { useFormContext } from '@/context/UploadContext';
import {
    Form,
    FormControl,
    FormMessage,
    FormItem,
    FormField,
    FormLabel
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useForm } from 'react-hook-form';



export const UploadForm1: React.FC = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")
    const { nextStep, updateFormData } = useFormContext();

    const form = useForm()

    // const handleSubmit = async (values) => {
    //     setError("")
    //     setSuccess("")
    //     console.log(values)
    //     updateFormData({ /* your data here */ });
    //     // startTransition(()=> {
    //     //     login(values)
    //     //     .then((data) => {
    //     //         setError(data?.error);
    //     //         setSuccess(data?.success);
    //     //     })
    //     // })
    //     nextStep();
    // };

  return (
    <Form {...form}>
        <form 
            className="space-y-6"
            // onSubmit={form.handleSubmit(handleSubmit)}
        >
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Innovation Name</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    // disabled={isPending}
                                    placeholder="Please Enter the Name Of the Innovation Here"
                                    type="text"
                                    className='bg-myoffwhie'
                                />
                            </FormControl>
                            {/* <FormMessage /> */}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year Invented</FormLabel>
                            <FormControl>
                                <Select>
                                <SelectTrigger className="w-full bg-[#fafafa]">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent position='popper' >
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                                </Select>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                />

                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Select>
                                <SelectTrigger className="w-full bg-[#fafafa]">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent position='popper' >
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                                </Select>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                />

                <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cost (Naira)</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    suffixicon={"₦"}
                                    // disabled={isPending}
                                    placeholder="Please Enter the Name Of the Innovation Here"
                                    type="number"
                                    className='bg-[#fafafa]'
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                />

                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Value Chain</FormLabel>
                            <FormControl>
                                <Input 
                                    
                                    {...field}
                                    // disabled={isPending}
                                    placeholder="Please Enter the Name Of the Innovation Here"
                                    type="string"
                                />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                />
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />

                <Button
                    type="submit"
                    className="w-full"
                    variant={"outline"}
                >
                    Go back
                </Button>

                <Button
                    type="submit"
                    className="w-full"
                >
                    Continue
                </Button>
            </form>
        </Form>
  );
};
