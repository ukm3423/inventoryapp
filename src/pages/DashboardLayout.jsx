// Dashboard.js
import MainContent from '../components/MainContent';

import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default Dashboard;
