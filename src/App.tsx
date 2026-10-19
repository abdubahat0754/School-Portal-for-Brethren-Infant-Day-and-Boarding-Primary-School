import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NoticeTicker from '@/components/NoticeTicker';
import RegistrationBanner from '@/components/RegistrationBanner';
import BackToTop from '@/components/BackToTop';
import Hero from '@/components/Hero';
import NewsFeed from '@/components/NewsFeed';
import ArticleDetail from '@/components/ArticleDetail';
import AcademicCalendar from '@/components/AcademicCalendar';
import AttendanceRollCall from '@/components/AttendanceRollCall';
import SchoolFeesModal from '@/components/SchoolFeesModal';
import ContactModal from '@/components/ContactModal';
import AdminPanel from '@/components/AdminPanel';
import { NEWS_CATEGORIES } from '@/types';

type View = 'feed' | 'article' | 'calendar' | 'attendance';

function App() {
  const [activeTab, setActiveTab] = useState<string>('All News');
  const [view, setView] = useState<View>('feed');
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);

  const [feesOpen, setFeesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  // Admin access is open (no password) so staff can manage content directly.
  const isAdmin = true;

  // scroll to top on view/tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Academic Calendar') {
      setView('calendar');
    } else if (tab === 'Attendance Roll Call') {
      setView('attendance');
    } else {
      setView('feed');
    }
  };

  const openArticle = (id: string) => {
    setOpenArticleId(id);
    setView('article');
  };

  const backToFeed = () => {
    setView('feed');
    setOpenArticleId(null);
  };

  const handleAdminLogout = () => {
    setAdminOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NoticeTicker />
      <RegistrationBanner onApplyNow={() => setContactOpen(true)} />
      <Header
        onAdminClick={() => setAdminOpen(true)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={NEWS_CATEGORIES}
      />

      <main className="flex-1">
        {view === 'feed' && (
          <>
            <Hero
              onApplyNow={() => setContactOpen(true)}
              onPayFees={() => setFeesOpen(true)}
            />
            <div className="max-w-7xl mx-auto px-4 py-10">
              <NewsFeed
                onOpenArticle={openArticle}
                filterCategory={activeTab === 'All News' ? 'All News' : activeTab}
              />
            </div>
          </>
        )}

        {view === 'article' && openArticleId && (
          <ArticleDetail articleId={openArticleId} onBack={backToFeed} />
        )}

        {view === 'calendar' && <AcademicCalendar />}

        {view === 'attendance' && <AttendanceRollCall />}
      </main>

      <Footer />
      <BackToTop />

      {/* Modals */}
      <SchoolFeesModal isOpen={feesOpen} onClose={() => setFeesOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      {adminOpen && (
        <AdminPanel isOpen={adminOpen} onClose={handleAdminLogout} />
      )}
    </div>
  );
}

export default App;
            
