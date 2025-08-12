"use client";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/50 dark:border-slate-700/50 bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white text-lg">
                Tokenizer Web
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              A modern AI-powered text tokenization tool that helps you
              understand how AI models process and encode text content. Convert
              your text into tokens and explore the fascinating world of natural
              language processing.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>• Real-time text tokenization</li>
              <li>• Dark/Light theme support</li>
              <li>• Detailed token analysis</li>
              <li>• Copy-paste functionality</li>
              <li>• Responsive design</li>
              <li>• Token decoder</li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/RV-React-Projects/Tokenizer-GenAI-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200/50 dark:border-slate-700/50 mt-8 pt-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Made with ❤️ and ☕ by{" "}
            <a
              href="https://github.com/ranvijaychouhan12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Ranvijay Chouhan
            </a>{" "}
            • © {currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
