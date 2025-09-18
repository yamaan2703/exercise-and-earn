import { IconType } from "react-icons/lib";

interface CardProps {
  title: string;
  value: string | number;
  Icon: IconType;
}

const Card = ({ title, value, Icon }: CardProps) => {
  return (
    <div className="bg-[#0b2d29] rounded-xl shadow-md p-5 flex flex-col justify-between text-white hover:border hover:border-teal-500 w-full hover:scale-105 transition-transform duration-200">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{value}</h2>
        <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-400/10 flex items-center justify-center">
          <Icon className="text-2xl text-teal-400" />
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-gray-300">{title}</p>
    </div>
  );
};

export default Card;
