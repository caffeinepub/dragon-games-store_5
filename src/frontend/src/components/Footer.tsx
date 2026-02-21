export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'dragon-games-store');

  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-black text-sm">
          © {currentYear} Dragon Games Store. Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
