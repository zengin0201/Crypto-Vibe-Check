import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import './index.css'

function App() {
  const [mood, setMood] = useState(null) 
  const [loading, setLoading] = useState(true)

  
  const getMarketVibe = async () => {
    try {
      setLoading(true)
      const res = await axios.get('https://api.alternative.me/fng/')
      setMood(res.data.data[0])
      setLoading(false)
    } catch (err) {
      console.error("Блин, апишка упала:", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getMarketVibe()
  }, [])

  
  const getColor = (val) => {
    if (val <= 25) return '#ef4444' 
    if (val <= 45) return '#f97316' 
    if (val <= 55) return '#eab308' 
    if (val <= 75) return '#22c55e' 
    return '#06b6d4' // Туземун
  }

  if (loading) return <div className="loader">Считаем...</div>

  return (
    <div className="wrapper">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h1>Крипто-Настроение</h1>
        
        <div className="vibe-value" style={{ color: getColor(mood.value) }}>
          {mood.value}
        </div>
        
        <div className="vibe-text">
          Сейчас на рынке: <span>{mood.value_classification}</span>
        </div>

        <div className="progress-bar">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${mood.value}%` }}
            transition={{ duration: 1 }}
            className="progress-fill"
            style={{ backgroundColor: getColor(mood.value) }}
          />
        </div>

        <p className="update-time">Обновится через: {Math.floor(mood.time_until_update / 60)} мин.</p>
        
        <button onClick={getMarketVibe} className="refresh-btn">
          Сколько
        </button>
      </motion.div>
    </div>
  )
}

export default App