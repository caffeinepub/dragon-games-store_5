import type { Game } from '../backend';
import { X } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/whatsapp';

interface GameDetailModalProps {
  game: Game;
  onClose: () => void;
}

export default function GameDetailModal({ game, onClose }: GameDetailModalProps) {
  const price = Number(game.price);

  const handleBuyNow = () => {
    const whatsappUrl = generateWhatsAppUrl(price);
    window.open(whatsappUrl, '_blank');
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">{game.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              <iframe
                src={getEmbedUrl(game.trailerUrl)}
                title={`${game.name} trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-black mb-3">Description</h3>
            <p className="text-black whitespace-pre-wrap">{game.description}</p>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="text-3xl font-bold text-blue-600">₹{price}/-</div>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-700 transition-colors"
          >
            Buy Now on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
