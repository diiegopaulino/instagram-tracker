import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart3, UserX, RefreshCw, HelpCircle } from 'lucide-react';
import StatisticsTab from './tabs/StatisticsTab';
import NonFollowersTab from './tabs/NonFollowersTab';
import ChangesTab from './tabs/ChangesTab';
import HelpTab from './tabs/HelpTab';
import { downloadFile, generateMarkdownReport } from '@/utils/fileUtils';

export interface TabNavigationProps {
  followers: string[];
  following: string[];
  notFollowingBack: string[];
  historyFollowers: string[] | null;
  historyFollowing: string[] | null;
  newFollowers: string[];
  unfollowers: string[];
  unfollowed: string[];
  hasData: boolean;
}

const TabNavigation = ({
  followers,
  following,
  notFollowingBack,
  historyFollowers,
  historyFollowing,
  newFollowers,
  unfollowers,
  unfollowed,
  hasData
}: TabNavigationProps) => {
  const [currentTab, setCurrentTab] = useState("stats");

  const handleSaveFollowers = () => {
    downloadFile(followers, "seguidores_atual.json");
  };

  const handleSaveFollowing = () => {
    downloadFile(following, "seguindo_atual.json");
  };

  const handleSaveReport = () => {
    const markdownReport = generateMarkdownReport(
      followers,
      following,
      notFollowingBack,
      newFollowers,
      unfollowers,
      unfollowed,
      historyFollowers,
      historyFollowing
    );

    const blob = new Blob([markdownReport], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "relatorio_instagram.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Tabs defaultValue="stats" value={currentTab} onValueChange={setCurrentTab} className="w-full mt-6">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="stats" className="flex items-center gap-1">
          <BarChart3 size={16} />
          <span className="hidden sm:inline">Estatísticas</span>
        </TabsTrigger>
        <TabsTrigger value="non-followers" className="flex items-center gap-1">
          <UserX size={16} />
          <span className="hidden sm:inline">Não te seguem</span>
        </TabsTrigger>
        <TabsTrigger value="changes" className="flex items-center gap-1">
          <RefreshCw size={16} />
          <span className="hidden sm:inline">Mudanças</span>
        </TabsTrigger>
        <TabsTrigger value="help" className="flex items-center gap-1">
          <HelpCircle size={16} />
          <span className="hidden sm:inline">Instruções</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="stats" className="tab-panel">
        <StatisticsTab 
          followers={followers}
          following={following}
          notFollowingBack={notFollowingBack}
          hasData={hasData}
          handleSaveFollowers={handleSaveFollowers}
          handleSaveFollowing={handleSaveFollowing}
          handleSaveReport={handleSaveReport}
        />
      </TabsContent>

      <TabsContent value="non-followers" className="tab-panel">
        <NonFollowersTab 
          notFollowingBack={notFollowingBack}
          hasData={hasData}
        />
      </TabsContent>

      <TabsContent value="changes" className="tab-panel">
        <ChangesTab 
          newFollowers={newFollowers}
          unfollowers={unfollowers}
          unfollowed={unfollowed}
          hasHistory={!!historyFollowers && !!historyFollowing}
          hasData={hasData}
        />
      </TabsContent>

      <TabsContent value="help" className="tab-panel">
        <HelpTab />
      </TabsContent>
    </Tabs>
  );
};

export default TabNavigation;
