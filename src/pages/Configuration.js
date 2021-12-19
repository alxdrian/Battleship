import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonContainer, GameContainer, InfoContainer, PageContainer } from '../components/UI/Container';
import { ContentRegular, Title } from '../components/UI/Text';
import { Button, IconButton } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { HomeIcon, PlayIcon } from '../components/UI/Icon';

export default function Configuration () {
  const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('settings')) || {});
  const [userName, setUserName] = useState(settings.userName || '');
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

  function handleChangeUserName(e) {
    e.preventDefault();
    setUserName(e.target.value);
    setSettings({
      ...settings,
      userName: e.target.value,
    });
  }

  return (
    <PageContainer>
      <GameContainer orientation={"vertical"}>
        <Title>Settings</Title>
        <ContentRegular>Select Difficulty</ContentRegular>
        <ButtonContainer>
          <Button onClick={handleChangeTurns} value={""} name={"easy"}>Easy</Button>
          <Button onClick={handleChangeTurns} value={80} name={"medium"}>Medium</Button>
          <Button onClick={handleChangeTurns} value={50} name={"hard"}>Hard</Button>
        </ButtonContainer>
        <ContentRegular>Turns</ContentRegular>
        <Input type="number" value={turns} onChange={handleChangeTurns} placeholder='infinite' min="1"/>
        <ContentRegular>User</ContentRegular>
        <Input type="text" value={userName} onChange={handleChangeUserName} placeholder='user name'/>
        <ButtonContainer>
          <Link to="/battle">
            <Button>
              <PlayIcon />
              <ContentRegular>BATTLE</ContentRegular>
            </Button>
          </Link>
          <Link to="/">
            <IconButton>
              <HomeIcon />
            </IconButton>
          </Link>
        </ButtonContainer>
      </GameContainer>
    </PageContainer>
  )
}