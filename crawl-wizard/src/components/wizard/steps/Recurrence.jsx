import { useState } from 'react';
import { useWizard } from '../../../context/WizardContext';
import { Clock, AlertCircle, ChevronDown, Settings } from 'lucide-react';
import Tooltip from '../../ui/Tooltip';
import Card from '../../ui/Card';

const Recurrence = () => {
  const { wizardData, updateWizardData } = useWizard();
  
  const [frequency, setFrequency] = useState('weekly');
  const [customValue, setCustomValue] = useState('100');
  const [useDifferentSnapshot, setUseDifferentSnapshot] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const handleFrequencyChange = (value) => {
    setFrequency(value);
  };
  
  const handleCustomValueChange = (e) => {
    setCustomValue(e.target.value);
  };
  
  const toggleUseDifferentSnapshot = () => {
    setUseDifferentSnapshot(!useDifferentSnapshot);
  };
  
  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
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
  
  const AccordionSection = ({ 
    title, 
    icon, 
    expanded, 
    onToggle, 
    children 
  }) => (
    <Card 
      className="mb-5" 
      minimal={true}
      elevation="none"
    >
      <div 
        className="accordion-header"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className="accordion-icon-container">
            {icon}
          </div>
          <span className="accordion-title">{title}</span>
        </div>
        <ChevronDown 
          size={18} 
          className={`accordion-chevron ${expanded ? 'transform rotate-180' : ''}`} 
        />
      </div>
      
      {expanded && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </Card>
  );
  
  return (
    <div onBlur={handleBlur}>
      <h2 className="section-header">Set recurring crawl</h2>
      <p className="section-description">
        Configure recurring crawls to automatically extract new content at specified intervals.
      </p>
      
      <AccordionSection
        title="Crawl frequency"
        icon={<Clock size={20} className="accordion-icon" />}
        expanded={true}
        onToggle={() => {}}
      >
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="no-recurrence"
              name="frequency"
              value="no-recurrence"
              checked={frequency === 'no-recurrence'}
              onChange={() => handleFrequencyChange('no-recurrence')}
              className="form-radio"
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
              className="form-radio"
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
              className="form-radio"
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
              className="form-radio"
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
              className="form-radio"
            />
            <label htmlFor="custom" className="ml-2 text-sm">
              Custom...
            </label>
            
            {frequency === 'custom' && (
              <input
                type="text"
                value={customValue}
                onChange={handleCustomValueChange}
                className="ml-3 w-24 p-2 rounded-md border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary-100 focus:border-md-primary transition-all duration-200"
                aria-label="Custom frequency value"
              />
            )}
          </div>
        </div>
      </AccordionSection>
      
      {frequency !== 'no-recurrence' && (
        <>
          <div className="info-alert">
            <div className="info-alert-icon">
              <AlertCircle size={16} />
            </div>
            <div className="info-alert-content">
              The crawl is scheduled to start ~March 27, 2025 00:00:00
            </div>
          </div>
          
          <AccordionSection
            title="Advanced settings"
            icon={<Settings size={20} className="accordion-icon" />}
            expanded={showAdvanced}
            onToggle={toggleAdvanced}
          >
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="different-snapshot"
                  checked={useDifferentSnapshot}
                  onChange={toggleUseDifferentSnapshot}
                  className="form-checkbox"
                />
                <div className="ml-2 flex items-center">
                  <label htmlFor="different-snapshot" className="block text-sm text-gray-700">
                    Use a different origin (source) snapshot for every crawl
                  </label>
                  <Tooltip text="This option helps track changes over time by creating a new snapshot for each recurring crawl" />
                </div>
              </div>
            </div>
          </AccordionSection>
        </>
      )}
    </div>
  );
};

export default Recurrence;