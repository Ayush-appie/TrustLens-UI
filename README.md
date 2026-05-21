# 🛡️ TrustLens UI — Cyber-Security & Media Forensics Portal

[![Live Demo](https://img.shields.io/badge/Demo-Live_on_GitHub_Pages-00ffcc?style=for-the-badge&logo=github&logoColor=black)](https://Ayush-appie.github.io/TrustLens-UI/)
[![React Version](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)

> **TrustLens** is a next-generation, high-fidelity security intelligence portal. Designed with a cyber-industrial dark aesthetic, it equips analysts and everyday users with an interactive, multi-layered defense suite for verifying digital media, evaluating smart contracts, analyzing domains, and fact-checking claims in real-time.

---

## ✨ Features

### 🔍 1. Media Forensics & Deepfake Detection
* **Interactive Compare Slider:** Visually contrast modified or deepfaked images against their original counterparts.
* **Pixel Anomaly Markers:** Overlay visual grids and thermal-style anomaly bounds (like noise variance and structural mismatch highlights).
* **Forensic Metrics:** Track structural similarity index (SSIM), peak signal-to-noise ratio (PSNR), and deepfake probability models in real-time.

### 📤 2. Advanced Dropzone Metadata Scanner
* **Deep File Analysis:** Drop any image or document to perform instant client-side inspection.
* **AI Compression Waveform:** Watch interactive canvas animations visualising bit-rate scanning.
* **EXIF Extraction:** Instantly read latent metadata logs, including geotags, camera signatures, and software modification timestamps.

### 🌐 3. Web3 EVM Smart Contract Auditor
* **EVM Risk Checker:** Input any public Ethereum/EVM address to audit ledger interactions.
* **Automated Threat Assessment:** Scans for reentrancy vectors, honeypot patterns, unverified bytecodes, and owner-privilege abuse.
* **Risk Score Dial:** Beautifully animated visual gauges ranging from **Safe** to **Critical Danger**.

### 🔗 4. Web Safety & Typo-squatting Analyzer
* **Domain Security Audit:** Paste any web address to run quick blacklist, phishing, and registrar age checks.
* **Typo-Squatting Detection:** Calculates Levenshtein-style distances to flag spoofing or look-alike URLs.
* **SSL & Threat Analysis:** Radial animated meters illustrating overall domain threat percentage.

### 🤖 5. Multi-Agent AI Fact Checker
* **Consensus Chat Protocol:** Engage with a distributed system of specialized AI agents (Media Verifier, Ledger Auditor, Cyber Investigator).
* **Consensus Verdicts:** Outputs a collective rating (**True**, **Misleading**, or **False**) with specific reasoning.
* **Automated Citations:** Generates source trust scores, verification timestamps, and structured citation indexes.

---

## 🛠️ Technology Stack

* **Core Framework:** React 19 (TypeScript)
* **Build Engine:** Vite 5 (Optimized for Node 20.x environment compatibility)
* **Styling & Theme:** Tailwind CSS v4 (Cyber HSL palette, dark mode standard)
* **Animations:** Framer Motion v12 & Vanilla CSS Transitions
* **Icons:** Lucide React

---

## 📂 Project Structure

```bash
frontend-react/
├── src/
│   ├── components/            # Key Interactive Modules
│   │   ├── CompareSlider.tsx    # Split-screen comparison slider
│   │   ├── DropzoneScanner.tsx  # Drag & drop EXIF / waveform parser
│   │   ├── Web3Auditor.tsx      # Public address ledger auditor
│   │   ├── DomainAnalyzer.tsx   # Domain safety & typosquatting checker
│   │   └── FactChecker.tsx      # Multi-agent consensus fact checker
│   ├── App.tsx                # Dashboard container, tabs & state
│   ├── index.css              # Glassmorphic themes & Tailwind configuration
│   └── main.tsx               # SPA React entry point
├── vite.config.ts             # Custom compiler pathing for GitHub Pages
└── package.json               # Modular dependencies
```

---

## ⚡ Quick Start & Development

### 1. Prerequisites
Ensure you have **Node.js (v20 or higher)** and **npm** installed.

### 2. Installation
Clone the repository and install all required node modules:
```bash
# Navigate to the react app directory
cd frontend-react

# Install dependencies
npm install
```

### 3. Local Development Server
Launch the hot-reloading development server locally:
```bash
npm run dev
```
Open [http://localhost:5173/TrustLens-UI/](http://localhost:5173/TrustLens-UI/) in your browser.

### 4. Build Production Bundle
Create an optimized static build:
```bash
npm run build
```
The compiled SPA will reside inside the `dist/` directory.

---

## 🚀 Deployment Orchestration

We maintain an automated deployment workflow via a custom PowerShell script (`deploy.ps1`) situated at the root directory.

The pipeline performs the following steps:
1. **Source Control:** Synchronizes the `frontend-react` source code and pushes changes to the `main` branch.
2. **Compilation:** Standardizes the compilation sequence within the `dist/` workspace.
3. **GitHub Pages Publishing:** Generates a `.nojekyll` token, packages built assets into the isolated `gh-pages` branch, and pushes the bundle force-upstream.

To deploy the latest changes:
```powershell
./deploy.ps1
```

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

*Designed & developed for absolute visual transparency and high-fidelity cyber intelligence.*
