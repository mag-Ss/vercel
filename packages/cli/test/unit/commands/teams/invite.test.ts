import { describe, expect, it, beforeEach } from 'vitest';
import { client } from '../../../mocks/client';
import teams from '../../../../src/commands/teams';
import { useUser } from '../../../mocks/user';
import { useTeams } from '../../../mocks/team';

describe('teams invite', () => {
  const currentTeamId = 'team_123';

  beforeEach(() => {
    useUser();
    useTeams(currentTeamId);
  });

  describe('[email]', () => {
    beforeEach(() => {
      client.config = {
        currentTeam: currentTeamId,
      };

      client.scenario.post(`/teams/${currentTeamId}/members`, (req, res) => {
        return res.json({
          username: 'person1',
        });
      });
    });
    describe('a single email value', () => {
      it('tracks telemetry events', async () => {
        client.setArgv('teams', 'invite', 'me@example.com');
        const exitCodePromise = teams(client);
        await expect(exitCodePromise).resolves.toEqual(0);

        await expect(client.telemetryEventStore).toHaveTelemetryEvents([
          {
            key: 'subcommand:invite',
            value: 'invite',
          },
          {
            key: 'argument:email',
            value: 'ONE',
          },
        ]);
      });
    });

    describe('several email value', () => {
      it('tracks telemetry events', async () => {
        client.setArgv('teams', 'invite', 'me@example.com', 'you@example.com');
        const exitCodePromise = teams(client);
        await expect(exitCodePromise).resolves.toEqual(0);

        await expect(client.telemetryEventStore).toHaveTelemetryEvents([
          {
            key: 'subcommand:invite',
            value: 'invite',
          },
          {
            key: 'argument:email',
            value: 'MANY',
          },
        ]);
      });
    });
  });
});
