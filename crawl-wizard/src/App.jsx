import { WizardProvider } from './context/WizardContext';
import WizardLayout from './components/wizard/WizardLayout';

function App() {
  return (
    <WizardProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <WizardLayout />
        </div>
      </div>
    </WizardProvider>
  );
}

export default App;