import { describe, expect, it } from 'vitest';
import { client } from '../../../mocks/client';
import teamsList from '../../../../src/commands/teams/list';
import { useUser } from '../../../mocks/user';
import { useTeams } from '../../../mocks/team';

describe('teams ls', () => {
  describe.todo('--since');
  describe.todo('--until');
  describe.todo('--count');
  describe.todo('--next');

  describe('non-northstar', () => {
    it('should display your personal account', async () => {
      const user = useUser();
      useTeams(undefined, { apiVersion: 2 });
      const exitCodePromise = teamsList(client);
      await expect(client.stderr).toOutput(user.username);
      await expect(exitCodePromise).resolves.toEqual(0);
    });
  });

  describe('northstar', () => {
    it('should not display your personal account', async () => {
      const user = useUser({
        version: 'northstar',
      });
      useTeams(undefined, { apiVersion: 2 });
      const exitCodePromise = teamsList(client);
      await expect(client.stdout).not.toOutput(user.username);
      await expect(exitCodePromise).resolves.toEqual(0);
    });
  });
});
