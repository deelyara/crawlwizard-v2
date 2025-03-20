import { useWizard, STEPS } from '../../context/WizardContext';
import { Check, ChevronRight } from 'lucide-react';

const StepIndicator = () => {
  const { currentStep, goToStep } = useWizard();
  
  const steps = [
    { number: STEPS.SELECT_TYPE, label: 'Select type', description: 'Choose type of crawl' },
    { number: STEPS.SET_SCOPE, label: 'Set scope', description: 'Define crawl boundaries' },
    { number: STEPS.SET_RESTRICTIONS, label: 'Set restrictions', description: 'Add URL restrictions' },
    { number: STEPS.ORIGIN_SNAPSHOT, label: 'Origin snapshot', description: 'Configure snapshot settings' },
    { number: STEPS.RECURRENCE, label: 'Recurrence', description: 'Set up recurring crawls' },
    { number: STEPS.FINE_TUNE, label: 'Fine-tune', description: 'Advanced settings' },
    { number: STEPS.REVIEW, label: 'Review', description: 'Review and start' },
  ];
  
  const getStepStatus = (stepNumber) => {
    if (stepNumber === currentStep) return 'active';
    if (stepNumber < currentStep) return 'completed';
    return 'inactive';
  };
  
  return (
    <div className="relative px-2">
      {/* Vertical line connecting steps */}
      <div className="absolute h-full w-0.5 left-3.5 top-0 bottom-0 bg-gray-100 z-0" />
      
      <div className="space-y-1 relative">
        {steps.map((step, index) => {
          const status = getStepStatus(step.number);
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.number} className="relative z-10 mb-2">
              <div 
                className={`wizard-step-container ${status === 'active' ? 'active' : ''}`}
                onClick={() => goToStep(step.number)}
              >
                <div className={`wizard-step-number ${status}`}>
                  {status === 'completed' ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    step.number
                  )}
                </div>
                
                <div className="ml-3 flex-1">
                  <div className={`wizard-step-label ${status}`}>
                    {step.label}
                  </div>
                  {status === 'active' && (
                    <div className="text-xs text-gray-500 mt-0.5">{step.description}</div>
                  )}
                </div>
                
                {status !== 'inactive' && (
                  <ChevronRight 
                    size={16} 
                    className={`ml-1 ${status === 'active' ? 'text-md-primary' : 'text-gray-300'}`} 
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;