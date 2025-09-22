"use client";
import { AuthContext } from "@/context/AuthContext";
import { faqs } from "@/Data/Data";
import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Faqs = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          FAQs
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-[#0a2c28] text-white p-4 rounded-lg shadow-md"
          >
            <button
              onClick={() => toggleFaq(faq.id)}
              className="w-full flex justify-between items-center font-semibold"
            >
              {faq.question}
              {openFaq === faq.id ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
            {openFaq === faq.id && (
              <p className="mt-3 text-gray-300 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
