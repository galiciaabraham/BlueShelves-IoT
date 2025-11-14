// src/components/Footer.tsx
'use client';

import { FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-4 border-t text-center text-sm text-gray-600 dark:text-gray-400">
      <p>© {currentYear} Your Website. All rights reserved.</p>
      <div className="space-x-4 flex justify-center items-center mt-2">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
    </footer>
  );
}
