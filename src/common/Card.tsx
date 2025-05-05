import React from "react";

type CardProps = {
  name: string;
  value: string | number;
};

const Card = ({ name, value }: CardProps) => {
  return (
    <div className="bg-[#1B1F3B] p-6 rounded-xl flex flex-col items-center justify-center text-white m-4 border-orange-700 shadow-md shadow-orange-800">
      <span className="text-sm font-medium text-gray-200">{name}</span>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
};

export default Card;
