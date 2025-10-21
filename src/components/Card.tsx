import React, { ReactNode, useState } from "react";

type CardProps = {
  index: number;
  onClick: (index: number, cardNumber: number,action:'open'|'close') => void;
  cardNumber: any;
  isRevealed: boolean;
  isFrozen: boolean;
};

const Card = (props: CardProps) => {
  const { index, onClick, cardNumber, isRevealed, isFrozen } = props;
  if (isFrozen) {
    return (
      <div className="relative inline-flex items-center justify-center  text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-24 h-24">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md font-bold text-4xl">
          {cardNumber}
        </span>
      </div>
    );
  }
  return (
    <div className="cursor-pointer">
      {isRevealed ? (
        <div 
        onClick={() => onClick(index, cardNumber,'close')} 
        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 w-24 h-24">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md font-bold text-4xl">
            {cardNumber}
          </span>
        </div>
      ) : (
        <div
          id="card"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-24 h-24"
           onClick={() => onClick(index, cardNumber,'open')} 
        />
      )}
    </div>
  );
};

export default Card;
