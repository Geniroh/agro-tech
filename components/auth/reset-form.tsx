"use client"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { ResetSchema } from "@/schemas"
import { useState, useTransition } from "react"
import {
    Form,
    FormControl,
    FormMessage,
    FormItem,
    FormField,
    FormLabel
} from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { reset } from "@/actions/reset"


export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()


    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    })

    const handleSubmit = async (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")

        console.log(values)

        startTransition(()=> {
            reset(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }

    return (
        <div>
            <CardWrapper
                headerLabel="Forgot your password?"
                backButtonHref="/auth/login/signin"
                backButtonLabel="Back to login"
                actionTitle="Password Reset"
                backButtonVariant="link"
            >
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                disabled={isPending}
                                                placeholder="example@email.com"
                                                type="email"
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
                            disabled={isPending}
                        >
                            Send reset Email
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}