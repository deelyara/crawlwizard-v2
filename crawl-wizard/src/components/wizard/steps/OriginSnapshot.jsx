import { useState } from 'react';
import { useWizard } from '../../../context/WizardContext';
import { Info, ChevronDown } from 'lucide-react';
import Card from '../../ui/Card';
import RadioButton from '../../ui/RadioButton';
import Tooltip from '../../ui/Tooltip';

const OriginSnapshot = () => {
  const { wizardData, updateWizardData } = useWizard();
  const { snapshotConfig } = wizardData;
  
  const [selectedOption, setSelectedOption] = useState('use-snapshot');
  const [selectedSnapshot, setSelectedSnapshot] = useState(snapshotConfig.selected || 'latest-crawl');
  const [selectedStrategy, setSelectedStrategy] = useState('crawl-new-pages');
  const [showConfigDetails, setShowConfigDetails] = useState(false);
  const [snapshotName, setSnapshotName] = useState('');
  const [includePattern, setIncludePattern] = useState('');
  const [excludePattern, setExcludePattern] = useState('');
  const [cacheTypes, setCacheTypes] = useState({
    html: true,
    js: false,
    css: false,
    images: false,
    json: false,
    xml: false
  });
  
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  
  const handleSnapshotChange = (snapshot) => {
    setSelectedSnapshot(snapshot);
  };
  
  const handleStrategyChange = (strategy) => {
    setSelectedStrategy(strategy);
  };
  
  const handleCacheTypeChange = (type) => {
    setCacheTypes({
      ...cacheTypes,
      [type]: !cacheTypes[type]
    });
  };
  
  const toggleConfigDetails = () => {
    setShowConfigDetails(!showConfigDetails);
  };
  
  const handleSave = () => {
    updateWizardData({
      snapshotConfig: {
        ...snapshotConfig,
        option: selectedOption,
        selected: selectedSnapshot,
        strategy: selectedStrategy,
        name: snapshotName,
        includePattern,
        excludePattern,
        cacheTypes
      }
    });
  };
  
  // Save changes when navigating away
  const handleBlur = () => {
    handleSave();
  };
  
  return (
    <div onBlur={handleBlur}>
      <h2 className="text-xl font-medium mb-4">Origin snapshots</h2>
      <p className="text-gray-600 mb-6">
        Configure how to handle content changes since the last crawl
      </p>
      
      {/* Snapshot options */}
      <div className="space-y-6">
        {/* Use snapshot option */}
        <div className="mb-6">
          <div className="flex items-start mb-4">
            <input
              type="radio"
              id="use-snapshot"
              name="snapshot-option"
              className="h-4 w-4 mt-1 text-md-primary focus:ring-md-primary border-gray-300"
              checked={selectedOption === 'use-snapshot'}
              onChange={() => handleOptionChange('use-snapshot')}
            />
            <div className="ml-3">
              <label htmlFor="use-snapshot" className="block text-sm font-medium">
                Use snapshot from previous crawl
              </label>
              <p className="text-sm text-gray-500">
                Compare content with a previous crawl to detect changes
              </p>
            </div>
          </div>
          
          {selectedOption === 'use-snapshot' && (
            <div className="ml-7 space-y-4">
              {/* Snapshot dropdown */}
              <div>
                <label htmlFor="snapshot-select" className="block text-sm mb-1">
                  Latest crawl
                </label>
                <select
                  id="snapshot-select"
                  className="w-full p-2 pr-8 border border-gray-300 rounded-md"
                  value={selectedSnapshot}
                  onChange={(e) => handleSnapshotChange(e.target.value)}
                >
                  <option value="latest-crawl">Latest crawl</option>
                  {snapshotConfig.availableSnapshots && snapshotConfig.availableSnapshots.map((snapshot) => (
                    <option key={snapshot.id} value={snapshot.id}>
                      {snapshot.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* How should new pages be handled */}
              <div>
                <p className="text-sm mb-2">How should new pages be handled?</p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="crawl-new-pages"
                      name="page-strategy"
                      className="h-4 w-4 mt-1 text-md-primary focus:ring-md-primary border-gray-300"
                      checked={selectedStrategy === 'crawl-new-pages'}
                      onChange={() => handleStrategyChange('crawl-new-pages')}
                    />
                    <div className="ml-3">
                      <label htmlFor="crawl-new-pages" className="block text-sm">
                        Crawl new pages
                      </label>
                      <p className="text-sm text-gray-500">
                        Extract content from pages that were not present in the snapshot
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="skip-new-pages"
                      name="page-strategy"
                      className="h-4 w-4 mt-1 text-md-primary focus:ring-md-primary border-gray-300"
                      checked={selectedStrategy === 'skip-new-pages'}
                      onChange={() => handleStrategyChange('skip-new-pages')}
                    />
                    <div className="ml-3">
                      <label htmlFor="skip-new-pages" className="block text-sm">
                        Skip new pages
                      </label>
                      <p className="text-sm text-gray-500">
                        Only crawl pages that were present in the snapshot
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Crawl without snapshot option */}
        <div>
          <div className="flex items-start">
            <input
              type="radio"
              id="crawl-without-snapshot"
              name="snapshot-option"
              className="h-4 w-4 mt-1 text-md-primary focus:ring-md-primary border-gray-300"
              checked={selectedOption === 'crawl-without-snapshot'}
              onChange={() => handleOptionChange('crawl-without-snapshot')}
            />
            <div className="ml-3">
              <label htmlFor="crawl-without-snapshot" className="block text-sm font-medium">
                Crawl without snapshot comparison
              </label>
              <p className="text-sm text-gray-500">
                Extract content from all pages without comparing to previous crawls
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Snapshot configuration details */}
      <div className="mt-8">
        <div 
          className="flex items-center cursor-pointer text-gray-700"
          onClick={toggleConfigDetails}
        >
          <h3 className="text-md font-medium">Snapshot configuration details</h3>
          <ChevronDown 
            className={`ml-2 w-5 h-5 transition-transform ${showConfigDetails ? 'transform rotate-180' : ''}`} 
          />
        </div>
        
        {showConfigDetails && (
          <div className="mt-4 space-y-4">
            {/* Snapshot name */}
            <div>
              <label htmlFor="snapshot-name" className="block text-sm font-medium mb-1">
                Snapshot name
              </label>
              <input
                type="text"
                id="snapshot-name"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={snapshotName}
                onChange={(e) => setSnapshotName(e.target.value)}
                placeholder="Enter snapshot name"
              />
            </div>
            
            {/* Content path patterns */}
            <div>
              <h4 className="text-sm font-medium mb-2">Content path patterns</h4>
              <p className="text-xs text-gray-500 mb-2">
                Define which content should be included in or excluded from the snapshot using URL patterns
              </p>
              
              {/* Include content */}
              <div className="mb-3">
                <label htmlFor="include-pattern" className="block text-sm mb-1">
                  Include content matching
                </label>
                <input
                  type="text"
                  id="include-pattern"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={includePattern}
                  onChange={(e) => setIncludePattern(e.target.value)}
                  placeholder="e.g., /blog/*"
                />
              </div>
              
              {/* Exclude content */}
              <div>
                <label htmlFor="exclude-pattern" className="block text-sm mb-1">
                  Exclude content matching
                </label>
                <input
                  type="text"
                  id="exclude-pattern"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={excludePattern}
                  onChange={(e) => setExcludePattern(e.target.value)}
                  placeholder="e.g., /admin/*, /private/*"
                />
              </div>
            </div>
            
            {/* Content types to cache */}
            <div>
              <h4 className="text-sm font-medium mb-2">Content types to cache</h4>
              <p className="text-xs text-gray-500 mb-2">
                Control what types of content are stored in the snapshot
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cache-html"
                    checked={cacheTypes.html}
                    onChange={() => handleCacheTypeChange('html')}
                    className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                  />
                  <label htmlFor="cache-html" className="ml-2 block text-sm">
                    Cache HTML
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cache-js-css"
                    checked={cacheTypes.js}
                    onChange={() => handleCacheTypeChange('js')}
                    className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                  />
                  <label htmlFor="cache-js-css" className="ml-2 block text-sm">
                    Cache JavaScript and CSS
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cache-images"
                    checked={cacheTypes.images}
                    onChange={() => handleCacheTypeChange('images')}
                    className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                  />
                  <label htmlFor="cache-images" className="ml-2 block text-sm">
                    Cache Images
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cache-json"
                    checked={cacheTypes.json}
                    onChange={() => handleCacheTypeChange('json')}
                    className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                  />
                  <label htmlFor="cache-json" className="ml-2 block text-sm">
                    Cache JSON
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="cache-xml"
                    checked={cacheTypes.xml}
                    onChange={() => handleCacheTypeChange('xml')}
                    className="h-4 w-4 text-md-primary focus:ring-md-primary border-gray-300 rounded"
                  />
                  <label htmlFor="cache-xml" className="ml-2 block text-sm">
                    Cache XML
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OriginSnapshot;