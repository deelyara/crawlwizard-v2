import { useWizard } from '../../../context/WizardContext';

const SetScope = () => {
  const { wizardData, updateWizardData } = useWizard();
  
  // This is a placeholder component
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">What do you want to crawl?</h2>
      <p className="text-gray-600 mb-6">Define the scope of your crawl and set limits</p>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
        <p className="text-blue-800">This is a placeholder for the Set Scope step.</p>
        <p className="text-blue-600 mt-2">We'll implement the Origin Snapshot step first as requested.</p>
      </div>
    </div>
  );
};

export default SetScope;