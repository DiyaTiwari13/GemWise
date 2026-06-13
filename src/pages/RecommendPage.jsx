import { useState } from 'react'
import RecommendationForm from '../components/RecommendationForm'
import GemstoneCard from '../components/GemstoneCard'
import gemstonesData from '../data/gemstones.json'

function RecommendPage({ onRecommendation, recommendation, setRecommendation }) {
  const [showResult, setShowResult] = useState(false)
  const gemstones = gemstonesData.gemstones

  const getGemstoneRecommendation = (zodiac, goal) => {
    const mapping = {
      'Aries': 'Ruby',
      'Taurus': 'Emerald',
      'Gemini': 'Emerald',
      'Cancer': 'Pearl',
      'Leo': 'Ruby',
      'Virgo': 'Emerald',
      'Libra': 'Diamond',
      'Scorpio': 'Red Coral',
      'Sagittarius': 'Yellow Sapphire',
      'Capricorn': 'Blue Sapphire',
      'Aquarius': 'Amethyst',
      'Pisces': 'Yellow Sapphire'
    }

    const mainGemstoneName = mapping[zodiac]
    const mainGemstone = gemstones.find(g => g.name === mainGemstoneName)
    
    let reason = `Based on your zodiac sign ${zodiac}, ${mainGemstoneName} is your primary gemstone. `
    
    const goalReasons = {
      'Career': 'This powerful stone will enhance your professional growth, leadership qualities, and help you achieve career success.',
      'Wealth': 'This prosperity-attracting stone opens doors to financial abundance and business opportunities.',
      'Health': 'This healing gemstone promotes physical vitality, emotional balance, and overall wellness.',
      'Education': 'This wisdom stone improves focus, memory retention, and academic performance.',
      'Marriage': 'This love stone brings harmony, understanding, and strengthens relationships.'
    }
    
    reason += goalReasons[goal] || 'This stone brings overall success and positivity to your life.'
    
    return {
      mainGemstone,
      alternative: gemstones.find(g => g.name === mainGemstone?.alternative),
      reason
    }
  }

  const handleSubmit = (formData) => {
    const recommendation = getGemstoneRecommendation(formData.zodiac, formData.goal)
    onRecommendation(formData, recommendation)
    setRecommendation(recommendation)
    setShowResult(true)
  }

  const handleNewRecommendation = () => {
    setShowResult(false)
    setRecommendation(null)
  }

  return (
    <div className="recommend-page">
      {!showResult ? (
        <>
          <div className="page-header">
            <h1>🔮 Find Your Perfect Gemstone</h1>
            <p>Fill in your details to receive a personalized gemstone recommendation</p>
          </div>
          <RecommendationForm onSubmit={handleSubmit} />
        </>
      ) : (
        <div className="recommendation-result">
          <div className="result-header">
            <button onClick={handleNewRecommendation} className="back-btn">
              ← Get New Recommendation
            </button>
          </div>
          
          <div className="result-content">
            <h2>Your Personalized Recommendation</h2>
            
            {recommendation?.mainGemstone && (
              <GemstoneCard 
                gemstone={recommendation.mainGemstone} 
                reason={recommendation.reason}
              />
            )}
            
            {recommendation?.alternative && (
              <div className="alternative-section">
                <h3>💎 Alternative Gemstone Recommendation</h3>
                <p>If {recommendation.mainGemstone?.name} is not available, you can also consider:</p>
                <GemstoneCard 
                  gemstone={recommendation.alternative} 
                  isAlternative={true}
                />
              </div>
            )}
            
            <div className="wearing-tips">
              <h3>📿 Wearing Tips</h3>
              <ul>
                <li>Always consult a certified gemstone expert before wearing</li>
                <li>Energize your gemstone before first use</li>
                <li>Clean regularly with mild soap and water</li>
                <li>Store separately to avoid scratches</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecommendPage