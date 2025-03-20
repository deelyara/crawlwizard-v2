import { useWizard } from '../../../context/WizardContext';
import { ChevronRight } from 'lucide-react';

const Review = () => {
  const { wizardData } = useWizard();
  
  // Helper function to get the scope display text
  const getScopeText = () => {
    switch(wizardData.scopeType) {
      case 'entire-website':
        return `Crawl entire website${wizardData.pageLimit ? `, Page limit: ${wizardData.pageLimit}` : ''}`;
      case 'existing-pages':
        return 'Crawl existing pages';
      case 'specific-pages':
        return 'Crawl specific pages';
      case 'sitemap':
        return 'Crawl pages listed in your sitemaps or sitemap index';
      default:
        return 'Unknown scope';
    }
  };
  
  // Helper function to get the crawl type text
  const getCrawlTypeText = () => {
    switch(wizardData.crawlType) {
      case 'discovery':
        return 'Discovery crawl';
      case 'content-extraction':
        return 'Content extraction';
      case 'new-content-detection':
        return 'New content detection';
      case 'tls-content-extraction':
        return 'TLS content extraction';
      default:
        return 'Unknown type';
    }
  };
  
  // Helper function to render restrictions section
  const renderRestrictions = () => {
    const hasExistingRestrictions = 
      wizardData.existingRestrictions?.include?.length > 0 || 
      wizardData.existingRestrictions?.exclude?.length > 0;
      
    const hasTemporaryRestrictions = 
      wizardData.temporaryRestrictions?.include?.length > 0 || 
      wizardData.temporaryRestrictions?.exclude?.length > 0;
    
    if (!hasExistingRestrictions && !hasTemporaryRestrictions) {
      return (
        <>
          <p className="text-sm mb-3">Existing project restrictions: None</p>
          <p className="text-sm">Temporary crawl restrictions: None</p>
        </>
      );
    }
    
    return (
      <>
        {hasExistingRestrictions && (
          <div className="mb-3">
            <p className="font-medium text-sm">Existing project restrictions:</p>
            {wizardData.existingRestrictions.include?.length > 0 && (
              <div className="mt-1">
                <p className="text-sm">Crawl pages starting with:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {wizardData.existingRestrictions.include.map((path, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
                      <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {path}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {wizardData.existingRestrictions.exclude?.length > 0 && (
              <div className="mt-1">
                <p className="text-sm">Don't crawl pages starting with:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {wizardData.existingRestrictions.exclude.map((path, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
                      <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {path}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {hasTemporaryRestrictions && (
          <div>
            <p className="font-medium text-sm">
              {wizardData.makeRestrictionsPermament ? 'New project restrictions:' : 'Temporary crawl restrictions:'}
            </p>
            <p className="text-xs text-gray-500 mb-1">
              {wizardData.makeRestrictionsPermament
                ? 'These restrictions will be added to your project settings permanently'
                : 'These restrictions will only apply to this crawl session'
              }
            </p>
            
            {wizardData.temporaryRestrictions.include?.length > 0 && (
              <div className="mt-1">
                <p className="text-sm">Crawl pages starting with:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {wizardData.temporaryRestrictions.include.map((path, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
                      <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {path}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {wizardData.temporaryRestrictions.exclude?.length > 0 && (
              <div className="mt-1">
                <p className="text-sm">Don't crawl pages starting with:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {wizardData.temporaryRestrictions.exclude.map((path, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
                      <svg className="w-3 h-3 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {path}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  };
  
  // Helper function to render snapshot information
  const renderSnapshotInfo = () => {
    const { snapshotConfig } = wizardData;
    
    if (!snapshotConfig || !snapshotConfig.option) {
      return null;
    }
    
    let content;
    
    if (snapshotConfig.option === 'use-snapshot') {
      const snapshotName = snapshotConfig.selected === 'latest-crawl' 
        ? 'Latest crawl' 
        : snapshotConfig.availableSnapshots?.find(s => s.id === snapshotConfig.selected)?.name || 'Selected snapshot';
      
      const strategyText = snapshotConfig.strategy === 'crawl-new-pages'
        ? 'Crawl new pages: Extract content from pages that were not present in the snapshot'
        : 'Skip new pages: Only crawl pages that were present in the snapshot';
      
      content = (
        <>
          <p className="mb-1">Use snapshot from previous crawl: {snapshotName}</p>
          <p>{strategyText}</p>
        </>
      );
    } else {
      content = (
        <p>Crawl without snapshot comparison: Extract content from all pages without comparing to previous crawls</p>
      );
    }
    
    return content;
  };
  
  // Helper function to render recurrence information
  const renderRecurrenceInfo = () => {
    const { recurrence } = wizardData;
    
    if (!recurrence || !recurrence.enabled) {
      return <p>No recurring crawls</p>;
    }
    
    let frequencyText;
    
    switch(recurrence.frequency) {
      case 'daily':
        frequencyText = 'Daily';
        break;
      case 'weekly':
        frequencyText = 'Weekly';
        break;
      case 'monthly':
        frequencyText = 'Monthly';
        break;
      case 'custom':
        frequencyText = `Custom: ${recurrence.customValue || ''}`;
        break;
      default:
        frequencyText = 'Unknown frequency';
    }
    
    return (
      <>
        <p className="mb-1">Frequency: {frequencyText}</p>
        {recurrence.useDifferentSnapshot && (
          <p>Uses a different origin snapshot for every crawl</p>
        )}
      </>
    );
  };
  
  // Helper function to render fine-tune information
  const renderFineTuneInfo = () => {
    const { fineTune } = wizardData;
    
    if (!fineTune) {
      return <p>Default settings</p>;
    }
    
    // Resources
    const resources = [];
    if (fineTune.collectResources?.html) resources.push('HTML pages');
    if (fineTune.collectResources?.js) resources.push('JS/CSS');
    if (fineTune.collectResources?.images) resources.push('Images');
    if (fineTune.collectResources?.external) resources.push('External domains');
    if (fineTune.collectResources?.shortLinks) resources.push('Short links');
    
    // Options
    const options = [];
    if (fineTune.options?.skipContentType) options.push('Skip content-type check');
    if (fineTune.options?.useEtags) options.push('Use ETAGs');
    if (fineTune.options?.simultaneousRequests) {
      options.push(`Max ${fineTune.options.simultaneousRequests} simultaneous requests`);
    }
    
    return (
      <>
        {resources.length > 0 && (
          <p className="mb-1">Resources to collect: {resources.join(', ')}</p>
        )}
        
        {options.length > 0 && (
          <p>Options: {options.join(', ')}</p>
        )}
      </>
    );
  };
  
  return (
    <div>
      <h2 className="text-xl font-medium mb-6">Review and start crawl</h2>
      
      {/* Crawl Type Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Crawl type</h3>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
        <div className="py-2 px-4 bg-gray-50 rounded-md">
          <p>{getCrawlTypeText()}</p>
          {wizardData.prerenderPages && <p className="mt-1">Prerender pages: Yes</p>}
        </div>
      </div>
      
      {/* Scope Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Scope</h3>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
        <div className="py-2 px-4 bg-gray-50 rounded-md">
          <p>{getScopeText()}</p>
          
          {wizardData.scopeType === 'existing-pages' && (
            <div className="mt-2 max-h-36 overflow-y-auto">
              <p className="font-medium text-sm">Page list:</p>
              <ul className="text-sm mt-1 ml-4 list-disc">
                {wizardData.pageList?.map((page, index) => (
                  <li key={index}>{page}</li>
                ))}
              </ul>
            </div>
          )}
          
          {wizardData.scopeType === 'specific-pages' && wizardData.specificUrls?.length > 0 && (
            <div className="mt-2 max-h-36 overflow-y-auto">
              <p className="font-medium text-sm">Specific URL list:</p>
              <ul className="text-sm mt-1 ml-4 list-disc">
                {wizardData.specificUrls.map((url, index) => (
                  <li key={index}>{url}</li>
                ))}
              </ul>
            </div>
          )}
          
          {wizardData.scopeType === 'sitemap' && wizardData.sitemapUrls?.length > 0 && (
            <div className="mt-2 max-h-36 overflow-y-auto">
              <p className="font-medium text-sm">Sitemap list:</p>
              <ul className="text-sm mt-1 ml-4 list-disc">
                {wizardData.sitemapUrls.map((url, index) => (
                  <li key={index}>{url}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Restrictions Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Restrictions</h3>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
        <div className="py-2 px-4 bg-gray-50 rounded-md">
          {renderRestrictions()}
        </div>
      </div>
      
      {/* Snapshots Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Snapshots</h3>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
        <div className="py-2 px-4 bg-gray-50 rounded-md">
          {renderSnapshotInfo() || <p>No snapshot configuration</p>}
        </div>
      </div>
      
      {/* Fine-tune Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Fine-tune</h3>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
        <div className="py-2 px-4 bg-gray-50 rounded-md">
          {renderFineTuneInfo()}
        </div>
      </div>
      
      {/* Recurrence Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Recurrence</h3>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
        <div className="py-2 px-4 bg-gray-50 rounded-md">
          {renderRecurrenceInfo()}
        </div>
      </div>
    </div>
  );
};

export default Review;