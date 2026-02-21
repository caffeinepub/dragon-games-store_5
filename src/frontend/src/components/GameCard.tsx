import { useState } from 'react';
import type { Game } from '../backend';
import { generateWhatsAppUrl } from '../utils/whatsapp';
import GameDetailModal from './GameDetailModal';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const imageUrl = game.image.getDirectURL();
  const price = Number(game.price);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const whatsappUrl = generateWhatsAppUrl(price);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="flex-shrink-0 w-80 bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative"
      >
        <div className="relative">
          <img src={imageUrl} alt={game.name} className="w-full h-64 object-cover" />
          
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-4 py-1 rounded-md font-bold text-sm">
            SALE!
          </div>

          <div className="absolute top-3 right-3 bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-xl shadow-lg">
            ₹{price}/-
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold text-black mb-3 line-clamp-2">{game.name}</h3>
          
          <button
            onClick={handleBuyNow}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>

      {showDetail && <GameDetailModal game={game} onClose={() => setShowDetail(false)} />}
    </>
  );
}
