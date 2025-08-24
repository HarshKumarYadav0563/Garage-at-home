import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step} className="flex items-center min-w-0">
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                data-testid={`step-indicator-${stepNumber}`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
              </div>
              <span
                className={`font-medium whitespace-nowrap ${
                  isActive ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400'
                }`}
                data-testid={`step-label-${stepNumber}`}
              >
                {step}
              </span>
            </div>
            
            {!isLast && (
              <div
                className={`flex-1 h-px mx-4 min-w-[50px] ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
