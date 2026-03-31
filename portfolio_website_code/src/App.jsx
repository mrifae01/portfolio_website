import { useState, useRef } from 'react'
import { Analytics } from "@vercel/analytics/react"

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

function VideoPlayer({ src }) {
  const videoRef = useRef(null)
  const [speed, setSpeed] = useState(1)

  function changeSpeed(s) {
    setSpeed(s)
    if (videoRef.current) videoRef.current.playbackRate = s
  }

  return (
    <div className="video-wrapper">
      <video
        ref={videoRef}
        className="project-video"
        src={src}
        controls
        playsInline
      />
      <div className="video-speed-controls">
        {SPEEDS.map(s => (
          <button
            key={s}
            className={`speed-btn${speed === s ? ' active' : ''}`}
            onClick={() => changeSpeed(s)}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  )
}
import fibVideo from './assets/videos/Calculated_Fib_Target.mp4'
import cnnVideo from './assets/videos/cnn-fr-vid.mp4'
import aiVisionVideo from './assets/videos/AI_Vision_Vid_compressed.mp4'
import edgeVideo from './assets/videos/Edge_Options_Demo_compressed.mp4'
import Chat from './Chat'
import './App.css'

function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="navbar">
      <span className="nav-name">Mitchel Rifae</span>
      <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
      <ul className={`nav-links${open ? ' nav-open' : ''}`}>
        <li><a href="#about" onClick={close}>About</a></li>
        <li><a href="#chat" onClick={close}>Ask</a></li>
        <li><a href="#experience" onClick={close}>Experience</a></li>
        <li><a href="#projects" onClick={close}>Projects</a></li>
        <li><a href="#skills" onClick={close}>Skills</a></li>
        <li><a href="#education" onClick={close}>Education</a></li>
      </ul>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-content">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">Mitchel Rifae</h1>
        <h2 className="hero-title">Software Engineer</h2>
        <p className="hero-bio">
          Virginia Tech graduate with a B.S. in Computer Science. Full-stack engineer with
          experience across the entire development lifecycle from architecture to production.
          I've built systems responsible for over $80M in annual revenue and pioneered agentic AI workflows.
        </p>
        <div className="hero-links">
          <a href="mailto:mrifae@gmail.com" className="btn">Email Me</a>
          <a href="https://github.com/mrifae01" target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
          <a href="https://www.linkedin.com/in/mitchel-rifae-264870242" target="_blank" rel="noreferrer" className="btn btn-outline">LinkedIn</a>
        </div>
        <p className="hero-contact">804-402-9785 &nbsp;·&nbsp; Winchester, VA</p>
      </div>
    </section>
  )
}

function Experience() {
  const jobs = [
    {
      title: 'Software Engineer',
      company: 'OptumRX, UHG',
      period: 'July 2024 - April 2026',
      bullets: [
        'Owned and delivered continuous production enhancements to a Python-Flask internal application directly responsible for over $80M in annual revenue to OptumRX.',
        'Drove cross-team integration by connecting partner internal applications with the core platform, eliminating redundant workflows and improving operational efficiency across the organization.',
        'Architected a LangGraph-powered multi-agent AI workflow that cut client processing time by 2-3 business days. The system ingested multi-format data (PDF, SQL, JSON) via a supervisor agent coordinating 4 specialized sub-agents to produce normalized, analysis-ready outputs.',
      ],
    },
    {
      title: 'Intern',
      company: 'AFCOM Potomac',
      period: 'June 2023 - August 2023',
      bullets: [
        'Interned at data centers in Ashburn and Sterling, Virginia: Vantage Data Centers, Sabey Data Centers, CyrusOne Data Center, and Trinity Construction Group.',
        'Gained hands-on experience in HVAC and electrical maintenance to ensure optimal temperature, safety, and efficiency for server racks.',
        'Utilized Microsoft Excel for cost analysis to optimize procurement and minimize expenses during the ground-up building process.',
      ],
    },
  ]

  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        {jobs.map((job) => (
          <div key={job.company} className="timeline-item">
            <div className="timeline-header">
              <div>
                <h3 className="job-title">{job.title}</h3>
                <span className="job-company">{job.company}</span>
              </div>
              <span className="job-period">{job.period}</span>
            </div>
            <ul className="job-bullets">
              {job.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  const projects = [
    {
      name: 'EDGE Options (2026)',
      description: 'Full-stack algorithmic options trading system built with Python (FastAPI) and React, integrating with the Alpaca brokerage API to automate trade execution, position monitoring, and dynamic stop-loss/take-profit management.',
      bullets: [
        'Real-time trading dashboard with Lightweight Charts, live P&L tracking, and a stock screener with earnings date alerts.',
        'Robust risk management: configurable hard stop enforcement, partial take-profit triggers, and a multi-source earnings data pipeline.',
        'Persistent position state across sessions using contract-keyed localStorage.',
      ],
      tech: ['Python', 'FastAPI', 'React', 'Alpaca API', 'Lightweight Charts'],
      video: edgeVideo,
    },
    {
      name: 'AI Vision Assistant (2026)',
      description: 'Voice-activated AI assistant built with Python and Google Gemini that listens for wake words, captures live webcam frames, and responds verbally. This project enables hands-free, vision-aware question answering in real time.',
      bullets: [
        'Wake word detection with adaptive audio threshold tuning triggers continuous voice command transcription via Google Speech-to-Text.',
        'Background camera thread keeps the webcam warm at 1080p/30fps, auto-capturing frames when visual keywords are detected in the query.',
        'Multi-model Gemini fallback cascade (2.5-flash → 2.5-flash-lite → 2.0-flash-lite) handles both text and image-grounded queries with concise spoken responses via Windows SAPI.',
      ],
      tech: ['Python', 'Google Gemini API', 'OpenCV', 'SpeechRecognition', 'Windows SAPI (TTS)'],
      video: aiVisionVideo,
    },
    {
      name: 'ESP32 WiFi Smart Switch (Work in Progress)',
      description: 'Battery-powered smart light switch built with an ESP32 and servo motor that physically toggles a wall switch via a browser-based interface over WiFi. Designed to be wall-mounted in a 3D printed enclosure with no rewiring of existing electrical infrastructure.',
      bullets: [
        'ESP32 hosts a WiFi HTTP web server serving a mobile-friendly ON/OFF control page, allowing the servo to physically flip a wall switch from any device on the local network.',
        'MG996R servo motor attached to GPIO 26 with tuned pulse width range (500-2400µs) delivers a full 180° sweep to reliably actuate the physical switch in both directions.',
        'Light sleep mode and reduced WiFi transmit power (7dBm) minimize idle current draw, extending 4x AA battery life from weeks to several months between changes.',
      ],
      tech: ['C++', 'Arduino IDE', 'ESP32', 'MG996R Servo Motor', 'WiFi HTTP Server'],
      video: null,
    },
    {
      name: 'CNN Facial Recognition System (2023)',
      description: 'Python-based facial recognition system using TensorFlow, Keras, OpenCV, and Tkinter. Trains a CNN model to grant or deny access based on real-time camera input.',
      bullets: [
        'Custom CNN architecture trained on captured facial data.',
        'Real-time inference via webcam using OpenCV.',
        'Desktop GUI built with Tkinter for access control management.',
      ],
      tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Tkinter'],
      video: cnnVideo,
    },
    {
      name: 'Fibonacci Retracement Indicator (2022)',
      description: 'Custom indicator built on TradingView using Pine Script. Automates a structured Fibonacci retracement theory to identify intraday targets, support/resistance zones, and reversal points.',
      bullets: [
        'Before the first 30-min candle close, draws a fib retracement from candle OPEN to PCP — the 161.8% acts as the first 30-min target/reversal point.',
        'After the first 30-min candle close, draws a fib retracement from candle CLOSE to PCP — the 161.8% acts as the intraday target/reversal point.',
        'The 61.8% provides support/resistance relative to the trend. If price holds the 161.8% as support, the 261.8% becomes the next target with a near-guaranteed bounce.',
        'If the market shows strong reversal and breaks the 32.8%, a new fib is drawn from 32.8% to the high/low of day — repeating the 161.8% target process.',
        'All levels apply only when there is at least a 0.5 point gap between the candle close and the drag point value.',
      ],
      tech: ['Pine Script', 'TradingView'],
      video: fibVideo,
    },
  ]

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.name} className="project-card">
            {p.video ? (
              <VideoPlayer src={p.video} />
            ) : (
              <div className="video-coming-soon">🎬 Video Coming Soon</div>
            )}
            <div className="project-body">
              <h3 className="project-name">{p.name}</h3>
              <p className="project-desc">{p.description}</p>
              <ul className="project-bullets">
                {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <div className="tech-tags">
                {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  const categories = [
    {
      label: 'Programming',
      items: ['Python', 'JavaScript', 'Java', 'C++', 'C', 'HTML', 'CSS', 'SQL', 'React', 'Node', 'FlaskAPI', 'FastAPI', 'Azure', 'Arduino'],
    },
    {
      label: 'AI Integration',
      items: ['LangGraph', 'CrewAI', 'OpenAI', 'Claude', 'Gemini'],
    },
    {
      label: 'Collaboration',
      items: ['GitHub', 'Scrum', 'Agile', 'Rally', 'Miro', 'Teams'],
    },
  ]

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {categories.map((cat) => (
          <div key={cat.label} className="skill-group">
            <h3 className="skill-label">{cat.label}</h3>
            <div className="tech-tags">
              {cat.items.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section">
      <h2 className="section-title">Education</h2>
      <div className="edu-card">
        <div className="edu-header">
          <div>
            <h3 className="edu-degree">B.S. Computer Science</h3>
            <span className="edu-school">Virginia Tech — College of Engineering</span>
          </div>
          <span className="job-period">Aug 2020 - Dec 2023</span>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>Built by Mitchel Rifae &nbsp;·&nbsp; mrifae@gmail.com</p>
    </footer>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Chat />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <Footer />
      <Analytics />
    </>
  )
}

export default App
