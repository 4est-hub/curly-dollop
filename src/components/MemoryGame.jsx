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
      <div className={selected.length === 12 ? 'tiles hyperspace' : 'tiles'}>
        {shuffledImages.map((image, index) => {
          if (selected.some(s => s.index === index)) {
            return (
              <div className="tile" key={index}>
                <img
                  key={image}
                  src={image}
                  style={{ width: "200px", height: "200px", objectFit: 'cover' }}
                />
              </div>
            )
          }

          return (<div key={index} className="tile" onClick={() => handleClick({index, image})}></div>)
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
