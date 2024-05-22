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
import { Textarea } from "@/components/ui/textarea"
import { StyledFileInput } from '@/components/general/styled-file-input';



export const UploadForm2: React.FC = () => {
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
                    name="phase"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Implementation Phase</FormLabel>
                            <FormControl>
                            <Select>
                                <SelectTrigger className="w-full bg-[#fafafa]">
                                    <SelectValue placeholder="Testing" />
                                </SelectTrigger>
                                <SelectContent position='popper' >
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                                </Select>
                            </FormControl>
                            {/* <FormMessage /> */}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="usage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Use</FormLabel>
                            <FormControl>
                                <Input 
                                    {...field}
                                    // disabled={isPending}
                                    placeholder="Please ENter Product Use"
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
                            <FormLabel>About Product</FormLabel>
                            <FormControl>
                            <Textarea placeholder="Please Enter A Brief Description Of Product." className='bg-myoffwhie' />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                />

                {/* <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Media Upload</FormLabel>
                            <FormControl>
                                <Input id="picture" type="file" className='py-5 flex justify-center items-center h-[100px] bg-myoffwhie'  />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                /> */}

                <FormField
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Media Upload</FormLabel>
                            <FormControl>
                            <StyledFileInput
                                id="picture2"
                                className="py-5 flex justify-center items-center h-[100px] bg-myoffwhite border rounded-md cursor-pointer bg-myoffwhie"
                                placeholder="Click to add images/videos of product"
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
