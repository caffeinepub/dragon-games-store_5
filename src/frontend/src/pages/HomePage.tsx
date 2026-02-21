import StoreDescription from '../components/StoreDescription';
import GameCatalog from '../components/GameCatalog';

export default function HomePage() {
  return (
    <div className="w-full">
      <StoreDescription />
      <GameCatalog />
    </div>
  );
}
