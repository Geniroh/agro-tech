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
                  className="cursor-pointer hover:text-[#760246]"
                >
                  <li>Introduction</li>
                </Link>
                <Link
                  href="#information-we-collect"
                  className="cursor-pointer hover:text-[#760246]"
                >
                  <li>Information we collect</li>
                </Link>

                <div className="flex flex-col gap-3 ml-5">
                  <Link
                    href="#information-provided"
                    className="cursor-pointer hover:text-[#760246]"
                  >
                    <li>a. Information you provide</li>
                  </Link>
                  <Link
                    href="#automatic-information"
                    className="cursor-pointer hover:text-[#760246]"
                  >
                    <li>b. Information we collect</li>
                  </Link>
                  <Link
                    href="#third-party-information"
                    className="cursor-pointer hover:text-[#760246]"
                  >
                    <li>c. Information from Third Party</li>
                  </Link>
                  <Link
                    href="#cookie-policy"
                    className="cursor-pointer hover:text-[#760246]"
                  >
                    <li>d. Cookies and similar technologies</li>
                  </Link>
                </div>
                <Link
                  href="#information-use"
                  className="cursor-pointer hover:text-[#760246]"
                >
                  <li>How we use your information</li>
                </Link>
                <Link
                  href="#information-share"
                  className="cursor-pointer hover:text-[#760246]"
                >
                  <li>How we share your information</li>
                </Link>
                <Link
                  href="#rights"
                  className="cursor-pointer hover:text-[#760246]"
                >
                  <li>Your Rights and Choices</li>
                </Link>
                <Link
                  href="#data-security"
                  className="cursor-pointer hover:text-[#760246]"
                >
                  <li>Data Security</li>
                </Link>
                <Link
                  href="#data-transfers"
                  className="cursor-pointer hover:text-[#760246]"
                >
                  <li>International Data Transfer</li>
                </Link>
                <Link
                  href="#children-privacy"
                  className="cursor-pointer hover:text-[#760246]"
                >
                  <li>Children&apos;s Privacy</li>
                </Link>
                <Link
                  href="#privacy-change"
                  className="cursor-pointer hover:text-[#760246]"
                >
                  <li>Changes to the privacy policy</li>
                </Link>
                <Link
                  href="#contact"
                  className="cursor-pointer hover:text-[#760246]"
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

            <div id="rights">
              <h2 className="font-bold text-[18px] leading-[36px]">
                Share Your Information
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">
                {`We do not sell, trade, or rent your personal information to third parties. We may share your information under the following circumstances:`}
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
                5. Your Rights and Choices
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">{`Depending on your location, you may have certain rights regarding your personal information:`}</p>
              <ul className="list-disc ml-10 space-y-4 text-[#333] mb-5 leading-[24px] ">
                <li>{`Access: Request access to your personal information.`}</li>
                <li>{`Correction: Request that we correct inaccurate or incomplete information.`}</li>
                <li>{`Deletion: Request deletion of your personal information`}</li>
                <li>{`Portability: Request a copy of your personal information in a structured, machine-readable format.`}</li>
                <li>{`Restriction: Request restriction of processing of your personal information.`}</li>
                <li>{`Objection: Object to our reliance on our legitimate interests as the basis of our processing of your personal information`}</li>
                <li>{`Opt-out: Opt-out of the sale of your personal information (if applicable)`}</li>
              </ul>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">{`To exercise these rights, please contact us using the information provided in the "Contact Us" section.`}</p>
            </div>

            <div id="data-transfers">
              <h2 className="font-bold text-[18px] leading-[36px]">
                6. Data Security
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">{`We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure.`}</p>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">{`Data Retention: We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.`}</p>
            </div>

            <div id="children-privacy">
              <h2 className="font-bold text-[18px] leading-[36px]">
                7. International Data Transfer
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">
                {`We may transfer your personal information to countries other than the country in which you are located. When we transfer personal information across borders, we take appropriate safeguards to protect your information in accordance with this Privacy Policy and applicable law.`}
              </p>
            </div>

            <div id="privacy-change">
              <h2 className="font-bold text-[18px] leading-[36px]">
                8. Children Privacy
              </h2>
              <div className="space-y-4 text-[#333] mb-5 leading-[24px]">
                <p>
                  {`Our Services are not directed to children under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18 without parental consent, we will take steps to remove that information.`}
                </p>
              </div>
            </div>

            <div id="contact">
              <h2 className="font-bold text-[18px] leading-[36px]">
                9. Changes to This Privacy Policy
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">
                {`We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.`}
              </p>
            </div>

            <div id="">
              <h2 className="font-bold text-[18px] leading-[36px]">
                10. Contact
              </h2>
              <p className="space-y-4 text-[#333] mb-5 leading-[24px]">
                {`If you have any questions about this Privacy Policy or our privacy practices, please contact us at: Semper Lux Limited`}
              </p>
            </div>
          </div>
          <div className="space-y-4 text-[#777] text-[14px] mb-5 leading-[24px] mt-20">
            <p>
              Esther Court, 16b Kunle Ogunba Street, Lekki Phase 1, Lagos,
              Nigeria{" "}
              <Link
                href="mailto:support@fitted.ng"
                className="text-[#760246] underline"
              >
                support@fitted.ng
              </Link>{" "}
              <Link
                href="tel:+2349083680999"
                className="text-[#760246] underline"
              >
                +234 908 368 0999
              </Link>
            </p>
            <p>
              For EU/EEA Residents: Data Protection Officer contact information
              →{" "}
              <Link
                href="mailto:support@fitted.ng"
                className="text-[#760246] underline"
              >
                support@fitted.ng
              </Link>
              <br></br> For California Residents:{" "}
              <Link
                href="mailto:support@fitted.ng"
                className="text-[#760246] underline"
              >
                support@fitted.ng
              </Link>
            </p>

            <p className="border-t pt-3">
              By using the Platform, you acknowledge that you have read,
              understood, and agreed to be bound by this Privacy Policy
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PrivacyPage;
