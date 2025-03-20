import { useWizard, STEPS } from '../../context/WizardContext';
import { Check } from 'lucide-react';

const StepIndicator = () => {
  const { currentStep, goToStep } = useWizard();
  
  const steps = [
    { number: STEPS.SELECT_TYPE, label: 'Select type' },
    { number: STEPS.SET_SCOPE, label: 'Set scope' },
    { number: STEPS.SET_RESTRICTIONS, label: 'Set restrictions' },
    { number: STEPS.ORIGIN_SNAPSHOT, label: 'Origin snapshot' },
    { number: STEPS.RECURRENCE, label: 'Recurrence' },
    { number: STEPS.FINE_TUNE, label: 'Fine-tune' },
    { number: STEPS.REVIEW, label: 'Review' },
  ];
  
  const getStepStatus = (stepNumber) => {
    if (stepNumber === currentStep) return 'active';
    if (stepNumber < currentStep) return 'completed';
    return 'inactive';
  };
  
  return (
    <div className="space-y-8 px-4">
      {steps.map((step) => {
        const status = getStepStatus(step.number);
        
        return (
          <div 
            key={step.number}
            className="flex items-center cursor-pointer"
            onClick={() => goToStep(step.number)}
          >
            <div className={`wizard-step-number ${status}`}>
              {status === 'completed' ? (
                <Check size={16} />
              ) : (
                step.number
              )}
            </div>
            <div className={`wizard-step-label ${status}`}>
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;