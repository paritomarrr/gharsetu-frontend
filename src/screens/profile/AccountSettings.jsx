import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PersonalInfo from '../../components/profile/PersonalInfo';
import Security from '../../components/profile/Security';
import Notifications from '../../components/profile/Notifications';
import Privacy from '../../components/profile/Privacy';

const AccountSettings = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-3xl font-bold">Account Settings</div>
        <div className="text-sm">Manage your profile, security, and preferences.</div>
      </div>

      <Tabs variant="line" defaultIndex={0}>
        <TabList>
          <Tab>Personal Information </Tab>
          <Tab>Security</Tab>
          <Tab>Notifications</Tab>
          <Tab>Privacy</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PersonalInfo />
          </TabPanel>
          <TabPanel>
            <Security />
          </TabPanel>
          <TabPanel>
            <Notifications />
          </TabPanel>
          <TabPanel>
            <Privacy />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AccountSettings;
