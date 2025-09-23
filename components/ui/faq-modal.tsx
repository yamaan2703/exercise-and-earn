"use client";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import Input from "./input";
import {
  ButtonSize,
  ButtonVariant,
  InputSize,
  InputVariant,
} from "@/types/enums";
import { AuthContext } from "@/context/AuthContext";
import Button from "./button";
import { FaqType } from "@/types/interface";
import toast from "react-hot-toast";

const FaqModal = ({
  setFaqs,
}: {
  setFaqs: Dispatch<SetStateAction<FaqType[]>>;
}) => {
  const { setFaqModal } = useContext(AuthContext)!;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const addFaq = () => {
    setFaqs((prev) => [...prev, { id: prev.length + 1, question, answer }]);
    toast.success("Faq added!");
    setFaqModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
      <div className="bg-[#06211e] text-white w-[90%] max-w-sm rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold">Add Faq</h2>
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
            label="Add Faq"
            onClick={() => addFaq()}
            variant={ButtonVariant.THEME}
            size={ButtonSize.SMALL}
          />
        </div>
      </div>
    </div>
  );
};

export default FaqModal;
