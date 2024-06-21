import { useFormContext } from "@/context/FormContext";
import { message } from "antd";
import axios from "axios";

interface FormData {
  [key: string]: any;
}

export const useFormSubmit = () => {
  const { formData, setFormData, setCurrentStep, setMySteps, setSubmitStatus } =
    useFormContext();

  const handleSubmit = async (data: FormData) => {
    try {
      const { data: res } = await axios.post("/api/v1/innovation", data);

      if (res.error) {
        throw new Error("There was an error in creating an innovation");
      }

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
