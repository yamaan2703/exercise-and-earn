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
  const { label, setFaqModal, question, setQuestion, answer, setAnswer } =
    props;
  const [postFaq, { isLoading }] = usePostFaqMutation();

  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) {
      toast.error("Both fields are required!");
      return;
    }

    try {
      const payload = { content: JSON.stringify({ question, answer }) };
      const res = await postFaq(payload).unwrap();

      if (res.success) {
        toast.success("FAQ added!");
        setFaqModal(false);
        setQuestion("");
        setAnswer("");
      } else {
        toast.error(res.error || "Failed to add FAQ");
      }
    } catch (err) {
      toast.error("Something went wrong!");
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
            type={ButtonType.BUTTON}
            externalStyles="mt-3"
            label={isLoading ? "Saving..." : label}
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
