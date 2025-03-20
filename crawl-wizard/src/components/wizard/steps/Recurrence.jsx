import { useState } from 'react';
import { useWizard } from '../../../context/WizardContext';
import { ChevronDown } from 'lucide-react';
import RadioButton from '../../ui/RadioButton';

const Recurrence = () => {
  const { wizardData, updateWizardData } = useWizard();
  
  const [frequency, setFrequency] = useState('weekly');
  const [customValue, setCustomValue] = useState('100');
  const [useDifferentSnapshot, setUseDifferentSnapshot] = useState(false);
  const [resourcesExpanded, setResourcesExpanded] = useState(false);
  const [miscExpanded, setMiscExpanded] = useState(false);
  const [resources, setResources] = useState({
    html: true,
    js: true,
    images: false,
    binary: false,
    errorPages: false,
    externalDomains: false,
    redirectionPages: false,
    shortLinks: false
  });
  
  const handleFrequencyChange = (value) => {
    setFrequency(value);
  };
  
  const handleResourceChange = (resource) => {
    setResources({
      ...resources,
      [resource]: !resources[resource]
    });
  };
  
  const handleCustomValueChange = (e) => {
    setCustomValue(e.target.value);
  };
  
  const toggleResourcesExpanded = () => {
    setResourcesExpanded(!resourcesExpanded);
  };
  
  const toggleMiscExpanded = () => {
    setMiscExpanded(!miscExpanded);
  };
  
  const handleSave = () => {
    updateWizardData({
      recurrence: {
        enabled: frequency !== 'no-recurrence',
        frequency,
        customValue: frequency === 'custom' ? customValue : null,
        useDifferentSnapshot,
        resources
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
          <RadioButton
            id="no-recurrence"
            name="frequency"
            value="no-recurrence"
            checked={frequency === 'no-recurrence'}
            onChange={() => handleFrequencyChange('no-recurrence')}
            label="No recurring crawls"
          />
          
          <RadioButton
            id="daily"
            name="frequency"
            value="daily"
            checked={frequency === 'daily'}
            onChange={() => handleFrequencyChange('daily')}
            label="Daily"
          />
          
          <RadioButton
            id="weekly"
            name="frequency"
            value="weekly"
            checked={frequency === 'weekly'}
            onChange={() => handleFrequencyChange('weekly')}
            label="Weekly"
          />
          
          <RadioButton
            id="monthly"
            name="frequency"
            value="monthly"
            checked={frequency === 'monthly'}
            onChange={() => handleFrequencyChange('monthly')}
            label="Monthly"
          />
          
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
            <label htmlFor="custom" className="ml-2 text-sm font-medium">
              Custom...
            </label>
            
            {frequency === 'custom' && (
              <input
                type="text"
                value={customValue}
                onChange={handleCustomValueChange}
                className="ml-3 w-16 rounded-md border-gray-300 shadow-sm focus:border-md-primary focus:ring-md-primary"
              />
            )}
          </div>
        </div>
      </div>
      
      {frequency !== 'no-recurrence' && (
        <div className="mb-4 text-sm text-gray-600">
          The crawl is going to start ~March 27, 2025 00:00:00
        </div>
      )}
      
      {frequency !== 'no-recurrence' && (
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="different-snapshot"
              checked={useDifferentSnapshot}
              onChange={() => setUseDifferentSnapshot(!useDifferentSnapshot)}
              className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
            />
            <label htmlFor="different-snapshot" className="ml-2 block text-sm text-gray-700">
              Use a different origin (source) snapshot for every crawl
            </label>
          </div>
        </div>
      )}
      
      {/* Collapsible sections (only shown when recurrence is enabled) */}
      {frequency !== 'no-recurrence' && (
        <>
          {/* Resources to collect */}
          <div className="border border-gray-200 rounded-md overflow-hidden mb-4">
            <div 
              className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200 cursor-pointer"
              onClick={toggleResourcesExpanded}
            >
              <h3 className="text-sm font-medium">Resources to collect</h3>
              <ChevronDown 
                size={20} 
                className={`text-gray-500 transition-transform ${resourcesExpanded ? 'transform rotate-180' : ''}`} 
              />
            </div>
            
            {resourcesExpanded && (
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-4">
                  Configure recurring crawls to automatically extract new content at specified intervals.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Common resources</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="html-pages"
                          checked={resources.html}
                          onChange={() => handleResourceChange('html')}
                          className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                        />
                        <label htmlFor="html-pages" className="ml-2 block text-sm text-gray-700">
                          HTML pages
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="js-resources"
                          checked={resources.js}
                          onChange={() => handleResourceChange('js')}
                          className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                        />
                        <label htmlFor="js-resources" className="ml-2 block text-sm text-gray-700">
                          JS, JSON, XML, CSS resources
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="images"
                          checked={resources.images}
                          onChange={() => handleResourceChange('images')}
                          className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                        />
                        <label htmlFor="images" className="ml-2 block text-sm text-gray-700">
                          Images
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="binary-resources"
                          checked={resources.binary}
                          onChange={() => handleResourceChange('binary')}
                          className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                        />
                        <label htmlFor="binary-resources" className="ml-2 block text-sm text-gray-700">
                          Binary resources
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Additional resources</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="error-pages"
                          checked={resources.errorPages}
                          onChange={() => handleResourceChange('errorPages')}
                          className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                        />
                        <label htmlFor="error-pages" className="ml-2 block text-sm text-gray-700">
                          Error pages (HTTP 4XX)
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="external-domains"
                          checked={resources.externalDomains}
                          onChange={() => handleResourceChange('externalDomains')}
                          className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                        />
                        <label htmlFor="external-domains" className="ml-2 block text-sm text-gray-700">
                          Resources from external domains
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="redirection-pages"
                          checked={resources.redirectionPages}
                          onChange={() => handleResourceChange('redirectionPages')}
                          className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                        />
                        <label htmlFor="redirection-pages" className="ml-2 block text-sm text-gray-700">
                          Redirection pages (HTTP 3XX)
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="short-links"
                          checked={resources.shortLinks}
                          onChange={() => handleResourceChange('shortLinks')}
                          className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                        />
                        <label htmlFor="short-links" className="ml-2 block text-sm text-gray-700">
                          Short links (e.g. ?p=123456)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Miscellaneous settings */}
          <div className="border border-gray-200 rounded-md overflow-hidden mb-4">
            <div 
              className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200 cursor-pointer"
              onClick={toggleMiscExpanded}
            >
              <h3 className="text-sm font-medium">Miscellaneous settings</h3>
              <ChevronDown 
                size={20} 
                className={`text-gray-500 transition-transform ${miscExpanded ? 'transform rotate-180' : ''}`} 
              />
            </div>
            
            {miscExpanded && (
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notify-on-completion"
                      className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                    />
                    <label htmlFor="notify-on-completion" className="ml-2 block text-sm text-gray-700">
                      Notify me when crawl completes
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notify-on-error"
                      className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                    />
                    <label htmlFor="notify-on-error" className="ml-2 block text-sm text-gray-700">
                      Notify me when crawl fails
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Recurrence;