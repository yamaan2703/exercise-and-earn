"use client";
import Button from "@/components/ui/button";
import FaqModal from "@/components/ui/modal/faq-modal";
import { AuthContext } from "@/context/AuthContext";
import { ButtonSize, ButtonType, ButtonVariant } from "@/types/enums";
import { FaqType } from "@/types/interface";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Loader from "@/components/ui/loader";
import toast from "react-hot-toast";
import { useGetFaqsQuery } from "@/redux/slices/faqSlice";

const Faqs = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const [addFaqModal, setAddFaqModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { data, isLoading, isError } = useGetFaqsQuery("faq");

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch FAQs");
    }
  }, [isError]);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const faqs: FaqType[] = data?.content
    ? [{ id: 1, question: data.content, answer: answer }]
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <Loader size="xl" />
      </div>
    );
  }
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
      <div className="flex justify-end mb-2 mr-2">
        <Button
          type={ButtonType.BUTTON}
          label="Add Faq"
          onClick={() => {
            setQuestion("");
            setAnswer("");
            setAddFaqModal(true);
          }}
          variant={ButtonVariant.THEME}
          size={ButtonSize.SMALL}
        />
      </div>

      <div className="space-y-4">
        {faqs.length > 0 ? (
          faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-[#0a2c28] text-white p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <p
                  onClick={() => toggleFaq(faq.id)}
                  className="flex-1 flex justify-between items-center font-semibold text-left cursor-pointer"
                >
                  {faq.question}
                  {openFaq === faq.id ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )}
                </p>
              </div>

              {openFaq === faq.id && (
                <p className="mt-3 text-gray-300 text-sm">{faq.answer}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No FAQs found</p>
        )}
      </div>

      {addFaqModal && (
        <FaqModal
          label={"Add Faq"}
          setFaqModal={setAddFaqModal}
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
        />
      )}
    </div>
  );
};

export default Faqs;
