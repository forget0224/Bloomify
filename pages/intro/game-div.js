// pages/game/game-start.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const GameStartRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // 導航至 /game.html
    router.push('/game.html');
  }, []);

  return null;
};

export default GameStartRedirect;
