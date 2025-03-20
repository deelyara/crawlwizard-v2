import { useState } from 'react';
import { useWizard } from '../../../context/WizardContext';

const Recurrence = () => {
  const { wizardData, updateWizardData } = useWizard();
  
  const [frequency, setFrequency] = useState('weekly');
  const [customValue, setCustomValue] = useState('100');
  const [useDifferentSnapshot, setUseDifferentSnapshot] = useState(false);
  
  const handleFrequencyChange = (value) => {
    setFrequency(value);
  };
  
  const handleCustomValueChange = (e) => {
    setCustomValue(e.target.value);
  };
  
  const toggleUseDifferentSnapshot = () => {
    setUseDifferentSnapshot(!useDifferentSnapshot);
  };
  
  const handleSave = () => {
    updateWizardData({
      recurrence: {
        enabled: frequency !== 'no-recurrence',
        frequency,
        customValue: frequency === 'custom' ? customValue : null,
        useDifferentSnapshot
      }
    });
  };
  
  // Save changes when navigating away
  const handleBlur = () => {
    handleSave();
  };
  
  return (
    <div onBlur={handleBlur}>
      <h2 className="text-xl font-medium mb-4">Set recurring crawl</h2>
      <p className="text-gray-600 mb-6">
        Configure recurring crawls to automatically extract new content at specified intervals.
      </p>
      
      {/* Frequency selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">
          Crawl frequency
        </label>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="no-recurrence"
              name="frequency"
              value="no-recurrence"
              checked={frequency === 'no-recurrence'}
              onChange={() => handleFrequencyChange('no-recurrence')}
              className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300"
            />
            <label htmlFor="no-recurrence" className="ml-2 text-sm">
              No recurring crawls
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="daily"
              name="frequency"
              value="daily"
              checked={frequency === 'daily'}
              onChange={() => handleFrequencyChange('daily')}
              className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300"
            />
            <label htmlFor="daily" className="ml-2 text-sm">
              Daily
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="weekly"
              name="frequency"
              value="weekly"
              checked={frequency === 'weekly'}
              onChange={() => handleFrequencyChange('weekly')}
              className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300"
            />
            <label htmlFor="weekly" className="ml-2 text-sm">
              Weekly
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="monthly"
              name="frequency"
              value="monthly"
              checked={frequency === 'monthly'}
              onChange={() => handleFrequencyChange('monthly')}
              className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300"
            />
            <label htmlFor="monthly" className="ml-2 text-sm">
              Monthly
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="custom"
              name="frequency"
              value="custom"
              checked={frequency === 'custom'}
              onChange={() => handleFrequencyChange('custom')}
              className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300"
            />
            <label htmlFor="custom" className="ml-2 text-sm">
              Custom...
            </label>
            
            {frequency === 'custom' && (
              <input
                type="text"
                value={customValue}
                onChange={handleCustomValueChange}
                className="ml-3 w-16 p-1 rounded-md border border-gray-300 shadow-sm"
                aria-label="Custom frequency value"
              />
            )}
          </div>
        </div>
      </div>
      
      {frequency !== 'no-recurrence' && (
        <>
          <div className="mb-4 text-sm text-gray-600">
            The crawl is going to start ~March 27, 2025 00:00:00
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="different-snapshot"
                checked={useDifferentSnapshot}
                onChange={toggleUseDifferentSnapshot}
                className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
              />
              <label htmlFor="different-snapshot" className="ml-2 block text-sm text-gray-700">
                Use a different origin (source) snapshot for every crawl
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Recurrence;