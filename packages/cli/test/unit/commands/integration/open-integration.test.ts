import { beforeEach, describe, expect, it, vi } from 'vitest';
import open from 'open';
import integrationCommand from '../../../../src/commands/integration';
import { client } from '../../../mocks/client';
import { useConfiguration } from '../../../mocks/integration';
import { defaultProject, useProject } from '../../../mocks/project';
import { useTeams } from '../../../mocks/team';
import { useUser } from '../../../mocks/user';

// 500 error responses take more than 5 seconds to return, even when mocked, so this extra time is for the 500 error test.
vi.setConfig({ testTimeout: 20000 });

vi.mock('open', () => {
  return {
    default: vi.fn(),
  };
});

const openMock = vi.mocked(open);

beforeEach(() => {
  openMock.mockClear();
});

describe('integration', () => {
  describe('open', () => {
    describe('[name]', () => {
      beforeEach(() => {
        useUser();
      });

      describe('found integrations', () => {
        const teamId = 'team_dummy';

        beforeEach(() => {
          const teams = useTeams(teamId);
          const team = Array.isArray(teams) ? teams[0] : teams.teams[0];
          client.config.currentTeam = team.id;

          useConfiguration();
        });

        it('should open dashboard for user with the configuration ID and team ID', async () => {
          useProject({
            ...defaultProject,
            id: 'vercel-integration-open',
            name: 'vercel-integration-open',
          });
          client.setArgv('integration', 'open', 'acme');
          const exitCodePromise = integrationCommand(client);
          await expect(exitCodePromise).resolves.toEqual(0);
          await expect(client.stderr).toOutput('Opening the acme dashboard...');
          expect(openMock).toHaveBeenCalledWith(
            'https://vercel.com/api/marketplace/sso?teamId=team_dummy&integrationConfigurationId=acme-1'
          );
        });

        it("should open dashboard for user with the first returned configuration's ID when multiple are returned", async () => {
          useProject({
            ...defaultProject,
            id: 'vercel-integration-open',
            name: 'vercel-integration-open',
          });
          client.setArgv('integration', 'open', 'acme-two-configurations');
          const exitCodePromise = integrationCommand(client);
          await expect(exitCodePromise).resolves.toEqual(0);
          await expect(client.stderr).toOutput(
            'Opening the acme-two-configurations dashboard...'
          );
          expect(openMock).toHaveBeenCalledWith(
            'https://vercel.com/api/marketplace/sso?teamId=team_dummy&integrationConfigurationId=acme-first'
          );
        });
      });

      describe('errors', () => {
        it('should error when no integration arugment is passed', async () => {
          client.setArgv('integration', 'open');
          const exitCodePromise = integrationCommand(client);
          await expect(exitCodePromise).resolves.toEqual(1);
          await expect(client.stderr).toOutput(
            'Error: You must pass an integration slug'
          );
        });

        it('should error when more than one integration arugment is passed', async () => {
          client.setArgv('integration', 'open', 'acme', 'foobar');
          const exitCodePromise = integrationCommand(client);
          await expect(exitCodePromise).resolves.toEqual(1);
          await expect(client.stderr).toOutput(
            'Error: Cannot open more than one dashboard at a time'
          );
        });

        it('should error when no team is present', async () => {
          client.setArgv('integration', 'open', 'acme');
          const exitCodePromise = integrationCommand(client);
          await expect(exitCodePromise).resolves.toEqual(1);
          await expect(client.stderr).toOutput('Error: Team not found');
        });

        it('should error when no configuration exists for the provided slug', async () => {
          const teams = useTeams('team_dummy');
          const team = Array.isArray(teams) ? teams[0] : teams.teams[0];
          client.config.currentTeam = team.id;
          useConfiguration();

          client.setArgv('integration', 'open', 'acme-no-results');
          const exitCodePromise = integrationCommand(client);
          await expect(exitCodePromise).resolves.toEqual(1);
          await expect(client.stderr).toOutput(
            'Error: No configuration found for "acme-no-results".'
          );
        });

        it('should error when the configurations API responds erroneously', async () => {
          const teams = useTeams('team_dummy');
          const team = Array.isArray(teams) ? teams[0] : teams.teams[0];
          client.config.currentTeam = team.id;
          useConfiguration();

          client.setArgv('integration', 'open', 'error');
          const exitCodePromise = integrationCommand(client);
          await expect(client.stderr).toOutput(
            'Error: Failed to fetch configuration for "error": Response Error (500)',
            20000
          );
          await expect(exitCodePromise).resolves.toEqual(1);
        });
      });
    });
  });
});
