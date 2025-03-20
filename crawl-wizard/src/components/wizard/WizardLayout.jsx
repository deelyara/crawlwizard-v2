import { useWizard, STEPS } from '../../context/WizardContext';
import StepIndicator from './StepIndicator';
import SelectType from './steps/SelectType';
import SetScope from './steps/SetScope';
import SetRestrictions from './steps/SetRestrictions';
import OriginSnapshot from './steps/OriginSnapshot';
import Recurrence from './steps/Recurrence';
import FineTune from './steps/FineTune';
import Review from './steps/Review';
import { X } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-md-2 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-md-outline">
        <h1 className="text-xl font-medium">Crawl wizard</h1>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      
      {/* Content area with sidebar and main content */}
      <div className="flex">
        {/* Sidebar with step indicators */}
        <div className="w-64 bg-gray-50 py-6 border-r border-md-outline">
          <StepIndicator />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 p-6">
          {renderStepContent()}
        </div>
      </div>
      
      {/* Footer with navigation buttons */}
      <div className="flex justify-between p-5 border-t border-md-outline bg-gray-50">
        <button 
          onClick={prevStep} 
          className="btn btn-secondary"
          disabled={currentStep === STEPS.SELECT_TYPE}
        >
          Back
        </button>
        
        <button 
          onClick={nextStep} 
          className={`btn ${currentStep === STEPS.REVIEW ? 'bg-green-600 hover:bg-green-700 text-white' : 'btn-primary'}`}
        >
          {currentStep === STEPS.REVIEW ? 'Start crawl' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default WizardLayout;