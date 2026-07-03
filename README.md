# The Chopra Case: An Interactive Journey

An immersive web application exploring the 1978 Ranga-Billa criminal case in New Delhi, featuring interactive maps, forensic evidence analysis, and historical documentation.

## Features

- **Interactive Map**: Navigate through key locations in Delhi
- **Satellite Radar**: Visualize geographical zones relevant to the case
- **Forensic Lab**: Examine evidence with UV and laser scanning
- **Evidence Gallery**: Browse photographs and artifacts
- **Legal Timeline**: D3-powered interactive timeline
- **Audio Vault**: Listen to reconstructed radio communications
- **Fact vs. Fiction**: Compare historical facts with dramatized portrayals
- **Multiple Languages**: English and Hindi support

## Prerequisites

- Node.js (v16+)
- npm or yarn

## Setup and Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd thechopracase
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

To test the production build locally:

```bash
npm run preview
```

## Type Checking

Check for TypeScript errors:

```bash
npm run lint
```

## Deployment

This is a static React + Vite application that can be deployed to any static hosting service:

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the dist/ folder to Netlify
```

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
npm run build
firebase deploy
```

### AWS S3 + CloudFront

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name/
```

### Render

Connect your GitHub repository to Render and set:
- Build command: `npm install && npm run build`
- Start command: `npm run preview`
- Publish directory: `dist`

## Project Structure

```
├── src/
│   ├── components/        # React components
│   ├── data/             # Application data
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Apache License 2.0

## Authors

A comprehensive historical documentation and interactive visualization of the 1978 Ranga-Billa case.
