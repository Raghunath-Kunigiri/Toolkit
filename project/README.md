# 🛠️ Tools Collection - React Frontend

A modern, responsive web application built with React, TypeScript, and Tailwind CSS that provides various utility tools including a comprehensive PDF converter with 16+ conversion options.

## ✨ Features

### 🎯 Main Categories
- **File Operations** - PDF converters, image converters, file organizers
- **Web Tools** - Link extractors, website analyzers, scrapers
- **Security Tools** - Password generators, encryption utilities
- **Utilities** - Calculators, timers, system tools
- **Multimedia** - Image processors, audio/video tools

### 📄 PDF Converter Highlights
- **16 Conversion Types** including:
  - PDF ↔ Image (PNG, JPEG, BMP, TIFF)
  - PDF ↔ Word/Excel/PowerPoint
  - PDF ↔ Text
  - Merge/Split PDFs
  - Rotate/Compress PDFs
  - Protect/Unlock PDFs
- **Real-time conversion** with progress tracking
- **Drag & drop** file upload
- **Batch processing** support
- **Download management** with individual/bulk downloads

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd project

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Deploy to Vercel

1. **Quick Deploy:**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo)

2. **Manual Deployment:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

3. **GitHub Integration:**
   - Connect your GitHub repository to Vercel
   - Automatic deployments on push to main branch
   - Preview deployments for pull requests

### Build Configuration
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Deployment:** Vercel
- **File Processing:** Built-in browser APIs (Canvas, File, Blob)

## 📁 Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── ExecutionModal.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── PDFConverterModal.tsx
│   │   ├── ProjectCard.tsx
│   │   └── Sidebar.tsx
│   ├── data/
│   │   └── projects.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── public/
├── package.json
├── vercel.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 UI Components

### Core Components
- **Header** - Navigation and branding
- **Sidebar** - Category filtering
- **ProjectCard** - Tool display cards
- **HeroSection** - Landing page content
- **PDFConverterModal** - Advanced PDF processing interface
- **ExecutionModal** - General tool execution interface

### Design System
- **Colors:** Tailwind CSS palette
- **Typography:** System fonts with Tailwind classes
- **Icons:** Lucide React icon library
- **Layout:** Responsive grid system
- **Animations:** CSS transitions and hover effects

## 🔧 Configuration Files

### Vercel Configuration (`vercel.json`)
```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Vite Configuration
- TypeScript support
- React plugin
- Path resolution
- Development server settings

### Tailwind Configuration
- Custom color palette
- Responsive breakpoints
- Plugin integrations

## 📱 Browser Support

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Features Used:**
  - ES2020+ JavaScript
  - CSS Grid & Flexbox
  - File API
  - Canvas API
  - Blob API

## 🚨 Environment Variables

No environment variables required for basic functionality. All processing happens client-side.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check existing documentation
- Review the code comments for implementation details

## 🔄 Updates & Roadmap

### Current Features
- ✅ 16 PDF conversion types
- ✅ Responsive design
- ✅ Real file downloads
- ✅ Progress tracking
- ✅ Error handling

### Planned Features
- 🔄 Additional file format support
- 🔄 Batch processing improvements
- 🔄 Cloud storage integration
- 🔄 User preferences
- 🔄 Conversion history

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
