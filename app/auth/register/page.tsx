import { RegisterForm } from "@/components/auth/register-form"

const RegisterPage = () => {
 return (
    <div className="w-screen h-screen bg-black/50 absolute top-0 flex justify-center items-center transition-all duration-300 ease-in-out overflow-hidden p-10 ">
        <RegisterForm />
    </div>
 )   
}

export default RegisterPage