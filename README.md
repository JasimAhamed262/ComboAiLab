A modern web application built with React featuring real time chat functionality, authentication, and a beautiful dark/light theme.

## Features

- 💬 Real-time chat interface
- 🔐 Authentication with Clerk
- 🌓 Dark/Light theme support
- ⚡ Built with Next.js 14 App Router
- 🎨 Styled with Tailwind CSS
- 🧩 shadcn/ui components
- 📱 Fully responsive design

## Tech Stack

- **Framework:** React (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Clerk
- **Theme:** next-themes
- **Fonts:** Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-name>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs (optional - customize these)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── _components/      # Reusable components
│   │   └── ChatinputBox.js
│   ├── layout.js         # Root layout with providers
│   ├── page.js           # Home page
│   ├── provider.js       # Theme provider wrapper
│   └── globals.css       # Global styles
├── components/
│   └── ui/               # shadcn/ui components
├── public/               # Static assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Configuration

### Adding shadcn/ui Components

```bash
npx shadcn-ui@latest add [component-name]
```

### Customizing Theme

Edit `app/globals.css` to customize colors and theme variables.

## Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy on Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- Render
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign in page URL | No |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign up page URL | No |

## Troubleshooting

### Build Error: `useSearchParams()` Suspense Boundary

If you encounter this error, wrap components using `useSearchParams()` in a Suspense boundary:

```javascript
import { Suspense } from 'react'

<Suspense fallback={<div>Loading...</div>}>
  <YourComponent />
</Suspense>
```

### Hydration Errors

Make sure `suppressHydrationWarning` is added to the `<html>` tag when using theme providers.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

