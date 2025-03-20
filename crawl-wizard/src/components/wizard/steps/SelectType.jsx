import { useWizard } from '../../../context/WizardContext';

const SelectType = () => {
  const { wizardData, updateWizardData } = useWizard();
  
  // This is a placeholder component
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">What do you need to do with your content?</h2>
      <p className="text-gray-600 mb-6">Choose based on where you are in your translation process</p>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
        <p className="text-blue-800">This is a placeholder for the Select Type step.</p>
        <p className="text-blue-600 mt-2">We'll implement the Origin Snapshot step first as requested.</p>
      </div>
    </div>
  );
};

export default SelectType;