// Simple panchang generator using approximate solar & lunar longitudes
// Uses suncalc for sunrise/sunset times; lunar/sun longitudes use simplified formulas
import SunCalc from 'suncalc'

const toRad = (d) => (d * Math.PI) / 180
const toDeg = (r) => (r * 180) / Math.PI
const fix360 = (deg) => ((deg % 360) + 360) % 360

// Julian Day for a JS Date
function toJulianDate(date) {
  // date in UTC
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate() + (date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) / 24

  let A = Math.floor((14 - month) / 12)
  let Y = year + 4800 - A
  let M = month + 12 * A - 3
  let JDN = day + Math.floor((153 * M + 2) / 5) + 365 * Y + Math.floor(Y / 4) - Math.floor(Y / 100) + Math.floor(Y / 400) - 32045
  // fractional day already included
  return JDN - 0.5 + (date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) / 24
}

// Approximate Sun ecliptic longitude (deg)
function sunEclLongitude(jd) {
  const d = jd - 2451545.0
  const g = fix360(357.5291 + 0.98560028 * d) // mean anomaly
  const q = fix360(280.459 + 0.98564736 * d) // mean longitude
  const L = q + 1.915 * Math.sin(toRad(g)) + 0.020 * Math.sin(toRad(2 * g))
  return fix360(L)
}

// Approximate Moon ecliptic longitude (deg) - simple model
function moonEclLongitude(jd) {
  const d = jd - 2451545.0
  const L0 = fix360(218.316 + 13.176396 * d) // mean longitude
  const Mm = fix360(134.963 + 13.064993 * d) // mean anomaly
  const F = fix360(93.272 + 13.229350 * d)
  const L = L0 + 6.289 * Math.sin(toRad(Mm)) // periodic term
  return fix360(L)
}

const TITHI_EN = [
  'Shukla Pratipada','Shukla Dwitiya','Shukla Tritiya','Shukla Chaturthi','Shukla Panchami','Shukla Shashthi','Shukla Saptami','Shukla Ashtami','Shukla Navami','Shukla Dashami','Shukla Ekadashi','Shukla Dwadashi','Shukla Trayodashi','Shukla Chaturdashi','Purnima',
  'Krishna Pratipada','Krishna Dwitiya','Krishna Tritiya','Krishna Chaturthi','Krishna Panchami','Krishna Shashthi','Krishna Saptami','Krishna Ashtami','Krishna Navami','Krishna Dashami','Krishna Ekadashi','Krishna Dwadashi','Krishna Trayodashi','Krishna Chaturdashi','Amavasya'
]

const TITHI_HI = [
  'शुक्ल प्रतिपदा','शुक्ल द्वितीया','शुक्ल तृतीया','शुक्ल चतुर्थी','शुक्ल पंचमी','शुक्ल षष्ठी','शुक्ल सप्तमी','शुक्ल अष्टमी','शुक्ल नवमी','शुक्ल दशमी','शुक्ल एकादशी','शुक्ल द्वादशी','शुक्ल त्रयोदशी','शुक्ल चतुर्दशी','पूर्णिमा',
  'कृष्ण प्रतिपदा','कृष्ण द्वितीया','कृष्ण तृतीया','कृष्ण चतुर्थी','कृष्ण पंचमी','कृष्ण षष्ठी','कृष्ण सप्तमी','कृष्ण अष्टमी','कृष्ण नवमी','कृष्ण दशमी','कृष्ण एकादशी','कृष्ण द्वादशी','कृष्ण त्रयोदशी','कृष्ण चतुर्दशी','अमावस्या'
]

const YOGA_EN = ['Vishkambha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarma','Dhriti','Shoola','Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyashti','Parigha','Siva','Siddha','Sadhya','Subha','Sukla','Brahma','Indra','Vaidhriti','Vikara']
const YOGA_HI = ['विश्कम्भ','प्रीति','आयुष्मान','सौभाग्य','शोभन','अतिगण्ड','सुकर्म','धृति','शूल','गण्ड','वृद्धि','ध्रुव','व्याघात','हर्षण','वज्र','सिद्धि','व्यष्टि','परिघ','शिव','सिद्ध','साध्य','शुभ','सुक्ल','ब्रह्म','इन्द्र','वैधृति','विकारे']

const KARANA_EN = ['Bava','Balava','Kaulava','Taitila','Gara','Vanija','Vishti','Shakuni','Chatushpada','Naga','Kimstughna']
const KARANA_HI = ['बव','बालव','कौलव','तैतिल','गर','वणिज','विष्ठि','शकुनि','चतुष्पाद','नाग','किंस्तुघ्न']

export function generateMonthPanchang(year, month, lat = 25.3176, lon = 82.9739) {
  // month: 0-based
  const result = {}
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  for (let d = 1; d <= daysInMonth; d++) {
    // compute sunrise & sunset using SunCalc at given location; use local date at noon to get correct date
    const date = new Date(Date.UTC(year, month, d, 6, 0, 0)) // 6:00 UTC baseline
    const times = SunCalc.getTimes(new Date(year, month, d), lat, lon)
    const sunrise = times.sunrise || times.sunriseEnd || new Date(Date.UTC(year, month, d, 6, 0, 0))
    const sunset = times.sunset || times.sunsetStart || new Date(Date.UTC(year, month, d, 18, 0, 0))

    // compute julian date at sunrise UTC
    const jd = toJulianDate(new Date(sunrise.getTime()))

    const sunLon = sunEclLongitude(jd)
    const moonLon = moonEclLongitude(jd)

    const phaseAngle = fix360(moonLon - sunLon)
    const tithiIndex = Math.floor(phaseAngle / 12) // 0..29
    const tithiEn = TITHI_EN[tithiIndex]
    const tithiHi = TITHI_HI[tithiIndex]

    // yoga (27) = floor((sun+moon)/ (360/27))
    const yogaAngle = fix360(sunLon + moonLon)
    const yogaIndex = Math.floor(yogaAngle / (360 / 27)) % 27
    const yogaEn = YOGA_EN[yogaIndex] || ''
    const yogaHi = YOGA_HI[yogaIndex] || ''

    // karana: 11 karanas repeat; each karana = half-tithi (6 degrees)
    const halfTithi = Math.floor(phaseAngle / 6) // 0..59
    const karanaIndex = halfTithi % 11
    const karanaEn = KARANA_EN[karanaIndex]
    const karanaHi = KARANA_HI[karanaIndex]

    result[d] = {
      tithiEn,
      tithiHi,
      yogaEn,
      yogaHi,
      karanaEn,
      karanaHi,
      sunrise: sunrise.toLocaleTimeString(),
      sunset: sunset.toLocaleTimeString()
    }
  }

  return result
}

export const SOURCE_NOTE_EN = 'Panchang calculations use Varanasi (25.3176 N, 82.9739 E)'
export const SOURCE_NOTE_HI = 'पंचांग गणना के लिए वाराणसी (25.3176 N, 82.9739 E) का उपयोग किया गया है'
import { julian, solar, moonposition } from 'astronomia'

// Varanasi coordinates
const DEFAULT_LAT = 25.3176
const DEFAULT_LON = 82.9739

function toJD(date) {
  // astronomia julian expects (year, month, day + fraction)
  const y = date.getUTCFullYear()
  const m = date.getUTCMonth() + 1
  const D = date.getUTCDate() + (date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) / 24
  return julian.CalendarGregorianToJD(y, m, D)
}

function deg(rad) {
  return (rad * 180) / Math.PI
}

export function computeTithiAt(date) {
  const jd = toJD(date)
  // solar.apparentLongitude and moonposition.position produce radians
  const sunLon = deg(solar.apparentLongitude(jd))
  const moonPos = moonposition.position(jd)
  const moonLon = deg(moonPos.lon)
  const diff = (moonLon - sunLon + 360) % 360
  const tithiIndex = Math.floor(diff / 12) + 1 // 1..30
  return { tithiIndex, tithiAngle: diff }
}

export function computeMonthPanchang(year, month, lat = DEFAULT_LAT, lon = DEFAULT_LON) {
  // month: 0-based (0 = Jan)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const result = {}
  for (let d = 1; d <= daysInMonth; d++) {
    // build date at local sunrise
    const localDate = new Date(year, month, d)
    // get sunrise time for the local date
    const times = SunCalc.getTimes(localDate, lat, lon)
    const sunrise = times.sunrise || new Date(year, month, d, 6, 0, 0)
    // compute tithi at sunrise
    let t = computeTithiAt(sunrise)
    // compute yoga (approx) as (sunLon + moonLon) / something — keep placeholder
    result[d] = {
      tithiIndex: t.tithiIndex,
      tithiAngle: t.tithiAngle,
      // placeholders for names to be mapped by caller
      tithi: null,
      yoga: null,
      karana: null,
      sunrise: sunrise.toLocaleTimeString(),
      sunset: (times.sunset || new Date(year, month, d, 18, 0, 0)).toLocaleTimeString(),
      muhurat: null
    }
  }
  return result
}
