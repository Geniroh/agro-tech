import { CardWrapper } from "@/components/auth/card-wrapper"
import { LoginForm } from "@/components/auth/login-form"
import { Social } from "@/components/auth/social"

const LoginPage = () => {
    return (
        <div className="w-screen h-screen bg-black/50 absolute top-0 flex justify-center items-center transition-all duration-300 ease-in-out">
            <CardWrapper
                headerLabel="Sign in to keep exploring, upload innovations and participate in forum discussions!"
                backButtonHref="/auth/register"
                backButtonLabel="Create an account"
                actionTitle="Sign In"
                backButtonVariant="default"
            >
                <Social />
            </CardWrapper>
        </div>
    )
}

export default LoginPage