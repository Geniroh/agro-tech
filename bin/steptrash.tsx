// "use client"
// import React, { useRef, useState } from 'react';
// import { CiImageOn } from "react-icons/ci";

// interface StyledFileInputProps {
//   id: string;
//   name: string;
//   onChange: (file: File | null) => void;
//   placeholder?: string;
//   className?: string;
// }

// export const StyledFileInput: React.FC<StyledFileInputProps> = ({ id, name, onChange, placeholder, className }) => {
//   const [fileName, setFileName] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;
//     setFileName(file ? file.name : null);
//     onChange(file);
//   };

//   return (
//     <div className={`relative ${className} bg-[#fafafa] w-full min-h-[90px] flex items-center justify-center`} >
//       <input
//         id={id}
//         name={name}
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//       />
//       <div className="flex justify-center items-center h-full">
//         <span className='flex gap-x-2 items-center text-muted-foreground text-[14px] leading-[24px]'>
//           {fileName || placeholder || 'Upload a file'} <CiImageOn />
//         </span>
//       </div>
//     </div>
//   );
// };

// "use client";
// import React, { useRef, useState } from "react";
// import { CiImageOn } from "react-icons/ci";

// interface StyledFileInputProps {
//   id: string;
//   name: string;
//   onChange: (fileUrl: string | null) => void;
//   placeholder?: string;
//   className?: string;
// }

// export const StyledFileInput: React.FC<StyledFileInputProps> = ({
//   id,
//   name,
//   onChange,
//   placeholder,
//   className,
// }) => {
//   const [fileName, setFileName] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0] || null;
//     if (file) {
//       setFileName(file.name);
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         // Replace this URL with your actual backend URL
//         const response = await fetch("http://localhost:8080/api/upload", {
//           method: "POST",
//           body: formData,
//         });

//         if (response.ok) {
//           const data = await response.json();
//           const fileUrl = data.url; // Adjust according to your backend response structure
//           onChange(fileUrl);
//         } else {
//           console.error("File upload failed.");
//           onChange(null);
//         }
//       } catch (error) {
//         console.error("An error occurred while uploading the file:", error);
//         onChange(null);
//       }
//     } else {
//       setFileName(null);
//       onChange(null);
//     }
//   };

//   return (
//     <div
//       className={`relative ${className} bg-[#fafafa] w-full min-h-[90px] flex items-center justify-center`}
//     >
//       <input
//         id={id}
//         name={name}
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//       />
//       <div className="flex justify-center items-center h-full">
//         <span className="flex gap-x-2 items-center text-muted-foreground text-[14px] leading-[24px]">
//           {fileName || placeholder || "Upload a file"} <CiImageOn />
//         </span>
//       </div>
//     </div>
//   );
// };

// "use client"
// import React, { useEffect } from 'react';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useFormContext } from '@/context/FormContext';
// import { Form, FormControl, FormMessage, FormItem, FormField, FormLabel } from '@/components/ui/form';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Input } from "@/components/ui/input";
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { StyledFileInput } from '@/components/general/upload-input';

// const formSchema = z.object({
//   innovation_phase: z.string().min(2, { message: "Phase is required" }),
//   product_usage: z.string(),
//   product_description: z.string().min(2, { message: "Description is required." }),
//   product_media: z.instanceof(File),
// });

// const Step2: React.FC = () => {
//   const { formData, setFormData, currentStep, setCurrentStep, mySteps } = useFormContext();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: formData,
//     // mode: "onChange",
//   });

//   const saveData = (values: z.infer<typeof formSchema>) => {
//     setFormData({ ...formData, ...values });
//   };

//   const nextStep = () => {
//     if (currentStep < mySteps - 1) {
//       form.handleSubmit(saveData)();
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const saveStep = () => {
//     form.handleSubmit(saveData)();
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       setFormData({ ...formData, file: files[0] });
//     }
//   }

//   return (
//     <Form {...form}>
//       <div className='space-y-6'>
//         <FormField control={form.control} name="innovation_phase"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Implementation Phase</FormLabel>
//               <FormControl>
//                 <Select  value={field.value} onValueChange={(value: string) => field.onChange(value)}>
//                   <SelectTrigger className="w-full bg-[#fafafa]"><SelectValue placeholder="Select phase" /></SelectTrigger>
//                   <SelectContent position='popper'>
//                     <SelectItem value="testing">Testing</SelectItem>
//                     <SelectItem value="distribution">Distribution</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField control={form.control} name="product_usage"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Product Use</FormLabel>
//               <FormControl><Input {...field} placeholder="Please Enter Product Use" type="text" className='bg-[#fafafa]'/></FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField control={form.control} name="product_description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>About Product</FormLabel>
//               <FormControl>
//                 <Textarea {...field} placeholder="Please Enter A Brief Description Of Product" className='bg-[#fafafa]' rows={4}/>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="product_media"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Instance Media Upload</FormLabel>
//               <FormControl>
//                 <StyledFileInput
//                   id={"product_media"}
//                   name={"product_media"}
//                   placeholder="Click to add images/videos of product"
//                   onChange={(file) => field.onChange(file)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         </div>

//         <div className='mt-10 flex flex-col gap-y-4'>
//           <button className='disabled:cursor-not-allowed text-[16px] leading-[22px] font-semibold mt-10' onClick={prevStep} disabled={currentStep < 1}>Go Back</button>
//           <Button size="lg" variant="default" className=' text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-semibold disabled:cursor-not-allowed' onClick={form.handleSubmit(nextStep)} disabled={!(currentStep < mySteps - 1)}>Continue</Button>
//           <Button size="lg" variant="outline" className='text-[16px] leading-[22px] rounded-xl font-semibold border-[#242424]' onClick={saveStep}>Save Progress</Button>
//         </div>
//     </Form>
//   );
// };

// export default Step2;

// "use client";
// import React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useFormContext } from "@/context/FormContext";
// import {
//   Form,
//   FormControl,
//   FormMessage,
//   FormItem,
//   FormField,
//   FormLabel,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { StyledFileInput } from "@/components/general/upload-input";

// const formSchema = z.object({
//   innovation_phase: z.string().min(2, { message: "Phase is required" }),
//   product_usage: z.string(),
//   product_description: z
//     .string()
//     .min(2, { message: "Description is required." }),
//   product_media: z.string().url({ message: "A valid URL is required" }),
// });

// const Step2: React.FC = () => {
//   const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
//     useFormContext();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: formData,
//   });

//   const saveData = (values: z.infer<typeof formSchema>) => {
//     setFormData({ ...formData, ...values });
//   };

//   const nextStep = () => {
//     if (currentStep < mySteps - 1) {
//       form.handleSubmit(saveData)();
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const saveStep = () => {
//     form.handleSubmit(saveData)();
//   };

//   return (
//     <Form {...form}>
//       <div className="space-y-6">
//         <FormField
//           control={form.control}
//           name="innovation_phase"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Implementation Phase</FormLabel>
//               <FormControl>
//                 <Select
//                   value={field.value}
//                   onValueChange={(value: string) => field.onChange(value)}
//                 >
//                   <SelectTrigger className="w-full bg-[#fafafa]">
//                     <SelectValue placeholder="Select phase" />
//                   </SelectTrigger>
//                   <SelectContent position="popper">
//                     <SelectItem value="testing">Testing</SelectItem>
//                     <SelectItem value="distribution">Distribution</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="product_usage"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Product Use</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   placeholder="Please Enter Product Use"
//                   type="text"
//                   className="bg-[#fafafa]"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="product_description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>About Product</FormLabel>
//               <FormControl>
//                 <Textarea
//                   {...field}
//                   placeholder="Please Enter A Brief Description Of Product"
//                   className="bg-[#fafafa]"
//                   rows={4}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="product_media"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Instance Media Upload</FormLabel>
//               <FormControl>
//                 <StyledFileInput
//                   id={"product_media"}
//                   name={"product_media"}
//                   placeholder="Click to add images/videos of product"
//                   onChange={(fileUrl) => field.onChange(fileUrl)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="mt-10 flex flex-col gap-y-4">
//         <button
//           className="disabled:cursor-not-allowed text-[16px] leading-[22px] font-semibold mt-10"
//           onClick={prevStep}
//           disabled={currentStep < 1}
//         >
//           Go Back
//         </button>
//         <Button
//           size="lg"
//           variant="default"
//           className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-semibold disabled:cursor-not-allowed"
//           onClick={form.handleSubmit(nextStep)}
//           disabled={!(currentStep < mySteps - 1)}
//         >
//           Continue
//         </Button>
//         <Button
//           size="lg"
//           variant="outline"
//           className="text-[16px] leading-[22px] rounded-xl font-semibold border-[#242424]"
//           onClick={saveStep}
//         >
//           Save Progress
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default Step2;

// "use client"
// import React, { useState } from 'react';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useFormContext } from '@/context/FormContext';
// import { Form, FormControl, FormMessage, FormItem, FormField, FormLabel } from '@/components/ui/form';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { StyledFileInput } from '@/components/general/upload-input';

// const formSchema = z.object({
//   innovation_phase: z.string().min(2, { message: "Phase is required" }),
//   product_usage: z.string(),
//   product_description: z.string().min(2, { message: "Description is required." }),
//   product_media: z.object({
//     url: z.string().url({ message: "A valid URL is required" }),
//     name: z.string().min(1, { message: "File name is required" })
//   }),
// });

// const Step2: React.FC = () => {
//   const { formData, setFormData, currentStep, setCurrentStep, mySteps } = useFormContext();
//   const [isUploading, setIsUploading] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: formData,
//   });

//   const saveData = (values: z.infer<typeof formSchema>) => {
//     setFormData({ ...formData, ...values });
//   };

//   const nextStep = () => {
//     if (currentStep < mySteps - 1) {
//       form.handleSubmit(saveData)();
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const saveStep = () => {
//     form.handleSubmit(saveData)();
//   };

//   return (
//     <Form {...form}>
//       <div className='space-y-6'>
//         <FormField control={form.control} name="innovation_phase"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Implementation Phase</FormLabel>
//               <FormControl>
//                 <Select value={field.value} onValueChange={(value: string) => field.onChange(value)}>
//                   <SelectTrigger className="w-full bg-[#fafafa]"><SelectValue placeholder="Select phase" /></SelectTrigger>
//                   <SelectContent position='popper'>
//                     <SelectItem value="testing">Testing</SelectItem>
//                     <SelectItem value="distribution">Distribution</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField control={form.control} name="product_usage"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Product Use</FormLabel>
//               <FormControl><Input {...field} placeholder="Please Enter Product Use" type="text" className='bg-[#fafafa]'/></FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField control={form.control} name="product_description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>About Product</FormLabel>
//               <FormControl>
//                 <Textarea {...field} placeholder="Please Enter A Brief Description Of Product" className='bg-[#fafafa]' rows={4}/>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="product_media"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Instance Media Upload</FormLabel>
//               <FormControl>
//                 <StyledFileInput
//                   id={"product_media"}
//                   name={"product_media"}
//                   placeholder="Click to add images/videos of product"
//                   onChange={({ url, name }) => {
//                     field.onChange({ url, name });
//                     setIsUploading(!url);
//                   }}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className='mt-10 flex flex-col gap-y-4'>
//         <button className='disabled:cursor-not-allowed text-[16px] leading-[22px] font-semibold mt-10' onClick={prevStep} disabled={currentStep < 1}>Go Back</button>
//         <Button
//           size="lg"
//           variant="default"
//           className='text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-semibold disabled:cursor-not-allowed'
//           onClick={form.handleSubmit(nextStep)}
//           disabled={!(currentStep < mySteps - 1) || isUploading}
//         >
//           Continue
//         </Button>
//         <Button
//           size="lg"
//           variant="outline"
//           className='text-[16px] leading-[22px] rounded-xl font-semibold border-[#242424]'
//           onClick={saveStep}
//         >
//           Save Progress
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default Step2;

// "use client";
// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useFormContext } from "@/context/FormContext";
// import {
//   Form,
//   FormControl,
//   FormMessage,
//   FormItem,
//   FormField,
//   FormLabel,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { StyledFileInput } from "@/components/general/upload-input";

// const formSchema = z.object({
//   innovation_phase: z.string().min(2, { message: "Phase is required" }),
//   product_usage: z.string(),
//   product_description: z
//     .string()
//     .min(2, { message: "Description is required." }),
//   product_media_url: z.string().url({ message: "A valid URL is required" }),
//   product_media_name: z.string().min(1, { message: "File name is required" }),
// });

// const Step2: React.FC = () => {
//   const { formData, setFormData, currentStep, setCurrentStep, mySteps } =
//     useFormContext();
//   const [isUploading, setIsUploading] = useState(false);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: formData,
//   });

//   const saveData = (values: z.infer<typeof formSchema>) => {
//     setFormData({ ...formData, ...values });
//   };

//   const nextStep = () => {
//     if (currentStep < mySteps - 1) {
//       form.handleSubmit(saveData)();
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const saveStep = () => {
//     form.handleSubmit(saveData)();
//   };

//   return (
//     <Form {...form}>
//       <div className="space-y-6">
//         <FormField
//           control={form.control}
//           name="innovation_phase"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Implementation Phase</FormLabel>
//               <FormControl>
//                 <Select
//                   value={field.value}
//                   onValueChange={(value: string) => field.onChange(value)}
//                 >
//                   <SelectTrigger className="w-full bg-[#fafafa]">
//                     <SelectValue placeholder="Select phase" />
//                   </SelectTrigger>
//                   <SelectContent position="popper">
//                     <SelectItem value="testing">Testing</SelectItem>
//                     <SelectItem value="distribution">Distribution</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="product_usage"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Product Use</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   placeholder="Please Enter Product Use"
//                   type="text"
//                   className="bg-[#fafafa]"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="product_description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>About Product</FormLabel>
//               <FormControl>
//                 <Textarea
//                   {...field}
//                   placeholder="Please Enter A Brief Description Of Product"
//                   className="bg-[#fafafa]"
//                   rows={4}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="product_media_url"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Instance Media Upload</FormLabel>
//               <FormControl>
//                 <StyledFileInput
//                   id={"product_media"}
//                   name={"product_media"}
//                   placeholder="Click to add images/videos of product"
//                   onChange={({ url, name }) => {
//                     field.onChange(url);
//                     form.setValue("product_media_name", name || "");
//                     setIsUploading(!url);
//                   }}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="mt-10 flex flex-col gap-y-4">
//         <button
//           className="disabled:cursor-not-allowed text-[16px] leading-[22px] font-semibold mt-10"
//           onClick={prevStep}
//           disabled={currentStep < 1}
//         >
//           Go Back
//         </button>
//         <Button
//           size="lg"
//           variant="default"
//           className="text-white bg-[#329632] rounded-xl text-[16px] leading-[22px] font-semibold disabled:cursor-not-allowed"
//           onClick={form.handleSubmit(nextStep)}
//           disabled={!(currentStep < mySteps - 1) || isUploading}
//         >
//           Continue
//         </Button>
//         <Button
//           size="lg"
//           variant="outline"
//           className="text-[16px] leading-[22px] rounded-xl font-semibold border-[#242424]"
//           onClick={saveStep}
//         >
//           Save Progress
//         </Button>
//       </div>
//     </Form>
//   );
// };

// export default Step2;

const test = {
  innovation_cost: "20000",
  innovation_country: "Armenia",
  innovation_name: "Razorslasher",
  innovation_phase: "distribution",
  innovation_value_chain: "Farm su",
  innovation_year: "1980",
  instances: [
    {
      instance_description: "jhgjhhjk",
      instance_media: {
        url: "https://stavmia-backend-bucket.https://stavmia-bac…ucket.nyc3.digitaloceanspaces.com/plantation.jpeg",
        name: "plantation.jpeg",
      },
    },
  ],
  instructions: [
    {
      instruction_step: "jknkl",
    },
  ],
  inventor: [
    {
      inventor_name: "kjhh",
      inventor_email: "irochibuzor@gmail.com",
      inventor_contact: "123134245235",
    },
  ],
  isGenderFriendly: "false",
  isHSEGuideline: "true",
  isInstruction: "true",
  isInventor: "true",
  isSupplier: "true",
  isUsageExample: "true",
  product_description: "hgjhjkh",
  product_media: {
    name: "plantation.jpeg",
    " url":
      "https://stavmia-backend-bucket.https://stavmia-backend-bucket.nyc3.digitaloceanspaces.com/plantation.jpeg",
  },
  product_usage: "Milling",
  supplier: [
    {
      supplier_contact: "768890-",
      supplier_email: "irochibuzor@gmail.com",
      supplier_name: "yutuyiou",
    },
  ],
};
