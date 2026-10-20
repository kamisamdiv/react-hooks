import { useEffect, useState } from 'react';

import Exam1 from './exams/exam1/App.jsx';
import Exam2 from './exams/exam2/App.jsx';
import Exam3 from './exams/exam3/App.jsx';
import Exam4 from './exams/exam4/App.jsx';
import Exam5 from './exams/exam5/App.jsx';
import Exam6 from './exams/exam6/App.jsx';

const EXAMS = [
  { number: 1, title: 'Task Counter', hook: 'useState', Component: Exam1 },
  { number: 2, title: 'Live Search', hook: 'useEffect', Component: Exam2 },
  { number: 3, title: 'Form Toolkit', hook: 'useRef', Component: Exam3 },
  { number: 4, title: 'Preferences', hook: 'useContext', Component: Exam4 },
  { number: 5, title: 'Product Explorer', hook: 'useMemo · useCallback', Component: Exam5 },
  { number: 6, title: 'Issue Tracker', hook: 'useReducer', Component: Exam6 },
];

export default function App() {
  const [activeExam, setActiveExam] = useState(1);
  const selectedExam = EXAMS.find((exam) => exam.number === activeExam);
  const ActiveExam = selectedExam.Component;

  useEffect(() => {
    return () => {
      if (activeExam === 2) document.title = 'React Hooks Practical Exam';
    };
  }, [activeExam]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="workspace-brand" href="#exam-content" aria-label="React Hooks Practical home">
          <span className="workspace-mark" aria-hidden="true">
            R
          </span>
          <span className="brand-copy">
            <strong>React Hooks</strong>
            <span>Practical Exam</span>
          </span>
        </a>

        <div className="sidebar-label">EXAMS</div>
        <nav className="exam-navigation" aria-label="Choose a practical exam">
          {EXAMS.map(({ number, title, hook }) => {
            const selected = activeExam === number;
            return (
              <button
                key={number}
                type="button"
                className={`exam-tab${selected ? ' is-active' : ''}`}
                aria-current={selected ? 'page' : undefined}
                aria-controls="exam-content"
                onClick={() => setActiveExam(number)}
              >
                <span className="exam-number">{String(number).padStart(2, '0')}</span>
                <span className="exam-tab-copy">
                  <span className="exam-tab-title">{title}</span>
                  <span className="exam-tab-hook">{hook}</span>
                </span>
              </button>
            );
          })}
        </nav>

      </aside>

      <div className="main-column">
        <header className="topbar">
          <span>{selectedExam.title}</span>
          <div className="topbar-profile">
            <span className="profile-copy">
              <strong>Sinay, Lady Divinah M.</strong>
              <span>BSIT3 - G1</span>
            </span>
          </div>
        </header>

        <div className="dashboard">
          <div className="dashboard-heading">
            <h1>Good to see you, Lady Divinah.</h1>
          </div>

          <section id="exam-content" className="exam-surface" aria-label={`Exam ${activeExam}: ${selectedExam.title}`}>
            <ActiveExam />
          </section>

          <footer className="workspace-footer">Built with React Hooks</footer>
        </div>
      </div>
    </div>
  );
}
