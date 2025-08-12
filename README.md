# Tokenizer Web

A modern, AI-powered text tokenization web application built with Next.js 15, TypeScript, and Tailwind CSS. Convert text into tokens and understand how AI models process and encode content.

## Features

- 🚀 **Modern UI/UX** - Beautiful, responsive design with dark/light theme support
- 🎨 **Theme System** - Automatic theme detection with manual toggle options
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔤 **Advanced Typography** - Inter font for UI, JetBrains Mono for code
- 🎯 **Real-time Tokenization** - See tokens as you type
- 📊 **Detailed Analysis** - Comprehensive token breakdown and statistics
- 🔔 **Toast Notifications** - User-friendly feedback with react-hot-toast
- 🎭 **Smooth Animations** - Elegant transitions and hover effects

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **Notifications**: react-hot-toast
- **Icons**: Heroicons (SVG)
- **Fonts**: Inter + JetBrains Mono (Google Fonts)
- **Deployment**: GitHub Pages with GitHub Actions

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is configured for GitHub Pages deployment.

### Automatic Deployment (Recommended)

1. Push your code to the `production` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at: `https://ranvijaychouhan12.github.io/Tokenizer-GenAI-web`

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The static files will be generated in the `out/` directory

3. Deploy the `out/` directory to GitHub Pages

## Build Output

The project is configured with `output: 'export'` in `next.config.ts`, which generates static HTML files suitable for GitHub Pages hosting.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
