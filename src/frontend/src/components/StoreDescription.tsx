export default function StoreDescription() {
  return (
    <section className="bg-white py-12 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black mb-6">Welcome to Dragon Games Store</h1>
          
          <p className="text-lg text-black mb-4">
            Dragon Games Store is a trusted digital gaming marketplace committed to delivering high-quality games at competitive and affordable prices 🔥 🎮
          </p>
          
          <p className="text-lg text-black mb-8">
            With over <span className="font-bold">3 years</span> of industry experience, we have proudly built a community of <span className="font-bold">5,600+ satisfied customers</span> who rely on us for secure, smooth, and reliable purchases 🤝
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">Available Platforms</h2>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="flex flex-col items-center">
                <img src="/assets/generated/pc-icon.dim_64x64.png" alt="PC" className="w-16 h-16 mb-2" />
                <span className="text-black font-medium">PC</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/assets/generated/ps5-icon.dim_64x64.png" alt="PS5" className="w-16 h-16 mb-2" />
                <span className="text-black font-medium">PlayStation 5</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/assets/generated/ps4-icon.dim_64x64.png" alt="PS4" className="w-16 h-16 mb-2" />
                <span className="text-black font-medium">PlayStation 4</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/assets/generated/xbox-icon.dim_64x64.png" alt="Xbox" className="w-16 h-16 mb-2" />
                <span className="text-black font-medium">Xbox</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">✅ Why Choose Dragon Games Store?</h2>
            <ul className="text-left max-w-2xl mx-auto space-y-2 text-black">
              <li>🌍 Trusted by 5,600+ gamers worldwide</li>
              <li>💰 Competitive and affordable pricing</li>
              <li>📚 Wide availability of game titles</li>
              <li>🔒 Fast and secure service</li>
              <li>⚡ Responsive customer support</li>
              <li>🕐 24/7 Customer Support</li>
            </ul>
          </div>

          <p className="text-lg text-black italic">
            At Dragon Games Store, our mission is simple — to make premium gaming accessible, reliable, and affordable while maintaining professionalism and transparency
          </p>

          <p className="text-xl font-bold text-black mt-6">
            Join thousands of satisfied gamers and experience hassle-free game purchases with us today! 🎮
          </p>
        </div>
      </div>
    </section>
  );
}
