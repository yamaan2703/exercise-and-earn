"use client";
import Input from "./input";
import {
  ButtonSize,
  ButtonVariant,
  InputSize,
  InputVariant,
} from "@/types/enums";
import Button from "./button";
import { FaqModalProps } from "@/types/interface";
import toast from "react-hot-toast";

const FaqModal = ({
  label,
  setFaqs,
  setFaqModal,
  question,
  setQuestion,
  answer,
  setAnswer,
  buttonLabel,
  currentFaqId,
}: FaqModalProps) => {
  const handleSave = () => {
    if (!question.trim() || !answer.trim) {
      toast.error("Both fields are required!");
      return;
    }

    if (currentFaqId) {
      setFaqs((prev) =>
        prev.map((faq) =>
          faq.id === currentFaqId ? { ...faq, question, answer } : faq
        )
      );
      toast.success("Faq updated!");
    } else {
      setFaqs((prev) => [...prev, { id: prev.length + 1, question, answer }]);
      toast.success("Faq added!");
    }

    setFaqModal(false);
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
      <div className="bg-[#06211e] text-white w-[90%] max-w-sm rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold">{label}</h2>
          <button
            onClick={() => setFaqModal(false)}
            className="text-white hover:text-gray-400  cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <Input
            id="question"
            type="text"
            placeholder="Enter question..."
            value={question}
            setValue={setQuestion}
            variant={InputVariant.DEFAULT}
            size={InputSize.SMALL}
            required
          />
          <Input
            id="answer"
            type="text"
            placeholder="Enter answer..."
            value={answer}
            setValue={setAnswer}
            variant={InputVariant.DEFAULT}
            size={InputSize.SMALL}
            required
          />
          <Button
            externalStyles="mt-3"
            label={buttonLabel}
            onClick={handleSave}
            variant={ButtonVariant.THEME}
            size={ButtonSize.SMALL}
          />
        </div>
      </div>
    </div>
  );
};

export default FaqModal;
