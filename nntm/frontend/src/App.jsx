import { useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const quickPrompts = [
  'Cây cà chua bị vàng lá là bị gì?',
  'Cây bị sâu ăn lá thì xử lý thế nào?',
  'Lúa bị cháy đầu lá nên làm gì?',
  'Cây hoa hồng bị úa lá do nguyên nhân nào?',
  'Làm sao để cây phát triển tốt hơn trong mùa mưa?',
  'Cây cần bón phân gì để ra quả nhiều?',
  'Làm thế nào để phòng tránh bệnh thán thư?',
  'Cây bị đốm nâu trên lá nên xử lý thế nào?',
  'Cây trồng ở chậu cần tưới bao nhiêu lần mỗi ngày?',
  'Cây bị rụng lá non thì có phải thiếu nước không?',
]

const plantOptions = [
  { name: 'Cây lúa', icon: '🌾', description: 'Tư vấn giai đoạn sinh trưởng' },
  { name: 'Cà chua', icon: '🍅', description: 'Phát hiện bệnh và sâu bệnh' },
  { name: 'Hoa hồng', icon: '🌹', description: 'Chăm sóc hoa và sâu bệnh' },
  { name: 'Cam', icon: '🍊', description: 'Dinh dưỡng và ra quả' },
  { name: 'Cây cảnh', icon: '🪴', description: 'Chăm sóc trong chậu' },
  { name: 'Bạc hà', icon: '🌿', description: 'Bệnh và thu hoạch' },
]

function MessageBubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser
            ? 'bg-emerald-600 text-white'
            : 'bg-white/95 text-slate-800 ring-1 ring-emerald-100'
        }`}
      >
        {content}
      </div>
    </div>
  )
}

function TreeIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true">
      <rect x="48" y="92" width="44" height="24" rx="10" fill="#84cc16" opacity="0.2" />
      <path d="M70 18c-16 0-29 12-29 27 0 10 6 18 15 23 2-7 6-13 12-16 0 10 5 18 12 23 3-6 5-12 5-18 0-8-3-15-8-21z" fill="#16a34a" />
      <path d="M70 34c13 0 24 9 24 20 0 9-5 16-12 21 0-6-4-11-9-14 0 8-4 14-10 18 2-5 3-10 3-15 0-7-2-13-6-20z" fill="#15803d" />
      <path d="M44 70c10 0 16 8 16 16 0 3-1 6-3 8H44c-4-4-6-8-6-13 0-4 2-8 6-11z" fill="#166534" />
      <path d="M96 72c9 0 15 7 15 15 0 3-1 6-3 8H96c-4-4-5-8-5-13 0-4 2-8 5-10z" fill="#166534" />
    </svg>
  )
}

function PlantDecorations({ className = '' }) {
  const items = ['🌱', '🌿', '🌼', '🌾', '🍅', '🌸']

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} aria-hidden="true">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="text-lg leading-none text-emerald-600">
          {item}
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Chào bạn, hãy nhập mô tả tình trạng cây hoặc tải ảnh lên. Mình sẽ tư vấn nguyên nhân, cách xử lý và lưu ý chăm sóc.',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [plantType, setPlantType] = useState('Cà chua')
  const [imageFile, setImageFile] = useState(null)

  const canSend = useMemo(() => input.trim().length > 0 || imageFile, [input, imageFile])

  function handleInputKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  async function sendMessage(text) {
    const messageText = (text ?? input).trim()
    if (!messageText && !imageFile) return

    setLoading(true)
    setMessages((prev) => [...prev, { role: 'user', content: messageText || '[Đã gửi ảnh]' }])
    setInput('')

    try {
      const formData = new FormData()
      formData.append('message', messageText || 'Phân tích ảnh cây trồng giúp tôi.')
      formData.append('plant_type', plantType)
      if (sessionId) formData.append('session_id', sessionId)
      if (imageFile) formData.append('image', imageFile)

      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || 'Request failed')
      }

      const data = await response.json()
      setSessionId(data.session_id)
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }])
      setImageFile(null)
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Không gọi được backend: ${error.message}`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dcfce7_0%,_#f2fdf4_30%,_#f8fafc_70%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 lg:px-8">
        <header className="relative mb-6 overflow-hidden rounded-[28px] border border-emerald-100 bg-white/80 p-5 shadow-[0_24px_80px_-24px_rgba(16,185,129,0.28)] backdrop-blur">
          <div className="absolute right-3 top-3 hidden h-28 w-28 rounded-full bg-emerald-100/70 blur-3xl sm:block" />
          <div className="absolute bottom-2 left-4 hidden sm:block">
            <TreeIllustration className="h-24 w-24 opacity-70" />
          </div>

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                <span>🌿</span>
                Plant Care Chatbot
              </div>
              <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Tư vấn chăm sóc cây trồng bằng AI chuyên nghiệp
              </h1>
              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                Hệ thống hỗ trợ phát hiện dấu hiệu bất thường, gợi ý xử lý và chăm sóc theo từng
                loại cây, phù hợp cho vườn nhà, ruộng và trang trại nhỏ.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-sm text-emerald-700">
                <span className="font-medium">Loại cây hỗ trợ:</span>
                <PlantDecorations className="opacity-90" />
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {plantOptions.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setPlantType(item.name)}
                  className={`rounded-2xl border px-3 py-3 text-left text-sm font-medium transition ${
                    plantType === item.name
                      ? 'border-emerald-500 bg-emerald-600 text-white shadow-md'
                      : 'border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  <div className="text-lg">{item.icon}</div>
                  <div className="mt-1 font-semibold">{item.name}</div>
                  <div className={`mt-1 text-xs ${plantType === item.name ? 'text-emerald-100' : 'text-emerald-600'}`}>
                    {item.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="flex min-h-[70vh] flex-col rounded-[28px] border border-emerald-100 bg-white/85 shadow-[0_20px_70px_-28px_rgba(15,23,42,0.24)] backdrop-blur">
            <div className="border-b border-emerald-100 px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Khung chat tư vấn</h2>
                  <p className="text-sm text-slate-500">
                    Session: {sessionId ?? 'chưa tạo'} | Loại cây: {plantType}
                  </p>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {loading ? 'AI đang trả lời...' : 'Sẵn sàng'}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((message, index) => (
                <MessageBubble key={`${message.role}-${index}`} {...message} />
              ))}
              {loading ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-500 ring-1 ring-emerald-100">
                    Đang phân tích tình trạng cây...
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-emerald-100 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    disabled={loading}
                    className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Nhập mô tả: lá vàng, rụng, có đốm, sâu ăn lá..."
                  rows={4}
                  className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-300"
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                    />
                    <span className="rounded-full bg-emerald-50 px-3 py-2 font-medium text-emerald-700">
                      Tải ảnh cây trồng
                    </span>
                    <span>{imageFile ? imageFile.name : 'Tùy chọn'}</span>
                  </label>

                  <button
                    onClick={() => sendMessage()}
                    disabled={!canSend || loading}
                    className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Gửi câu hỏi
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[24px] border border-emerald-100 bg-white/80 p-5 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.2)] backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌳</span>
                <h3 className="text-lg font-semibold">Cách hệ thống hoạt động</h3>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <PlantDecorations className="opacity-90" />
              </div>
              <ol className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                <li>1. Người dùng nhập câu hỏi hoặc tải ảnh cây trồng.</li>
                <li>2. Frontend gửi request tới FastAPI backend.</li>
                <li>3. Backend gọi LLM bằng prompt chuyên gia nông nghiệp.</li>
                <li>4. Hệ thống lưu lịch sử hội thoại vào PostgreSQL.</li>
                <li>5. Kết quả trả về UI theo dạng chat.</li>
              </ol>
            </div>

            <div className="rounded-[24px] border border-emerald-100 bg-emerald-600 p-5 text-white shadow-[0_20px_60px_-24px_rgba(22,163,74,0.5)]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍃</span>
                <h3 className="text-lg font-semibold">Prompt cốt lõi</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-emerald-50">
                AI luôn trả lời bằng tiếng Việt, nêu nguyên nhân có thể, cách xử lý cụ thể và lưu ý
                chăm sóc. Khi thiếu dữ kiện, hệ thống sẽ nêu nhiều khả năng thay vì khẳng định tuyệt
                đối.
              </p>
            </div>

            <div className="rounded-[24px] border border-emerald-100 bg-white/80 p-5 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.2)] backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌱</span>
                <h3 className="text-lg font-semibold">Gợi ý nâng cấp</h3>
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>- Thêm streaming token để trả lời dần</li>
                <li>- Gắn phân tích ảnh chi tiết hơn</li>
                <li>- Lưu theo user đăng nhập</li>
                <li>- Bổ sung gợi ý theo thời tiết</li>
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}
