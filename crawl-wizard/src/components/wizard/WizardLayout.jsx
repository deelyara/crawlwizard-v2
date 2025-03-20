import { useWizard, STEPS } from '../../context/WizardContext';
import StepIndicator from './StepIndicator';
import SelectType from './steps/SelectType';
import SetScope from './steps/SetScope';
import SetRestrictions from './steps/SetRestrictions';
import OriginSnapshot from './steps/OriginSnapshot';
import Recurrence from './steps/Recurrence';
import FineTune from './steps/FineTune';
import Review from './steps/Review';
import { X, ArrowLeft, ArrowRight, Play } from 'lucide-react';

const WizardLayout = () => {
  const { currentStep, prevStep, nextStep } = useWizard();

  const renderStepContent = () => {
    switch(currentStep) {
      case STEPS.SELECT_TYPE:
        return <SelectType />;
      case STEPS.SET_SCOPE:
        return <SetScope />;
      case STEPS.SET_RESTRICTIONS:
        return <SetRestrictions />;
      case STEPS.ORIGIN_SNAPSHOT:
        return <OriginSnapshot />;
      case STEPS.RECURRENCE:
        return <Recurrence />;
      case STEPS.FINE_TUNE:
        return <FineTune />;
      case STEPS.REVIEW:
        return <Review />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md-card overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
        <h1 className="text-2xl font-medium text-md-on-surface">Crawl wizard</h1>
        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors duration-200">
          <X size={20} />
        </button>
      </div>
      
      {/* Content area with sidebar and main content */}
      <div className="flex min-h-[500px]">
        {/* Sidebar with step indicators */}
        <div className="w-72 bg-gray-50 py-6 border-r border-gray-100">
          <StepIndicator />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 p-8 bg-white overflow-y-auto">
          <div className="step-content max-w-3xl">
            {renderStepContent()}
          </div>
        </div>
      </div>
      
      {/* Footer with navigation buttons */}
      <div className="flex justify-between p-6 border-t border-gray-100 bg-gray-50">
        <button 
          onClick={prevStep} 
          className="btn btn-outlined flex items-center gap-2"
          disabled={currentStep === STEPS.SELECT_TYPE}
        >
          <ArrowLeft size={18} /> Back
        </button>
        
        <button 
          onClick={nextStep} 
          className={`btn flex items-center gap-2 ${
            currentStep === STEPS.REVIEW 
              ? 'bg-md-success text-md-on-success hover:bg-green-700 focus:ring-green-100' 
              : 'btn-primary'
          }`}
        >
          {currentStep === STEPS.REVIEW ? (
            <>Start crawl <Play size={18} /></>
          ) : (
            <>Next <ArrowRight size={18} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default WizardLayout;