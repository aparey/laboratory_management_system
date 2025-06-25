import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Samples } from './pages/Samples';
import { SampleDetails } from './pages/SampleDetails';
import { NewSample } from './pages/NewSample';
import { Experiments } from './pages/Experiments';
import { ExperimentDetails } from './pages/ExperimentDetails';
import { Analysis } from './pages/Analysis';
import { Settings } from './pages/Settings';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="samples" element={<Samples />} />
          <Route path="samples/new" element={<NewSample />} />
          <Route path="samples/:id" element={<SampleDetails />} />
          <Route path="experiments" element={<Experiments />} />
          <Route path="experiments/:id" element={<ExperimentDetails />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;