import React from "react";

type CardProps = {
  name: string;
  value: string | number;
};

const Card = ({ name, value }: CardProps) => {
  return (
    <div className="bg-blue-950 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-white m-4">
      <span className="text-sm font-medium text-gray-200">{name}</span>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
};

export default Card;
