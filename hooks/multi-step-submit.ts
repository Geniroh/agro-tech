import { useFormContext } from "@/context/FormContext";
import { message } from "antd";
import { sendUploadSucess } from "@/actions/innovationEmails";
import axiosInstance from "@/utils/axiosInstance";
import { useSession } from "next-auth/react";

interface FormData {
  [key: string]: any;
}

export const useFormSubmit = () => {
  const { formData, setFormData, setCurrentStep, setMySteps, setSubmitStatus } =
    useFormContext();

  const session = useSession();

  const handleSubmit = async (data: FormData) => {
    try {
      const { data: res } = await axiosInstance.post("/innovation", data);

      if (res.error) {
        throw new Error("There was an error in creating an innovation");
      }

      await sendUploadSucess(
        session?.data?.user?.email || "irochibuzor@gmail.com"
      );

      // Clear local storage
      localStorage.removeItem("formData");
      localStorage.removeItem("currentStep");
      localStorage.removeItem("totalSteps");

      // localStorage.clear();

      // Reset the state to reflect cleared storage
      setFormData({});
      setCurrentStep(0);
      setMySteps(1);

      setSubmitStatus(true);
    } catch (error) {
      console.error("Form submission failed", error);
      message.error("There was an error submitting Innovation");
      setSubmitStatus(false);
    }
  };

  return {
    handleSubmit,
  };
};
