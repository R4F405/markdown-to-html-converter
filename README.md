# Markdown Pro - Live Markdown Editor & Converter

<p align="center">
  A sleek, modern, and real-time Markdown editor built for developers, writers, and content creators. Instantly convert your Markdown into clean, beautifully styled HTML with a live preview that updates as you type.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.2.0-646CFF?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
</p>

---

## 📋 About The Project

**Markdown Pro** provides a seamless and efficient writing experience by offering a side-by-side live preview of your Markdown content. The editor is designed to be intuitive and distraction-free, allowing you to focus on your writing while the application handles the conversion and styling in real-time.

This project was built using a modern tech stack to ensure a fast, responsive, and maintainable application.

### ✨ Key Features

* **⚡ Real-Time Live Preview**: See your rendered HTML update instantly as you type in the Markdown editor.
* **↔️ Flexible Layouts**: Switch between **Edit**, **Split**, and **Preview** modes to fit your workflow.
* **📋 Copy to Clipboard**: Instantly copy the generated HTML source code with a single click.
* **💾 Download HTML**: Export your final rendered content as a fully-styled, self-contained `.html` file.
* **💅 Beautiful Typography**: Thanks to the Tailwind CSS Typography plugin, the output is clean, readable, and professional right out of the box.
* **🚀 Built with Modern Tools**: Powered by React, Vite, and Tailwind CSS for a lightning-fast development experience and a highly optimized build.

---

## 🛠️ Tech Stack

This project is built with a curated set of modern frontend technologies:

* **[Vite](https://vitejs.dev/)**: A next-generation frontend build tool for a faster and leaner development experience.
* **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
* **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
    * **[Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin)**: A plugin for generating beautiful typographic defaults.
* **[React Markdown](https://github.com/remarkjs/react-markdown)**: A powerful and safe component to render Markdown.
* **[Lucide React](https://lucide.dev/)**: A beautiful and consistent icon library.

---

## ⚡ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
* **Node.js** (v18.x or newer recommended)
* **npm** (comes with Node.js)

    ```sh
    node -v
    npm -v
    ```

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/react-markdown-converter.git](https://github.com/your-username/react-markdown-converter.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd react-markdown-converter
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Important: Install Tailwind CSS & Typography Plugin**

    This project is configured for **Tailwind CSS v3.x**. Version 4.x may cause build errors without additional configuration. The typography plugin is essential for styling the HTML preview.

    ```sh
    npm install -D tailwindcss@^3.3.3 postcss autoprefixer @tailwindcss/typography
    ```
    After installation, ensure your `tailwind.config.js` includes the typography plugin:
    ```js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [
        require('@tailwindcss/typography'), // This line is crucial
      ],
    }
    ```

5.  **Run the development server:**
    ```sh
    npm run dev
    ```

6.  Open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
