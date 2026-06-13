# ✨ GemWise - Gemstone Recommendation App

GemWise is a modern web application that helps users discover their perfect gemstone based on their **zodiac sign** and **life goals**. The app combines ancient astrological wisdom with modern technology to provide personalized gemstone recommendations instantly. 💎

---

## ✨ Features

✅ Personalized recommendations based on zodiac sign and life goals  
✅ 8 Gemstones with detailed information (Ruby, Emerald, Pearl, Diamond, Red Coral, Yellow Sapphire, Blue Sapphire, Amethyst)  
✅ Multi-image display (Gemstone, Ring, Necklace, Bracelet images)  
✅ Search gemstones by name with real-time filtering  
✅ Compare up to 2 gemstones side by side  
✅ Recommendation history saved in browser  
✅ Dark/Light mode toggle  
✅ Form validation (Name: only letters, Age: 1-120 years)  
✅ Fully responsive on mobile, tablet, and desktop  

---

## 🛠️ Technologies Used

- **React 19** + **Vite** – Frontend framework
- **Custom CSS** – Styling with brown earthy theme
- **Lucide React** – Icons
- **LocalStorage** – Save history and preferences
- **JSON** – Gemstone data storage

---

## ⚙️ How It Works

1. User fills in Name, Age, Zodiac Sign, and Life Goal
2. System validates the form inputs
3. App matches zodiac sign with gemstone mapping
4. Displays personalized gemstone with images and details
5. User can search, compare, or save to history
6. Dark mode preference is saved automatically

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/DiyaTiwari13/gemwise.git

# Navigate to project folder
cd gemwise

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173/

# Live Application: https://resonant-blancmange-7915a5.netlify.app/
---

## 📁 Project Structure

gemwise/
├── public/gemstones/     # Gemstone images (40+ files)
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── data/            # gemstones.json
│   ├── App.jsx          # Main app
│   ├── App.css          # All styles
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── README.md

---

## 🎮 How to Use

PAGE           FUCNTION
Home           View app introduction and features
Recommend	   Fill form to get personalized gemstone
Search	       Search gemstones by name
Compare        Compare 2 gemstones side by side
History	       View past recommendations

---

## 🎨 Color Palette

COLOR               HEX CODE       USAGE
Primary Brown	   #964B00	      Headers, buttons, accents
Secondary Brown    #A9784E	      Dark mode accents
Light Cream	       #F9F0E4	      Light mode background
Deep Brown	       #2a1806	      Dark mode background

---

## 📊 Gemstone Mapping

ZODIAC SIGN	                 GEMSTONE
Aries, Leo	                 Ruby
Taurus, Gemini, Virgo	     Emerald
Cancer	                     Pearl
Libra	                     Diamond
Scorpio	                     Red Coral
Sagittarius, Pisces	         Yellow Sapphire
Capricorn	                 Blue Sapphire
Aquarius	                 Amethyst

---

## 📌 Conclusion

GemWise demonstrates how React can create a beautiful, functional gemstone recommendation system. The app provides an efficient, user-friendly platform for discovering the perfect gemstone based on individual zodiac signs and life goals. 🚀
