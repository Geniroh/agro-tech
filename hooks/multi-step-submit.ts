import { useFormContext } from "@/context/FormContext";
import axios from "axios";

interface FormData {
  [key: string]: any;
}

export const useFormSubmit = () => {
  const { formData, setFormData, setCurrentStep, setMySteps, setSubmitStatus } =
    useFormContext();

  const handleSubmit = async (data: FormData) => {
    try {
      console.log({ data });

      const { data: res } = await axios.post("/api/v1/innovation", data);

      console.log(res);

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
      setSubmitStatus(false);
    }
  };

  return {
    handleSubmit,
  };
};
