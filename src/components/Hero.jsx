function Hero({ onGetStarted }) {
  return (
    <div className="hero">
      <h1>Discover Your Perfect Gemstone</h1>
      <p>
        Ancient wisdom meets modern technology. Find the perfect gemstone that aligns with your zodiac sign and life goals.
      </p>
      <button className="cta-button" onClick={() => document.querySelector('.nav-links button')?.click()}>
        Get Started ✨
      </button>
    </div>
  )
}

export default Hero