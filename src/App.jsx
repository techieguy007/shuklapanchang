import React, { useState, useEffect } from 'react'
import { generateMonthPanchang } from './utils/panchang'

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

  // Sample data for festivals
  const festivals = {
    1: 'ईसाई नववर्ष आरम्भ, प्रदोषव्रत',
    3: 'स्नान-दान व्रत की पूर्णिमा',
    6: 'संकष्ठी श्रीगणेश चतुर्थी, सौभाग्य सुन्दरी व्रत',
    10: 'शाकम्भरी जयंती, माघ स्नान आरम्भ',
    14: 'स्वामी विवेकानन्द जयंती, षटतिला एकादशी व्रत, मकर संक्रान्ति',
    15: 'संक्रान्ति पुण्यकाल, तिलद्वादशी',
    16: 'मास शिवरात्रि व्रत, प्रदोष व्रत',
    18: 'स्नानदान-श्रद्ध की अमावस्या, मौनी अमावस्या',
    19: 'श्रीवल्लभ जयंती, गुप्तनवरात्र',
    20: 'चन्द्रर्शन',
    22: 'वैनायकी श्रीगणेश चतुर्थी',
    23: 'वसन्त पञ्चमी, नेताजी जयंती',
    25: 'रथ सप्तमी, पुत्र सप्तमी',
    26: 'गणतन्त्र दिवस, भीष्माष्टमी',
    29: 'जया एकादशी व्रत',
    30: 'भीष्म द्वादशी, प्रदोष व्रत, शहीद दिवस'
  }

  // Sample horoscope data
  const horoscope = [
    { sign: 'मेष', text: 'रोजी-रोजगार से लाभ, धनागम हेतु मार्ग प्रशस्त, वाहन सुख, धर्म-कर्म।' },
    { sign: 'वृष', text: 'स्वास्थ्य लाभ, पारिवारिक जनोका सहयोग, परिश्रम से लाभ, पुत्रलाभ' },
    { sign: 'मिथुन', text: 'रुके कार्य पूर्ण, व्यापार में लाभ, मन प्रसन्न, धार्मिक यात्रा, भौतिक सुख' },
    { sign: 'कर्क', text: 'परिवार में खुशी, खर्च पर नियंत्रण, क्रोध पर नियंत्रण, वाद-विवाद।' },
    { sign: 'सिंह', text: 'आध्यात्म में रुचि, वाणी और क्रोध में नियंत्रण, कार्यों में सफलता।' },
    { sign: 'कन्या', text: 'मातृसुख, शारीरिक कष्ट, शत्रुओं पर विजय, बुद्धि भ्रम, मान-सम्मान' },
    { sign: 'तुला', text: 'रोजी-रोजगार में लाभ, धनलाभ, शारीरिक सुख, व्यय की अधिकता' },
    { sign: 'वृश्चिक', text: 'आर्थिक अवरोध, स्वजनों से क्लेश, कार्यक्षेत्र में प्रगति, धर्मकर्म में रुचि' },
    { sign: 'धनु', text: 'स्वजनों से सहयोग, कर्तव्यनिष्ठ जीवन, कार्यों में सफलता, पुत्रलाभ' },
    { sign: 'मकर', text: 'रूके कार्य पूर्ण, द्रव्यलाभ, मित्रों से लाभ, मातृसुख, शत्रुओं पर विजय' },
    { sign: 'कुम्भ', text: 'धार्मिक कार्यों में उत्साह, वाणी पर नियंत्रण, व्यय की अधिकता।' },
    { sign: 'मीन', text: 'रोग-ऋण, शत्रु वृद्धि, पारिवारिक जीवन उतार-चढ़ाव, वाहन सुख।' }
  ]

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
          <h1 className="main-title">{monthNamesHI[month]} {year}</h1>
          <h2 className="subtitle">अंबरीष शुक्ल पंचाङ्ग {year}</h2>
        </div>

        {/* Calendar Systems */}
        <div className="calendar-systems">
          <div className="system-item">
            <strong>विक्रम संवत् 2082:</strong> पौष शुक्ल 13 से माघ शुक्ल 14 तक। तारीख 4 जनवरी से माघ प्रारम्भ ।।
          </div>
          <div className="system-item">
            <strong>शालिवाहन शाके 1947:</strong> राष्ट्रीय पौष 11 से राष्ट्रीय माघ 11 तक। ता.21 जनवरी से राष्ट्रीय माघ प्रारम्भ।।
          </div>
          <div className="system-item">
            <strong>फसली संवत् 1433:</strong> फसली पौष 27 से फसली माघ 28 तक। ता.4 जनवरी से फसली माघ माह प्रारम्भ।।
          </div>
          <div className="system-item">
            <strong>इस्लामी हिजरी 1447:</strong> रज्जब 11 से सावान 11 तक। तारीख 21 जनवरी से सावान माह प्रारम्भ।।
          </div>
          <div className="system-item">
            <strong>बंगला संवत् 1432:</strong> बंगला पौष 16 से बंगला माघ 17 तक। ता. 15 जनवरी से बंगला माघ माह प्रारम्भ।
          </div>
          <div className="system-item">
            <strong>नेपाली संवत् 1146:</strong> नेपाली पौष 17 से नेपाली माघ 18 तक। ता. 14 जनवरी से नेपाली माघ माह प्रारम्भ।
          </div>
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
              माह के आरम्भ में अनेक स्थानों पर बादल, वर्षा और बूंदा-बांदी होगी। मकर संक्रान्ति वरुण मण्डल में पड़ रही है। मौसम शुष्क रहेगा। शीतलहर के प्रकोप से बूंदा-बांदी, ओलावृष्टि से रहेगा। कहीं वर्षा होगी।
            </div>
          </div>

          {/* Astrological Timings */}
          <div className="sidebar-section">
            <h3 className="section-title">पंचक, भद्रा, मूल-विचार</h3>
            <div className="astrological-timings">
              <p><strong>पंचक:</strong> ता.20 को प्रारम्भ रात्रि 01:35 से ता.25 को पंचक समाप्त।</p>
              <p><strong>भद्रा:</strong> ता.2 को सायं 6:53 बजे। ता.6 को प्रातः 8:11 बजे तक। ता.8 को रात्रि 12:54 बजे से ता.9 को प्रातः 7:15 बजे तक।</p>
              <p><strong>मूल-विचार-आश्लेषा:</strong> ता.5 को 11:24 से ता.6 को 12:17 तक।</p>
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
                const isSpecial = day === 6 || day === 14 || day === 23 || day === 26
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
                        {isSpecial && (
                          <div className="special-icon">
                            {day === 6 && '🕉️'}
                            {day === 14 && '☀️'}
                            {day === 23 && '🌸'}
                            {day === 26 && '🇮🇳'}
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
              सोना, चांदी, रुई में घटाबढ़ से भारी तेजी कारक तथा प्रमुख किराना में मन्दी कारक है। कपास, सूत, सूती वस्त्र, तिल तेल, सोना-चांदी आदि में तेजी देखने को मिलेगी। खाद्यान्नों में विगत माह की आई हुई तेजी बरकरार रहेगी। उर्द, गुड़, सरसों, गुग्गुल, पारा, खाण्ड, धनिया, चावल, राई आदि में घट-बढ़ के साथ तेजी रहेगी। क्षरीय वस्तुओं में तेजी देखनों को मिलेगी।
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
          <h2 className="publisher-name">अंबरीष शुक्ल</h2>
          <div className="contact-info">
            <p>© {year} अंबरीष शुक्ल पंचाङ्ग</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
