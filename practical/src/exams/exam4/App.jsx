import { PreferencesProvider } from './context/PreferencesContext.jsx';
import Dashboard from './components/Dashboard.jsx';
import PreferencesPanel from './components/PreferencesPanel.jsx';
import ArticlePreview from './components/ArticlePreview.jsx';
import ProviderDebugDemo from './components/ProviderDebugDemo.jsx';
import PageHeader from './components/PageHeader.jsx';
import { PAGE, SECTION } from './ui.js';

/**
 * Exam 4 — Application Preferences
 * Primary hooks: useContext, useState
 */
export default function App() {
  return (
    <>
      <PageHeader
        icon="⚙️"
        title="Application Preferences"
        exam={4}
        hooks={['useContext', 'useState']}
      />

      <main className={PAGE}>
        <div className="mt-8 grid gap-5">
          <PreferencesProvider>
            <Dashboard />
            <PreferencesPanel />
            <ArticlePreview />
          </PreferencesProvider>
        </div>

        <div className={SECTION}>
          <ProviderDebugDemo />
        </div>
      </main>
    </>
  );
}
