import React, { useState, useEffect } from 'react'
import { generateMonthPanchang } from './utils/panchang'
import { monthData, horoscopeData } from './utils/monthData'

function App() {
  const [month, setMonth] = useState(0) // January
  const [year, setYear] = useState(2026)
  const [panchangData, setPanchangData] = useState({})

  const daysInMonth = (m, y) => new Date(y, m + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const days = []
  const totalDays = daysInMonth(month, year)
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= totalDays; i++) days.push(i)

  const dayNamesHI = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि']
  const monthNamesHI = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']

  useEffect(() => {
    const computed = generateMonthPanchang(year, month)
    setPanchangData(computed)
  }, [month, year])

  // Get current month data
  const currentMonthData = monthData[month] || monthData[0]
  const festivals = currentMonthData.festivals
  const horoscope = horoscopeData

  // Navigation functions
  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  // Generate sunrise/sunset times
  const getSunTimes = (day) => {
    const data = panchangData[day]
    if (data) {
      return {
        sunrise: data.sunrise || '6:48',
        sunset: data.sunset || '5:15'
      }
    }
    return { sunrise: '6:48', sunset: '5:15' }
  }

  // Get day name for a date
  const getDayName = (day) => {
    if (!day) return ''
    const date = new Date(year, month, day)
    return dayNamesHI[date.getDay()]
  }

  // Mini calendar for previous/next month
  const getMiniCalendar = (m, y) => {
    const firstDayOfMonth = new Date(y, m, 1).getDay()
    const totalDays = new Date(y, m + 1, 0).getDate()
    const miniDays = []
    for (let i = 0; i < firstDayOfMonth; i++) miniDays.push(null)
    for (let i = 1; i <= totalDays; i++) miniDays.push(i)
    return miniDays
  }

  const prevMonth = month === 0 ? 11 : month - 1
  const prevYear = month === 0 ? year - 1 : year
  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year

  return (
    <div className="panchang-container">
      {/* Header Section */}
      <header className="panchang-header">
        <div className="header-title">
          <div className="month-navigation">
            <button onClick={goToPreviousMonth} className="nav-button" title="पिछला महीना">
              ◀ {monthNamesHI[month === 0 ? 11 : month - 1]}
            </button>
            <h1 className="main-title">{monthNamesHI[month]} {year}</h1>
            <button onClick={goToNextMonth} className="nav-button" title="अगला महीना">
              {monthNamesHI[month === 11 ? 0 : month + 1]} ▶
            </button>
          </div>
          <h2 className="subtitle">अंबरीष शुक्ल पंचाङ्ग {year}</h2>
        </div>

        {/* Calendar Systems */}
        <div className="calendar-systems">
          {currentMonthData.calendarSystems.map((system, idx) => (
            <div key={idx} className={`system-item system-item-${idx + 1}`}>
              {system}
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          {/* Weather Predictions */}
          <div className="sidebar-section">
            <h3 className="section-title">आकाशीय लक्षण</h3>
            <div className="weather-text">
              {currentMonthData.weatherPrediction}
            </div>
          </div>

          {/* Astrological Timings */}
          <div className="sidebar-section">
            <h3 className="section-title">पंचक, भद्रा, मूल-विचार</h3>
            <div className="astrological-timings">
              <p><strong>पंचक:</strong> {currentMonthData.panchangDetails.panchak}</p>
              <p><strong>भद्रा:</strong> {currentMonthData.panchangDetails.bhadra}</p>
              <p><strong>मूल-विचार-आश्लेषा:</strong> {currentMonthData.panchangDetails.mool}</p>
            </div>
          </div>

          {/* Horoscope */}
          <div className="sidebar-section">
            <h3 className="section-title">राशि-फल</h3>
            <div className="horoscope-list">
              {horoscope.map((item, idx) => (
                <div key={idx} className="horoscope-item">
                  <strong>{item.sign}:</strong> {item.text}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center Calendar */}
        <main className="calendar-main">
          <div className="calendar-grid-wrapper">
            <div className="day-names-row">
              {dayNamesHI.map((day, idx) => (
                <div key={idx} className={`day-name-cell day-${idx}`}>{day}</div>
              ))}
            </div>
            <div className="calendar-grid">
              {days.map((day, idx) => {
                const data = day ? panchangData[day] : null
                const festival = day ? festivals[day] : null
                const specialIcon = day && currentMonthData.specialIcons ? currentMonthData.specialIcons[day] : null
                const dayOfWeek = day ? new Date(year, month, day).getDay() : null
                
                return (
                  <div key={idx} className={`calendar-day ${day ? 'has-day' : 'empty'} ${dayOfWeek !== null ? `day-cell-${dayOfWeek}` : ''}`}>
                    {day && (
                      <>
                        <div className="day-number">{day}</div>
                        {data && (
                          <div className="day-details">
                            <small>{data.tithiHi}</small>
                            {festival && <div className="festival-mark">●</div>}
                          </div>
                        )}
                        {specialIcon && (
                          <div className="special-icon">
                            {specialIcon}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          {/* Festivals */}
          <div className="sidebar-section">
            <h3 className="section-title">व्रत-त्यौहार</h3>
            <div className="festivals-list">
              {Object.entries(festivals).map(([date, text]) => (
                <div key={date} className="festival-item">
                  <strong>{date} {getDayName(parseInt(date))}.:</strong> {text}
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends */}
          <div className="sidebar-section">
            <h3 className="section-title">तेजी-मंदी</h3>
            <div className="market-text">
              {currentMonthData.marketTrends}
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Section */}
      <footer className="panchang-footer">
        {/* Sunrise/Sunset Table */}
        <div className="sun-times-section">
          <h3 className="section-title">सूर्योदय / सूर्यास्त</h3>
          <table className="sun-times-table">
            <thead>
              <tr>
                <th>दिनांक</th>
                <th>सूर्योदय</th>
                <th>सूर्यास्त</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => {
                const times = getSunTimes(day)
                return (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>{times.sunrise}</td>
                    <td>{times.sunset}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mini Calendars */}
        <div className="mini-calendars">
          <div className="mini-calendar">
            <h4>दिसम्बर {prevYear}</h4>
            <div className="mini-day-names">
              {dayNamesHI.map((day, idx) => (
                <div key={idx} className="mini-day-name">{day}</div>
              ))}
            </div>
            <div className="mini-calendar-grid">
              {getMiniCalendar(prevMonth, prevYear).map((d, idx) => (
                <div key={idx} className={`mini-day ${d ? 'has-day' : 'empty'}`}>{d}</div>
              ))}
            </div>
          </div>
          <div className="mini-calendar">
            <h4>फरवरी {nextYear}</h4>
            <div className="mini-day-names">
              {dayNamesHI.map((day, idx) => (
                <div key={idx} className="mini-day-name">{day}</div>
              ))}
            </div>
            <div className="mini-calendar-grid">
              {getMiniCalendar(nextMonth, nextYear).map((d, idx) => (
                <div key={idx} className={`mini-day ${d ? 'has-day' : 'empty'}`}>{d}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Publisher Info */}
        <div className="publisher-info">
          <div className="contact-info">
            <p>© {year} अंबरीष शुक्ल</p>
            <p>पंचाङ्ग उपयोग करने के लिए अनुमति प्राप्त करें, ईमेल करें: <a href="mailto:ambrish@iamshukla.com" target="_blank" rel="noopener noreferrer">ambrish@iamshukla.com</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
