"use client";
import Button from "@/components/ui/button";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import FaqModal from "@/components/ui/faq-modal";
import { AuthContext } from "@/context/AuthContext";
import { initialFaqs } from "@/Data/Data";
import { ButtonSize, ButtonVariant } from "@/types/enums";
import { FaqType } from "@/types/interface";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMenu } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa";

const Faqs = () => {
  const { setIsSidebarOpen, faqDeleteModal, setFaqDeleteModal } =
    useContext(AuthContext)!;
  const [addFaqModal, setAddFaqModal] = useState(false);
  const [editFaqModal, setEditFaqModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FaqType[]>(initialFaqs);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [currentFaqId, setCurrentFaqId] = useState<number | null>(null);
  const [faqToDelete, setFaqToDelete] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleEditFaq = (faq: FaqType) => {
    setCurrentFaqId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditFaqModal(true);
  };

  const deleteFaq = (id: number) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== id));
    toast.success("Faq deleted!");
    setFaqDeleteModal(false);
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
      <div className="flex justify-end mb-2 mr-2">
        <Button
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
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-[#0a2c28] text-white p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="flex-1 flex justify-between items-center font-semibold text-left"
              >
                {faq.question}
                {openFaq === faq.id ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>

              <div className="flex items-center gap-3 ml-4">
                <FaEdit
                  className="cursor-pointer text-white hover:text-gray-300"
                  onClick={() => handleEditFaq(faq)}
                />
                <FaTrash
                  className="cursor-pointer text-white hover:text-gray-300 "
                  onClick={() => {
                    setFaqDeleteModal(true);
                    setFaqToDelete(faq.id);
                  }}
                />
              </div>
            </div>

            {openFaq === faq.id && (
              <p className="mt-3 text-gray-300 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      {(addFaqModal || editFaqModal) && (
        <FaqModal
          label={addFaqModal ? "Add Faq" : "Edit Faq"}
          setFaqs={setFaqs}
          setFaqModal={addFaqModal ? setAddFaqModal : setEditFaqModal}
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
          buttonLabel={addFaqModal ? "Add Faq" : "Edit Faq"}
          currentFaqId={currentFaqId}
        />
      )}

      {faqDeleteModal && faqToDelete !== null && (
        <ConfirmationModal
          title="Confirm Faq Delete"
          description="Are you sure you want to delete this faq?"
          onClick={() => deleteFaq(faqToDelete)}
          onCancel={() => setFaqDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Faqs;
