import { FC } from 'react';
import Banner from '../home/hero/Banner';
import GameNav from '../home/hero/GameNav';
import Originals from '../home/hero/Originals';
import TrendingGames from '../home/hero/TrendingGames';

const Hero: FC = () => {
  return (
    <div className="space-y-8">
      <Banner />
      <TrendingGames />
      <GameNav />
      <Originals />
    </div>
  );
};

export default Hero;