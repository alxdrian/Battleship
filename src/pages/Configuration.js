import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Configuration () {
  const [turns, setTurns] = useState("");

  useEffect(() => {
    localStorage.setItem('turns', turns);
  }, [turns]);

  function handleChangeTurns(e) {
    e.preventDefault();
    setTurns(e.target.value);
  }

  return (
    <div>
      <h1>Settings</h1>
      <h2>Select Difficulty</h2>
      <div>
        <button onClick={handleChangeTurns} value={""}>Easy</button>
        <button onClick={handleChangeTurns} value={100}>Medium</button>
        <button onClick={handleChangeTurns} value={50}>Hard</button>
      </div>
      <h2>Turns</h2>
      <div>
        <input type="number" value={turns} onChange={handleChangeTurns} placeholder='infinite'/>
      </div>
      <Link to="/battle">Go to</Link>
    </div>
  )
}