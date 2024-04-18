import React, { useState } from 'react';


function WordScorer() {
  const [word, setWord] = useState('');
  const [scoredWords, setScoredWords] = useState([]);

  const scoreWord = (word) => {
    const score = word.toLowerCase().split('').reduce((acc, char) => {
      const charCode = char.charCodeAt(0) - 96; 
      return acc + charCode;
    }, 0);
    return score;
  };

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const handleScoreWord = () => {
    const score = scoreWord(word);
    const newScoredWords = [...scoredWords, { word, score }];
    setScoredWords(newScoredWords);
    setWord('');
  };

  const sortWords = (type) => {
    const sortedWords = [...scoredWords];
    if (type === 'length') {
      sortedWords.sort((a, b) => a.word.length - b.word.length);
    } else if (type === 'alphabetically') {
      sortedWords.sort((a, b) => a.word.localeCompare(b.word));
    } else if (type === 'score') {
      sortedWords.sort((a, b) => a.score - b.score);
    }
    setScoredWords(sortedWords);
  };

  return (
    <div>
      <input type="text" value={word} onChange={handleInputChange} placeholder="Enter a word" />
      <button onClick={handleScoreWord}>Score</button>

      <div className="container">
        <button onClick={() => sortWords('length')}>Sort by Length</button>
        <button onClick={() => sortWords('alphabetically')}>Sort Alphabetically</button>
        <button onClick={() => sortWords('score')}>Sort by Score</button>
      </div>

      <ul>
        {scoredWords.map((wordObj, index) => (
          <li key={index}>{wordObj.word} - <strong>Score:</strong> {wordObj.score}</li>
        ))}
      </ul>
    </div>
  );
}

export default WordScorer;
