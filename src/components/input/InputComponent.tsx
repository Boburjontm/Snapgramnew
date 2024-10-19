import { FC } from "react";
import { UserInfo } from "../../types";

const Input: FC<{ item: UserInfo }> = ({ item }) => {
  const { id, span_name, name, type } = item; 

  return (
    <label key={id} className="flex flex-col space-y-3">
      <span className="font-medium capitalize text-xs sm:text-sm md:text-base lg:text-lg">{span_name}</span> 
      <input
        required
        name={name}
        className="bg-dark-400 outline-none p-2 sm:p-3 rounded transition-all duration-300 focus:ring-2 focus:ring-primary-500" 
        type={type}
      />
    </label>
  );
};

export default Input;
