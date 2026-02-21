import { useState } from 'react';
import { useAddGame } from '../hooks/useAddGame';
import { ExternalBlob } from '../backend';

export default function AddGameForm() {
  const [name, setName] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const addGameMutation = useAddGame();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please select an image');
      return;
    }

    try {
      const imageBytes = new Uint8Array(await imageFile.arrayBuffer());
      const imageBlob = ExternalBlob.fromBytes(imageBytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await addGameMutation.mutateAsync({
        name,
        image: imageBlob,
        trailerUrl,
        description,
        price: BigInt(price),
      });

      setName('');
      setTrailerUrl('');
      setDescription('');
      setPrice('');
      setImageFile(null);
      setUploadProgress(0);
      alert('Game added successfully!');
    } catch (error) {
      console.error('Error adding game:', error);
      alert('Failed to add game. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-black mb-6">Add New Game</h2>

      <div className="mb-4">
        <label className="block text-black font-medium mb-2">Game Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-black font-medium mb-2">Game Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black"
        />
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-black mt-1">Uploading: {uploadProgress}%</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-black font-medium mb-2">Trailer Video URL</label>
        <input
          type="url"
          value={trailerUrl}
          onChange={(e) => setTrailerUrl(e.target.value)}
          required
          placeholder="https://youtube.com/watch?v=..."
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-black font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black resize-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-black font-medium mb-2">Price (₹)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black"
        />
      </div>

      <button
        type="submit"
        disabled={addGameMutation.isPending}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {addGameMutation.isPending ? 'Adding Game...' : 'Add Game'}
      </button>
    </form>
  );
}
