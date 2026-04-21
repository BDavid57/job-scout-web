import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { JobsScreen} from "./features";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ContainedScreen } from "./shared";

const WidgetTabs = {
  All: 'add',
  Saved: 'saved',
}

type WidgetTabs = typeof WidgetTabs[keyof typeof WidgetTabs];

function App() {
  const [selectedTab, setSelectedTab] = useState<WidgetTabs>(WidgetTabs.All);

  const onTabChange = (value: string) => {
    setSelectedTab(value as WidgetTabs);
  }

  return (
    <ContainedScreen>
      <Tabs
        value={selectedTab}
        onValueChange={onTabChange}
        className="w-full space-y-0"
      >
        <Card>
          <TabsList className="px-6 pt-6">
            <TabsTrigger value={WidgetTabs.All}>
              All Jobs
            </TabsTrigger>
            <TabsTrigger value={WidgetTabs.Saved}>
              Saved Jobs
            </TabsTrigger>
          </TabsList>

          <CardContent className="p-8">
            <TabsContent value={WidgetTabs.All}>
              <JobsScreen />
            </TabsContent>

            <TabsContent value={WidgetTabs.Saved}>
              <div>Saved Jobs</div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </ContainedScreen>
  );
}

export default App;
