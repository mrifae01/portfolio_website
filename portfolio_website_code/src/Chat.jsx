import { useState, useRef, useEffect } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm an AI assistant that knows all about Mitchel. Ask me anything... his experience, skills, projects, hobbies, or how to reach him." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messages.length > 1 && messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next
            .filter((m, i) => !(m.role === 'assistant' && i === 0))
            .map(m => ({ role: m.role, content: m.content }))
        }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <section id="chat" className="section">
      <h2 className="section-title">Ask About Me</h2>
      <div className="chat-container">
        <div className="chat-messages" ref={messagesRef}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              <p>{m.content}</p>
            </div>
          ))}
          {loading && (
            <div className="chat-msg assistant">
              <p className="chat-typing">Thinking…</p>
            </div>
          )}
        </div>

        <div className="chat-input-row">
          <textarea
            className="chat-input"
            rows={1}
            placeholder="Ask me anything…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="chat-send" onClick={send} disabled={loading || !input.trim()}>
            ➤
          </button>
        </div>
      </div>
    </section>
  )
}
