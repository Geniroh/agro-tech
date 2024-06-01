// "use client"
// import { UploadForm1 } from '@/components/data/upload-forms/upload-form1'
// import { UploadForm2 } from '@/components/data/upload-forms/upload-form2'
// import BreadcrumbP from '@/components/general/my-breadcrumb'
// import { FormProvider } from '@/context/UploadContext'
// import React from 'react'

// const UploadPage = () => {
//   return (
//     <FormProvider>
//         <div className='container'>
//             <BreadcrumbP fromHref='/' fromTitle='Back to Home' toHref='/upload' toTitle='Upload Invention Page' />

            // <h1 className='w-full text-center text-4xl font-playfair font-semibold mt-[50px]'>Upload Innovation</h1>
            // <h3 className='text-muted-foreground text-md w-full text-center my-3'>fill out this form accurately and Concisely</h3>

//                 <div className='w-full max-w-[600px] mx-auto mt-[30px]'>
//                     <UploadForm2 />

//                     <UploadForm1 />
                
//                 <div>
//             </div>
//             </div>
//         </div>
//     </FormProvider>
//   )
// }

// export default UploadPage


"use client"
import Image from "next/image";

import React from 'react';
import { FormProvider } from '@/context/FormContext';
import BreadcrumbP from '@/components/general/my-breadcrumb'
import MultiStepForm from '@/components/multi-step-form';

const UploadPage = () => {
  return (
    <FormProvider>
      <div className="container pb-20">
          <BreadcrumbP fromHref='/' fromTitle='Back to Home' toHref='/upload' toTitle='Upload Invention Page' />
          <h1 className='w-full text-center text-4xl font-playfair font-semibold mt-[50px]'>Upload Innovation</h1>
          <h3 className='text-muted-foreground text-md w-full text-center my-3 mb-5'>fill out this form accurately and Concisely</h3>
          <MultiStepForm />
      </div>
    </FormProvider>
  );
};

export default UploadPage;















// // pages/index.tsx
// import React from 'react';
// import { FormProvider, useFormContext } from '../context/FormContext';
// import FormLayout from '../components/FormLayout';
// import Step1 from '../components/Step1';
// import Step2 from '../components/Step2';
// import Step3 from '../components/Step3';

// const MultiStepForm: React.FC = () => {
//   const { step } = useFormContext();

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return <Step1 />;
//       case 2:
//         return <Step2 />;
//       case 3:
//         return <Step3 />;
//       default:
//         return <Step1 />;
//     }
//   };

//   return (
//     <FormLayout>
//       {renderStep()}
//     </FormLayout>
//   );
// };

// const HomePage: React.FC = () => (
//   <FormProvider>
//     <MultiStepForm />
//   </FormProvider>
// );

// export default HomePage;
