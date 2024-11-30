import { SearchIcon } from 'lucide-react'
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";


const HelpCentre = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-3xl font-bold">Help Center</div>
        <div className="text-sm">Find answers, get support, and explore guides to make the most of GharSetu.</div>
      </div>
      <div className='border-[1px] border-[#DDD] rounded-lg w-full flex p-2 gap-2'>
        <SearchIcon />
        <input type='text' placeholder='Type your questions or keyword (e.g. Add Listings)...' className='w-full focus:outline-none' />
      </div>

      <div>
        <div className='text-3xl font-bold'>Got a Problem or Idea?</div>
        <Tabs variant="line" defaultIndex={0}>
          <TabList>
            <Tab>Report a Bug </Tab>
            <Tab>Suggest a Feature</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              Suggest a Bug
            </TabPanel>
            <TabPanel>
              Suggest a Feature
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}

export default HelpCentre