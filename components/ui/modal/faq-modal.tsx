"use client";
import Input from "../input";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  InputSize,
  InputVariant,
} from "@/types/enums";
import Button from "../button";
import { FaqModalProps } from "@/types/interface";
import toast from "react-hot-toast";
import { usePostFaqMutation } from "@/redux/slices/faqSlice";

const FaqModal = (props: FaqModalProps) => {
  const {
    label,
    setFaqModal,
    question,
    setQuestion,
    answer,
    setAnswer,
    onSave,
  } = props;
  const [postFaq, { isLoading }] = usePostFaqMutation();

  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) {
      toast.error("Both fields are required!");
      return;
    }

    try {
      await postFaq({ question, answer }).unwrap();

      toast.success("FAQ added!");
      setFaqModal(false);
      setQuestion("");
      setAnswer("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add FAQ");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
      <div className="bg-[#06211e] text-white w-[90%] max-w-sm rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold">{label}</h2>
          <button
            onClick={() => setFaqModal(false)}
            className="text-white hover:text-gray-400 cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="mt-4 space-y-3">
          <Input
            id="question"
            type="text"
            label="Question"
            placeholder="Enter question..."
            value={question}
            setValue={setQuestion}
            variant={InputVariant.OUTLINE}
            size={InputSize.SMALL}
            required
          />

          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Answer
            </label>
            <textarea
              id="answer"
              placeholder="Enter answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-2 rounded-md bg-[#0b2a27] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none h-20"
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button
              type={ButtonType.BUTTON}
              label={isLoading ? "Saving..." : label}
              onClick={onSave ? onSave : handleSave}
              variant={ButtonVariant.THEME}
              size={ButtonSize.SMALL}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqModal;
