import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Configuration () {
  const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('settings')) || {});
  const [turns, setTurns] = useState(settings.turns || 100);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  function handleChangeTurns(e) {
    e.preventDefault();
    setTurns(e.target.value);
    const numberTurns = parseInt(e.target.value);
    let difficulty = "personalized";
    switch (numberTurns) {
      case null:
        difficulty = "easy";
        break;
      case 100:
        difficulty = "easy";
        break;
      case 80:
        difficulty = "medium";
        break;
      case 50:
        difficulty = "hard";
        break;
      default:
        break;
    }
    setSettings({ 
      ...settings,
      turns: numberTurns ? numberTurns : 100,
      difficulty: numberTurns ? difficulty : 'easy',
    });
  }

  return (
    <div>
      <h1>Settings</h1>
      <h2>Select Difficulty</h2>
      <div>
        <button onClick={handleChangeTurns} value={""} name={"easy"}>Easy</button>
        <button onClick={handleChangeTurns} value={80} name={"medium"}>Medium</button>
        <button onClick={handleChangeTurns} value={50} name={"hard"}>Hard</button>
      </div>
      <h2>Turns</h2>
      <div>
        <input type="number" value={turns} onChange={handleChangeTurns} placeholder='infinite'/>
      </div>
      <Link to="/battle">Go to</Link>
    </div>
  )
}