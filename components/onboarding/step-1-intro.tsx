"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Step1Props {
  onNext: () => void
}

export function OnboardingStep1({ onNext }: Step1Props) {
  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-8 max-w-lg mx-auto">
      {/* Logo */}
      <div className="text-center pt-8">
        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-3xl">🏒</span>
        </div>
        <h1 className="text-3xl font-bold text-text mb-2">HockeyLink</h1>
        <p className="text-text-secondary">Connect with the global hockey community</p>
      </div>

      {/* Content */}
      <div className="space-y-6 flex-1 flex flex-col justify-center">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-bright/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent-bright font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-text">Connect Globally</p>
              <p className="text-sm text-text-secondary">Join players, coaches, and clubs from around the world</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-bright/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent-bright font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-text">Find Opportunities</p>
              <p className="text-sm text-text-secondary">Discover professional positions and career growth</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-bright/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-accent-bright font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-text">Build Your Network</p>
              <p className="text-sm text-text-secondary">Collaborate and grow with the hockey community</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-3 pb-8">
        <button
          onClick={onNext}
          className="w-full py-3 rounded-lg bg-accent hover:bg-accent-dark text-primary font-semibold transition-colors flex items-center justify-center gap-2"
        >
          Get Started
          <ChevronRight size={20} />
        </button>
        <Link
          href="/"
          className="w-full py-3 rounded-lg border border-border text-text font-semibold transition-colors text-center hover:bg-surface-light"
        >
          Already a member? Sign In
        </Link>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center gap-2 pb-4">
        <div className="w-2 h-2 rounded-full bg-accent"></div>
        <div className="w-2 h-2 rounded-full bg-border"></div>
        <div className="w-2 h-2 rounded-full bg-border"></div>
      </div>
    </div>
  )
}
