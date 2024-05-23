"use client"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { NewPasswordSchema } from "@/schemas"
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
import { useSearchParams } from "next/navigation"
import { newPassword } from "@/actions/new-password"


export const NewPasswordForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    const handleSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")

        console.log(values)

        startTransition(()=> {
            newPassword(values, token)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        })
    }

    return (
        <div>
            <CardWrapper
                headerLabel="Enter a new password"
                backButtonHref="/auth/login/sigin"
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                disabled={isPending}
                                                placeholder="******"
                                                type="password"
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
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}