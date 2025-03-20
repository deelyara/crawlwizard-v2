import { createContext, useContext, useState } from 'react';

const WizardContext = createContext(null);

export const STEPS = {
  SELECT_TYPE: 1,
  SET_SCOPE: 2,
  SET_RESTRICTIONS: 3,
  ORIGIN_SNAPSHOT: 4,
  RECURRENCE: 5,
  FINE_TUNE: 6,
  REVIEW: 7
};

export const WizardProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(STEPS.ORIGIN_SNAPSHOT); // Start at Origin Snapshot as requested
  const [wizardData, setWizardData] = useState({
    // Step 1: Select Type
    crawlType: 'discovery',
    prerenderPages: false,
    
    // Step 2: Set Scope
    scopeType: 'entire-website',
    pageLimit: 100,
    crawlDepth: null,
    pageList: [],
    specificUrls: [],
    sitemapUrls: [],
    
    // Step 3: Set Restrictions
    existingRestrictions: {
      include: ['/blog'],
      exclude: ['/de_de/']
    },
    temporaryRestrictions: {
      include: [],
      exclude: []
    },
    makeRestrictionsPermament: false,
    
    // Step 4: Origin Snapshot
    snapshotConfig: {
      selected: null,
      availableSnapshots: [
        { id: 'snapshot-1', name: 'Main Production Snapshot', description: 'Used for main production site' },
        { id: 'snapshot-2', name: 'Translation Snapshot', description: 'Used for managing translations' }
      ],
      strategy: 'reuse-existing-store-new'
    },
    
    // Step 5: Recurrence
    recurrence: {
      enabled: false,
      interval: 'weekly',
      day: 'monday',
      time: '02:00'
    },
    
    // Step 6: Fine-tune
    fineTune: {
      collectResources: {
        html: true,
        js: false,
        css: false,
        images: false,
        external: false,
        shortLinks: false
      },
      options: {
        skipContentType: true,
        useEtags: false,
        simultaneousRequests: 5
      }
    }
  });

  const updateWizardData = (stepData) => {
    setWizardData(prevData => ({
      ...prevData,
      ...stepData
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.REVIEW) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > STEPS.SELECT_TYPE) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= STEPS.SELECT_TYPE && step <= STEPS.REVIEW) {
      setCurrentStep(step);
    }
  };

  return (
    <WizardContext.Provider value={{
      currentStep,
      wizardData,
      updateWizardData,
      nextStep,
      prevStep,
      goToStep,
      STEPS
    }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};

export default WizardContext;