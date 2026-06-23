import { test as base } from '@playwright/test';
import { ReportHandler } from '../utils/request-handler';
import { APILogger } from './loggers';
import {setExpectCustomLogger} from '../utils/custom-expect'
import {config} from '../utils/api-test-config'

type MyFixtures = {
  api: ReportHandler;
  config: typeof config
};

export const test = base.extend<MyFixtures>({
  api: async ({request}, use) => {
    const logger = new APILogger
    setExpectCustomLogger(logger)
    const reportHandler = new ReportHandler(request,config.apiurl,logger);
    await use(reportHandler);
  },

  config: async({}, use)=> [
    await use(config)
  ]
});

export { expect } from '@playwright/test';