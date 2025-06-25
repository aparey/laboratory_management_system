# LabTrack - Laboratory Sample Management System

<div align="center">
  <img src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop" alt="LabTrack Banner" width="100%" height="200" style="object-fit: cover; border-radius: 8px;">
  
  <h3>🧪 Modern Laboratory Sample Management & Data Analysis Platform</h3>
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)
</div>

## 📋 Overview

LabTrack is a comprehensive web-based laboratory management system designed to help scientists and researchers efficiently track samples, manage experiments, and analyze results across various laboratory workflows including cell-based assays, immunological studies, and separation techniques.

### 🎯 Key Features

- **📊 Sample Management**: Complete lifecycle tracking from creation to disposal
- **🧬 Experiment Tracking**: Monitor cell studies, immune assays, and separation experiments
- **📈 Data Analysis**: Interactive charts and visualizations for experiment results
- **🔍 Advanced Search & Filtering**: Quickly locate samples and experiments
- **🌙 Dark Mode Support**: Modern UI with light/dark theme switching
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ Real-time Updates**: Live status tracking and notifications

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aparey/laboratory_management_system.git
   cd labtrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── dashboard/       # Dashboard-specific components
│   └── navigation/      # Navigation components
├── pages/               # Main application pages
├── context/             # React context providers
├── data/                # Mock data and utilities
├── types/               # TypeScript type definitions
├── layouts/             # Page layout components
└── index.css           # Global styles and Tailwind imports
```

## 🧪 Core Functionality

### Sample Management
- **Create & Track**: Add new samples with detailed metadata
- **Status Monitoring**: Track sample lifecycle (Active, Depleted, Compromised, etc.)
- **Storage Management**: Monitor temperature, location, and expiration dates
- **Hierarchical Relationships**: Link parent and child samples

### Experiment Workflows
- **Multi-type Support**: Cell studies, immune assays, PCR, sequencing, microscopy
- **Protocol Management**: Standardized experimental procedures
- **Result Recording**: Capture numeric and text-based results
- **Timeline Tracking**: Monitor experiment progress and completion

### Data Analysis
- **Interactive Charts**: Sample distribution, experiment success rates, timeline analysis
- **Filtering & Search**: Advanced filtering by type, status, and date ranges
- **Export Capabilities**: Generate reports and export data
- **Insights Dashboard**: Automated recommendations and trend analysis

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#4f46e5) - Navigation and primary actions
- **Secondary**: Teal (#14b8a6) - Experiments and secondary elements  
- **Accent**: Amber (#f59e0b) - Warnings and highlights
- **Status Colors**: Green (success), Red (error), Blue (info), Gray (neutral)

### Typography
- **Font Family**: Inter - Clean, modern, and highly readable
- **Hierarchy**: Consistent sizing and spacing using Tailwind's type scale
- **Contrast**: WCAG AA compliant color contrast ratios

### Components
- **Cards**: Elevated surfaces with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline, danger)
- **Forms**: Consistent input styling with validation states
- **Tables**: Responsive data tables with sorting and filtering

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.5.3**: Type-safe development with excellent IDE support
- **Tailwind CSS 3.4.1**: Utility-first CSS framework for rapid styling
- **Vite 5.4.2**: Fast build tool and development server

### Data Visualization
- **Chart.js 4.4.1**: Flexible charting library for data visualization
- **React Chart.js 2**: React wrapper for Chart.js integration

### UI Components
- **Headless UI**: Unstyled, accessible UI components
- **Lucide React**: Beautiful, customizable icon library
- **React Router DOM**: Client-side routing and navigation

### Development Tools
- **ESLint**: Code linting and style enforcement
- **TypeScript ESLint**: TypeScript-specific linting rules
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefix addition

## 📱 Responsive Design

LabTrack is built with a mobile-first approach:

- **Mobile (320px+)**: Optimized touch interfaces and navigation
- **Tablet (768px+)**: Enhanced layouts with sidebar navigation
- **Desktop (1024px+)**: Full-featured interface with multi-column layouts
- **Large Screens (1280px+)**: Expanded content areas and data tables

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🎯 Use Cases

### Research Laboratories
- Track biological samples across multiple experiments
- Monitor sample quality and storage conditions
- Analyze experimental outcomes and success rates

### Clinical Testing
- Manage patient samples and test results
- Ensure compliance with storage requirements
- Generate reports for regulatory submissions

### Quality Control
- Track reagent batches and expiration dates
- Monitor equipment performance and calibration
- Maintain audit trails for compliance

### Academic Research
- Organize student research projects
- Share data across research groups
- Publish experimental protocols and results

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern laboratory management systems and scientific workflows
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent iconography
- **Images**: [Pexels](https://pexels.com/) for high-quality laboratory photography
- **Color Palette**: Carefully selected for accessibility and scientific aesthetics
