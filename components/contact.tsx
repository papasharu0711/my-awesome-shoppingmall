"use client"

import type React from "react"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // 실제 제출 로직 추가
    setTimeout(() => {
      setIsSubmitting(false)
      alert("문의가 전송되었습니다.")
      setFormData({ name: "", email: "", message: "" })
    }, 1000)
  }

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-black text-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm tracking-widest uppercase text-gray-500 mb-4 block">연락처</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">우리와 연결하세요</h2>
          <p className="text-gray-400 leading-relaxed">질문이 있으시거나 맞춤형 상담을 원하시면 언제든 연락주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-0 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-0 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="메시지"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-0 py-3 bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-accent text-black font-semibold hover:bg-accent/90 transition-colors uppercase tracking-wider disabled:opacity-50"
          >
            {isSubmitting ? "전송 중..." : "메시지 전송"}
          </button>
        </form>
      </div>
    </section>
  )
}
