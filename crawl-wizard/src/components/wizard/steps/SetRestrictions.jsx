import { useWizard } from '../../../context/WizardContext';

const SetRestrictions = () => {
  const { wizardData, updateWizardData } = useWizard();
  
  // This is a placeholder component
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Manage restrictions for this crawl</h2>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
        <p className="text-blue-800">This is a placeholder for the Set Restrictions step.</p>
      </div>
    </div>
  );
};

export default SetRestrictions;