import { useState, useEffect } from 'react';

//util
const getShuffledArr = (arr) => {
  const shuffledArr = [...arr];
  for (let i = shuffledArr.length -1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [shuffledArr[i], shuffledArr[randomIndex]] = [shuffledArr[randomIndex], shuffledArr[i]];
  }
  return shuffledArr;
}

//const
const START_MESSAGE = 'Plant yo flowers...';

const MemoryGame = ({ images }) => {
  const [shuffledImages, setShuggledImages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState(START_MESSAGE);

  const shuffle = () => {
    const doubledImages = images.reduce((acc = [], curr) => {
      return [...acc, curr, curr];
    }, []);
    setShuggledImages(getShuffledArr(doubledImages));
  }

  useEffect(() => {
    shuffle();
  }, [])

  const handleClick = ({index, image}) => {
    const prevSelected = [...selected];
    setSelected(prev => [...prev, {index, image}])

    if (selected.length === 11) {
      setMessage('Nooice!!!');
      setTimeout(() => {
        setSelected([]);
        shuffle();
        setMessage(START_MESSAGE);
      }, 3000);
    }

    if (!prevSelected.some(p => p.image === image) && prevSelected.length % 2 !== 0) {
      setTimeout(() => {
        prevSelected.pop();
        setSelected(prevSelected);
      }, 1000);
    }
  }

  return (
    <div className="wrapper">
      <h1>{message}</h1>
      <div className={selected.length === 12 ? 'cards hyperspace' : 'cards'}>
        {shuffledImages.map((image, index) => {
          const isSelected = selected.some(s => s.index === index);

          return (
            <div
              key={index}
              className={`flip-card`}
              onClick={() => !isSelected && handleClick({ index, image })}
            >
              <div className={`flip-card-inner ${isSelected ? 'flipped' : ''}`}>
                <div className="flip-card-front">
                </div>
                <div className="flip-card-back">
                  <img
                    src={image}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
