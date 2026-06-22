import { lazy, Suspense, useEffect, memo } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { logWebVitals } from "./utils/performance";
import { LoadingProvider } from "./context/LoadingProvider";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));

const LoadingFallback = memo(function LoadingFallback() {
  return (
    <div className="loading-fallback">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-text">Loading Portfolio...</div>
      </div>
    </div>
  );
});

const App = memo(function App() {
  useEffect(() => {
    logWebVitals();
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
});

export default App;
