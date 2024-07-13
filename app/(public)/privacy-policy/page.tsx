"use client";

import { FC, useContext, useEffect } from "react";
import Link from "next/link";
import { Footer } from "@/components/general/footer";
import { Navbar } from "@/components/general/navbar";

const PrivacyPage: FC = () => {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetElement = document.getElementById(hash.replace("#", ""));
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    scrollToHash();

    const handleHashChange = () => {
      scrollToHash();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return (
    <>
      <Navbar />
      <section className="max-w-[1200px] mx-auto mt-10 flex gap-6 relative">
        <div className="md:w-[23%] hidden md:flex flex-col min-h-[400px] max-h-[80vh] sticky top-[100px] p-5 overflow-auto bg-[#fefbfb] shadow-sm">
          <h3 className="text-[10px]  mb-5">Outline</h3>
          <div>
            <div>
              <ul className="ml-5 text-gray-600 flex flex-col gap-3 text-[14px]">
                <Link
                  href="#introduction"
                  className="cursor-pointer hover:text-mygreen"
                >
                  <li>Introduction</li>
                </Link>
                <Link
                  href="#information-we-collect"
                  className="cursor-pointer hover:text-mygreen"
                >
                  <li>Information we collect</li>
                </Link>

                <Link
                  href="#information-share"
                  className="cursor-pointer hover:text-mygreen"
                >
                  <li>Share your information</li>
                </Link>
                <Link
                  href="#data-security"
                  className="cursor-pointer hover:text-mygreen"
                >
                  <li>Data Security</li>
                </Link>
                <Link
                  href="#rights"
                  className="cursor-pointer hover:text-mygreen"
                >
                  <li>Your Rights and Choices</li>
                </Link>

                <Link
                  href="#policy-change"
                  className="cursor-pointer hover:text-mygreen"
                >
                  <li>Changes to this policy</li>
                </Link>
                <Link
                  href="#contact"
                  className="cursor-pointer hover:text-mygreen"
                >
                  <li>Contact Us</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:w-[77%] w-full pb-20 px-5 ">
          <h1 className="font-bold text-[32px] mb-2" id="introduction">
            Data Privacy Policy
          </h1>
          <div>
            <div
              className="space-y-4 text-[#333] mb-5 leading-[24px]"
              id="information-we-collect"
            >
              <h2 className="font-bold text-[18px] leading-[36px]">
                Introduction
              </h2>
              <p>
                {`Welcome to STAVMiA. We value your privacy and are committed to protecting your personal data. This Data Privacy Policy outlines how we collect, use, and protect your information when you use our platform. By accessing or using STAVMiA, you agree to the terms of this policy.`}
              </p>
            </div>
            <div id="information-use">
              <h2 className="font-bold text-[18px] leading-[36px]">
                Information we collect
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">
                {`We collect the following types of information to provide and improve our services:`}
              </p>
              <ul className="list-decimal ml-10 space-y-4 text-[#333] mb-5 leading-[24px] ">
                <ol>
                  <span className="font-bold">1. Personal Information: </span>
                  {`This includes your name, contact details (email address and phone number), physical address, occupation, and other information you provide during registration or through your use of the platform.`}
                </ol>
                <ol>
                  <span className="font-bold">2. Usage data: </span>
                  {`We may collect information on how you access and use the platform, including your interactions with our services, IP address, browser type, and operating system.`}
                </ol>
                <ol>
                  <span className="font-bold">
                    3. Cookies and Tracking Technologies:{" "}
                  </span>
                  {`We use cookies and similar technologies to enhance your experience on our platform, remember your preferences, and collect usage data.`}
                </ol>
              </ul>
            </div>

            <div id="information-share">
              <h2 className="font-bold text-[18px] leading-[36px]">
                How We Use Your Information
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">
                {`We use the information we collect for the following purposes:`}
              </p>
              <ul className="list-decimal ml-10 space-y-4 text-[#333] mb-5 leading-[24px] ">
                <ol>
                  <span className="font-bold">
                    1. To provide and improve our services:{" "}
                  </span>
                  {`Ensuring you have access to and can effectively use the features of the platform, and to enhance user experience.`}
                </ol>
                <ol>
                  <span className="font-bold">
                    2. To communicate with you:{" "}
                  </span>
                  {`Sending you updates, promotional materials, and other information related to our services.`}
                </ol>
                <ol>
                  <span className="font-bold">3. To improve our services</span>
                  {`Understanding how you use the platform to enhance user experience and develop new features.`}
                </ol>
                <ol>
                  <span className="font-bold">
                    4. For Analytics and Research
                  </span>
                  {`Understanding how you use the platform to improve our services and develop new features.`}
                </ol>
              </ul>
            </div>

            <div id="data-security">
              <h2 className="font-bold text-[18px] leading-[36px]">
                Share Your Information
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">
                {`We do not sell, trade, or rent your personal information to third parties. We may share your information under the following circumstances:`}
              </p>
              <ul className="list-decimal ml-10 space-y-4 text-[#333] mb-5 leading-[24px] ">
                <ol>
                  <span className="font-bold">1. With Service Providers: </span>
                  {`Trusted third-party service providers who assist us in operating the platform and delivering our services, under strict confidentiality agreements.`}
                </ol>
                <ol>
                  <span className="font-bold">2. For Legal Reasons: </span>
                  {`When required by law or in response to legal processes, we may disclose your information to comply with legal obligations.`}
                </ol>
                <ol>
                  <span className="font-bold">3. Business Transfers: </span>
                  {`In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity, provided they continue to honor this policy.`}
                </ol>
              </ul>
            </div>

            <div id="rights">
              <h2 className="font-bold text-[18px] leading-[36px]">
                Data Security
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">{`We implement robust security measures to protect your personal information from unauthorized access, alteration, or destruction. While we strive to use commercially acceptable means to protect your data, no method of transmission over the Internet or electronic storage is 100% secure.`}</p>
            </div>

            <div id="policy-change">
              <h2 className="font-bold text-[18px] leading-[36px]">
                Your Rights and Choices
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">{`You have the following rights regarding your personal information:`}</p>
              <ul className="list-decimal ml-10 space-y-4 text-[#333] mb-5 leading-[24px] ">
                <ol>
                  <span className="font-bold">1. Access and Correction: </span>
                  {`You can access and update your personal information through your account settings.`}
                </ol>
                <ol>
                  <span className="font-bold">2. Deletion: </span>
                  {`You can request the deletion of your personal information by contacting us. We will comply with your request, subject to any legal obligations.`}
                </ol>
                <ol>
                  <span className="font-bold">3. Opt-Out: </span>
                  {`You can opt-out of receiving promotional communications by following the unsubscribe instructions in those communications.`}
                </ol>
              </ul>
            </div>

            <div id="conclusion">
              <h2 className="font-bold text-[18px] leading-[36px]">
                Changes to this Policy
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">
                {`We may update this Data Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of the platform after the changes take effect constitutes your acceptance of the revised policy.`}
              </p>
            </div>

            <div id="">
              <h2 className="font-bold text-[18px] leading-[36px]">
                Conclusion
              </h2>
              <div className="space-y-4 text-[#333] mb-5 leading-[24px]">
                <p>
                  {`If you have any questions or concerns about this Data Privacy Policy or our data practices, please contact us at [contact email or address].`}
                </p>
                <p>{`Effective Date: July 1, 2024.`}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PrivacyPage;
