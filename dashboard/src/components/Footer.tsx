// src/components/Footer.tsx
'use client';

export default function Footer() {
  return (
    <footer className="px-6 py-4 border-t text-center text-sm text-gray-600 dark:text-gray-400">
      <p>© 2024 Your Website. All rights reserved.</p>
      <div className="space-x-4">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗</a>
      </div>
    </footer>
  );
}
