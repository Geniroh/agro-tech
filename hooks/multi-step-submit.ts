// import { useFormContext } from "@/context/FormContext";

// interface FormData {
//   [key: string]: any;
// }

// export const useFormSubmit = () => {
//   const { formData, setFormData, setCurrentStep, setMySteps, setSubmitStatus } =
//     useFormContext();

//   const handleSubmit = async (data: FormData) => {
//     // e.preventDefault();

//     // Perform your form submission logic here

//     try {
//       console.log("Form submitted successfully", formData);

//       // Clear local storage
//       localStorage.removeItem("formData");
//       localStorage.removeItem("currentStep");
//       localStorage.removeItem("totalSteps");

//       // Reset the state to reflect cleared storage
//       setFormData({});
//       setCurrentStep(0);
//       setMySteps(1);
//       setSubmitStatus(true);
//     } catch (error) {
//       console.error("Form submission failed", error);
//       setSubmitStatus(false);
//     }
//   };

//   return {
//     handleSubmit,
//   };
// };

import { useFormContext } from "@/context/FormContext";

interface FormData {
  [key: string]: any;
}

export const useFormSubmit = () => {
  const { formData, setFormData, setCurrentStep, setMySteps, setSubmitStatus } =
    useFormContext();

  const handleSubmit = async (data: FormData) => {
    try {
      console.log("Before clearing:", {
        formData: localStorage.getItem("formData"),
        currentStep: localStorage.getItem("currentStep"),
        totalSteps: localStorage.getItem("totalSteps"),
      });

      // Clear local storage
      localStorage.removeItem("formData");
      localStorage.removeItem("currentStep");
      localStorage.removeItem("totalSteps");

      // Reset the state to reflect cleared storage
      setFormData({});
      setCurrentStep(0);
      setMySteps(1);
      setSubmitStatus(true);

      console.log("After clearing:", {
        formData: localStorage.getItem("formData"),
        currentStep: localStorage.getItem("currentStep"),
        totalSteps: localStorage.getItem("totalSteps"),
      });
    } catch (error) {
      console.error("Form submission failed", error);
      setSubmitStatus(false);
    }
  };

  return {
    handleSubmit,
  };
};
