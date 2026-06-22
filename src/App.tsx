import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { logWebVitals } from "./utils/performance";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="loading-spinner">
      <div className="spinner-ring"></div>
      <div className="spinner-text">Loading Portfolio...</div>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    // Initialize performance monitoring
    logWebVitals();
    
    // Prevent context menu on right-click for production build
    if (import.meta.env.PROD) {
      // Optional: uncomment if needed
      // document.addEventListener("contextmenu", (e) => e.preventDefault());
    }
  }, []);

  return (
    <ErrorBoundary>
      <LoadingProvider>
        <Suspense fallback={<LoadingFallback />}>
          <MainContainer>
            <Suspense fallback={<LoadingFallback />}>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </ErrorBoundary>
  );
};

export default App;
