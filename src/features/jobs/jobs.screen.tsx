import { useState } from "react";
import { ContainedScreen } from "../../shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent } from "../../components/ui/card";
import { AllJobsComponent, SavedJobsComponent } from ".";

const WidgetTabs = {
  All: 'all',
  Saved: 'saved',
}

type WidgetTabs = typeof WidgetTabs[keyof typeof WidgetTabs];

export const JobsScreen = () => {
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
            <TabsTrigger 
              value={WidgetTabs.All}
              className="px-8 py-4" 
            >
              All Jobs
            </TabsTrigger>
            <TabsTrigger 
              value={WidgetTabs.Saved}
              className="px-8 py-4" 
            >
              Saved Jobs
            </TabsTrigger>
          </TabsList>

          <CardContent className="p-8">
            <TabsContent value={WidgetTabs.All}>
              <AllJobsComponent />
            </TabsContent>

            <TabsContent value={WidgetTabs.Saved}>
              <SavedJobsComponent />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </ContainedScreen>
  );
}
