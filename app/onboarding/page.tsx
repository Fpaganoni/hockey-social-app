"use client"

import { useState } from "react"
import { OnboardingStep1 } from "@/components/onboarding/step-1-intro"
import { OnboardingStep2 } from "@/components/onboarding/step-2-auth"
import { OnboardingStep3 } from "@/components/onboarding/step-3-role-select"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="min-h-screen bg-primary">
      {currentStep === 1 && <OnboardingStep1 onNext={() => setCurrentStep(2)} />}
      {currentStep === 2 && <OnboardingStep2 onNext={() => setCurrentStep(3)} />}
      {currentStep === 3 && <OnboardingStep3 onNext={() => setCurrentStep(1)} />}
    </div>
  )
}
