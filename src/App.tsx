import { AmazonHeader } from './components/AmazonHeader';
import { AmazonFooter } from './components/AmazonFooter';
import { ScrollExperience } from './components/ScrollExperience';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded focus:shadow-lg"
      >
        Skip to main content
      </a>

      <AmazonHeader />

      {/* Main content */}
      <main id="main-content" className="flex-1 overflow-hidden">
        <ScrollExperience />
      </main>

      <AmazonFooter />
    </div>
  );
}

export default App;
