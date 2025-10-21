import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import CardContainer from "./components/CardContainer";
import CardSubContainer from "./components/CardSubContainer";

const MemoryGame = () => {
  const SIZE = [2, 4, 6, 8, 10];
  const [selectedSize, setSelectedSize] = useState("2");
  const [cardValues, setCardValues] = useState<any>([]);
  const [previousCard, setPreviousCard] = useState<any>();

  useEffect(() => {
    buildHiddenNumbers();
  }, [selectedSize]);

  const buildHiddenNumbers = () => {
    const lastNumber = (Number(selectedSize) * Number(selectedSize)) / 2;
    const numbers = [];
    for (let i = 1; i < lastNumber + 1; i++) {
      numbers.push({ hiddenNumber: i, isRevealed: false, isForzen: false });
    }
    const result = shuffleArray([
      ...numbers.map((n) => ({ ...n })),
      ...numbers.map((n) => ({ ...n })),
    ]);
    setCardValues(result);
    setPreviousCard({});
  };

  const cardClick = (
    cardIndex: number,
    cardNumber: number,
    action: "open" | "close"
  ) => {
    const newCardValues = [];
    const preRevealedCards = cardValues.filter((card: any) => card.isRevealed);

    // No card open or one card is open status
    if (preRevealedCards.length < 2) {
      // Check previous open card has same number
      const isPairCards =
        preRevealedCards.length &&
        preRevealedCards[0].hiddenNumber == cardNumber;

      // Same pair found flow
      if (isPairCards && action == "open") {
        for (let i = 0; i < cardValues.length; i++) {
          const card = cardValues[i];
          // Freezing the opened cards
          if (cardNumber == card.hiddenNumber) card.isFrozen = true;
          // Resetting the opened card status
          card.isRevealed = false;
          newCardValues.push(card);
        }
      } else {
        for (let i = 0; i < cardValues.length; i++) {
          const card = cardValues[i];
          if (i == cardIndex) {
            if (action == "open") {
              card.isRevealed = true;
            } else {
              card.isRevealed = false;
            }
          }
          newCardValues.push(card);
        }
      }
    } else {
      for (let i = 0; i < cardValues.length; i++) {
        const card = cardValues[i];
        if (i == cardIndex) {
          if (action == "open") {
            card.isRevealed = true;
          } else card.isRevealed = false;
        } else card.isRevealed = false;
        newCardValues.push(card);
      }
    }
    setCardValues([...newCardValues]);
  };

  const buildCard = () => {
    const cardRow = [];
    let cardEle: any = [];

    for (let i = 0; i < cardValues.length; i++) {
      const rowDeadLine = !((i + 1) % Number(selectedSize));
      cardEle.push(
        <Card
          index={i}
          isRevealed={cardValues[i].isRevealed}
          onClick={(cardIndex, cardNumber, action) =>
            cardClick(cardIndex, cardNumber, action)
          }
          cardNumber={cardValues[i].hiddenNumber}
          isFrozen={cardValues[i].isFrozen}
        />
      );

      if (rowDeadLine) {
        cardRow.push(<CardSubContainer>{cardEle}</CardSubContainer>);
        cardEle = [];
      }
    }
    return cardRow;
  };

  const shuffleArray = (array: any) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const buildSizeOptions = () =>
    SIZE.map((s) => (
      <option value={s} className="">
        {s}
      </option>
    ));

  return (
    <div className="flex flex-col items-center gap-4 bg-white dark:bg-gray-900 min-h-screen p-8">
      <div className="flex">
        <h3 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Memory Game
          </span>
        </h3>
        <span className="lg:text-5xl">🧐</span>
      </div>
      <CardContainer>{buildCard()}</CardContainer>
      <div className="flex justify-evenly" style={{ width: "380px" }}>
        <div>
          <label className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold text-2xl">
            Size :{" "}
          </label>
          <select
            defaultValue={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-24"
          >
            {buildSizeOptions()}
          </select>
        </div>
        <button
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => buildHiddenNumbers()}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;
