import { useState } from 'react';
import { useWizard } from '../../../context/WizardContext';
import { Package, Settings, Sliders, ChevronDown, FileSearch, Code, Image, Globe, Link } from 'lucide-react';
import Card from '../../ui/Card';
import Tooltip from '../../ui/Tooltip';

const FineTune = () => {
  const { wizardData, updateWizardData } = useWizard();
  const { fineTune } = wizardData;
  
  const [expandedSections, setExpandedSections] = useState({
    resources: true,
    performance: false,
    advanced: false
  });
  
  const [resources, setResources] = useState({
    html: fineTune?.collectResources?.html || true,
    js: fineTune?.collectResources?.js || false,
    images: fineTune?.collectResources?.images || false,
    external: fineTune?.collectResources?.external || false,
    shortLinks: fineTune?.collectResources?.shortLinks || false
  });
  
  const [options, setOptions] = useState({
    skipContentType: fineTune?.options?.skipContentType || true,
    useEtags: fineTune?.options?.useEtags || false,
    simultaneousRequests: fineTune?.options?.simultaneousRequests || 5
  });
  
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  const handleResourceChange = (key) => {
    const newResources = {
      ...resources,
      [key]: !resources[key]
    };
    
    setResources(newResources);
    saveChanges(newResources, options);
  };
  
  const handleOptionChange = (key, value) => {
    const newValue = typeof value === 'object' ? value.target.value : value;
    
    const newOptions = {
      ...options,
      [key]: typeof newOptions === 'boolean' ? !options[key] : newValue
    };
    
    setOptions(newOptions);
    saveChanges(resources, newOptions);
  };
  
  const handleCheckboxOption = (key) => {
    const newOptions = {
      ...options,
      [key]: !options[key]
    };
    
    setOptions(newOptions);
    saveChanges(resources, newOptions);
  };
  
  const saveChanges = (newResources, newOptions) => {
    updateWizardData({
      fineTune: {
        collectResources: newResources,
        options: newOptions
      }
    });
  };
  
  // Save changes when navigating away
  const handleBlur = () => {
    saveChanges(resources, options);
  };
  
  const AccordionSection = ({ 
    title, 
    icon, 
    expanded, 
    onToggle, 
    children 
  }) => (
    <Card className="mb-4">
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
          size={20} 
          className={`accordion-chevron ${expanded ? 'transform rotate-180' : ''}`} 
        />
      </div>
      
      {expanded && (
        <div className="accordion-content border-t border-gray-100 mt-3 pt-4 px-4">
          {children}
        </div>
      )}
    </Card>
  );
  
  return (
    <div className="space-y-6" onBlur={handleBlur}>
      <h2 className="section-header">Fine-tune crawl settings</h2>
      <p className="section-description">
        Adjust advanced settings to customize your crawl behavior
      </p>
      
      {/* Resources section */}
      <AccordionSection
        title="Resources to collect"
        icon={<Package size={20} className="accordion-icon" />}
        expanded={expandedSections.resources}
        onToggle={() => toggleSection('resources')}
      >
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="collect-html"
              checked={resources.html}
              onChange={() => handleResourceChange('html')}
              className="form-checkbox"
            />
            <div className="ml-2 flex items-center">
              <label htmlFor="collect-html" className="block text-sm">
                <div className="flex items-center gap-2">
                  <FileSearch size={16} className="text-gray-600" />
                  Collect new HTML pages
                </div>
              </label>
              <Tooltip text="Any pages the crawling process finds will be added to the page list" />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="collect-js"
              checked={resources.js}
              onChange={() => handleResourceChange('js')}
              className="form-checkbox"
            />
            <div className="ml-2 flex items-center">
              <label htmlFor="collect-js" className="block text-sm">
                <div className="flex items-center gap-2">
                  <Code size={16} className="text-gray-600" />
                  Collect JS, CSS resources
                </div>
              </label>
              <Tooltip text="The crawler will add newly found JS and CSS resources to the project" />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="collect-images"
              checked={resources.images}
              onChange={() => handleResourceChange('images')}
              className="form-checkbox"
            />
            <div className="ml-2 flex items-center">
              <label htmlFor="collect-images" className="block text-sm">
                <div className="flex items-center gap-2">
                  <Image size={16} className="text-gray-600" />
                  Collect images, binary resources
                </div>
              </label>
              <Tooltip text="Images and binary content found on the site will be added to the Resources screen" />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="collect-external"
              checked={resources.external}
              onChange={() => handleResourceChange('external')}
              className="form-checkbox"
            />
            <div className="ml-2 flex items-center">
              <label htmlFor="collect-external" className="block text-sm">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-gray-600" />
                  Also collect resources from external domains
                </div>
              </label>
              <Tooltip text="This allows you to pick up resources that are linked to on the site" />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="collect-short-links"
              checked={resources.shortLinks}
              onChange={() => handleResourceChange('shortLinks')}
              className="form-checkbox"
            />
            <div className="ml-2 flex items-center">
              <label htmlFor="collect-short-links" className="block text-sm">
                <div className="flex items-center gap-2">
                  <Link size={16} className="text-gray-600" />
                  Collect short links
                </div>
              </label>
              <Tooltip text="WordPress sites tend to give a shorter link to every page. Enabling this will collect these links." />
            </div>
          </div>
        </div>
      </AccordionSection>
      
      {/* Performance section */}
      <AccordionSection
        title="Performance options"
        icon={<Sliders size={20} className="accordion-icon" />}
        expanded={expandedSections.performance}
        onToggle={() => toggleSection('performance')}
      >
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="skip-content-type"
              checked={options.skipContentType}
              onChange={() => handleCheckboxOption('skipContentType')}
              className="form-checkbox"
            />
            <div className="ml-2 flex items-center">
              <label htmlFor="skip-content-type" className="block text-sm">
                Skip content-type check if already determined
              </label>
              <Tooltip text="Enabled by default since it only applies to already crawled pages" />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="use-etags"
              checked={options.useEtags}
              onChange={() => handleCheckboxOption('useEtags')}
              className="form-checkbox"
            />
            <div className="ml-2 flex items-center">
              <label htmlFor="use-etags" className="block text-sm">
                Use ETAGs from last crawl
              </label>
              <Tooltip text="You could reduce remote server load on subsequent crawls, but skipping pages could lead to invalid crawl wordcount" />
            </div>
          </div>
          
          <div>
            <label htmlFor="simultaneous-requests" className="block text-sm font-medium mb-1">
              Limit number of simultaneous requests
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="simultaneous-requests"
                value={options.simultaneousRequests}
                onChange={(e) => handleOptionChange('simultaneousRequests', parseInt(e.target.value, 10) || 1)}
                min="1"
                max="20"
                className="form-input w-24"
              />
              <Tooltip text="Prevents the crawl from flooding a smaller server with requests" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Control the number of requests a crawl is allowed to send to the original site simultaneously.
            </p>
          </div>
        </div>
      </AccordionSection>
      
      {/* Advanced section */}
      <AccordionSection
        title="Advanced options"
        icon={<Settings size={20} className="accordion-icon" />}
        expanded={expandedSections.advanced}
        onToggle={() => toggleSection('advanced')}
      >
        <div className="warning-alert">
          <div className="warning-alert-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="warning-alert-content">
            Advanced options are under development and will be available in a future update.
          </div>
        </div>
      </AccordionSection>
    </div>
  );
};

export default FineTune;