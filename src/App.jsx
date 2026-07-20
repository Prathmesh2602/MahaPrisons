import { AccessibilityProvider } from './hooks/useAccessibility';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AccessibilityProvider>
      <HomePage />
    </AccessibilityProvider>
  );
}

export default App;
