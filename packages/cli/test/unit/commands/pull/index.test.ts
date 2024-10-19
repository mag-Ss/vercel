import assert from 'assert';
import { describe, expect, it } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import pull from '../../../../src/commands/pull';
import { setupUnitFixture } from '../../../helpers/setup-unit-fixture';
import { client } from '../../../mocks/client';
import { defaultProject, useProject } from '../../../mocks/project';
import { useTeams } from '../../../mocks/team';
import { useUser } from '../../../mocks/user';

describe('pull', () => {
  describe('[project-path]', () => {
    describe.todo('--environment');
    describe.todo('--git-branch');
    describe.todo('--yes');
  });

  it('should handle pulling', async () => {
    const cwd = setupUnitFixture('vercel-pull-next');
    useUser();
    const teams = useTeams('team_dummy');
    assert(Array.isArray(teams));
    useProject({
      ...defaultProject,
      id: 'vercel-pull-next',
      name: 'vercel-pull-next',
    });
    client.setArgv('pull', cwd);
    const exitCodePromise = pull(client);
    await expect(client.stderr).toOutput(
      `Downloading \`development\` Environment Variables for ${teams[0].slug}/vercel-pull-next`
    );
    await expect(client.stderr).toOutput(
      `Created .vercel${path.sep}.env.development.local file`
    );
    await expect(client.stderr).toOutput(
      `Downloaded project settings to ${cwd}${path.sep}.vercel${path.sep}project.json`
    );
    await expect(exitCodePromise).resolves.toEqual(0);

    const rawDevEnv = await fs.readFile(
      path.join(cwd, '.vercel', '.env.development.local')
    );
    const devFileHasDevEnv = rawDevEnv.toString().includes('SPECIAL_FLAG');
    expect(devFileHasDevEnv).toBeTruthy();
  });

  it('should fail with message to pull without a link and without --env', async () => {
    client.stdin.isTTY = false;

    const cwd = setupUnitFixture('vercel-pull-unlinked');
    useUser();
    useTeams('team_dummy');

    client.setArgv('pull', cwd);
    const exitCodePromise = pull(client);
    await expect(client.stderr).toOutput(
      'Command `vercel pull` requires confirmation. Use option "--yes" to confirm.'
    );
    await expect(exitCodePromise).resolves.toEqual(1);
  });

  it('should fail without message to pull without a link and with --env', async () => {
    const fixtureName = 'vercel-pull-next';
    const cwd = setupUnitFixture(fixtureName);

    client.scenario.get(`/v9/projects/${fixtureName}`, (req, res) => {
      return res.status(404).json({});
    });

    useUser();
    useTeams('team_dummy');

    client.setArgv('pull', cwd, '--yes');
    const exitCodePromise = pull(client);
    await expect(client.stderr).not.toOutput(
      'Command `vercel pull` requires confirmation. Use option "--yes" to confirm.'
    );
    await expect(exitCodePromise).resolves.toEqual(1);
  });

  it('should handle pulling with env vars (headless mode)', async () => {
    try {
      process.env.VERCEL_PROJECT_ID = 'vercel-pull-next';
      process.env.VERCEL_ORG_ID = 'team_dummy';

      const cwd = setupUnitFixture('vercel-pull-next');

      // Remove the `.vercel` dir to ensure that the `pull`
      // command creates a new one based on env vars
      await fs.remove(path.join(cwd, '.vercel'));

      useUser();
      const teams = useTeams('team_dummy');
      assert(Array.isArray(teams));
      useProject({
        ...defaultProject,
        id: 'vercel-pull-next',
        name: 'vercel-pull-next',
        accountId: 'team_dummy',
      });
      client.setArgv('pull', cwd);
      const exitCodePromise = pull(client);
      await expect(client.stderr).toOutput(
        `Downloading \`development\` Environment Variables for ${teams[0].slug}/vercel-pull-next`
      );
      await expect(client.stderr).toOutput(
        `Created .vercel${path.sep}.env.development.local file`
      );
      await expect(client.stderr).toOutput(
        `Downloaded project settings to ${cwd}${path.sep}.vercel${path.sep}project.json`
      );
      await expect(exitCodePromise).resolves.toEqual(0);

      const config = await fs.readJSON(path.join(cwd, '.vercel/project.json'));
      expect(config).toMatchInlineSnapshot(`
        {
          "orgId": "team_dummy",
          "projectId": "vercel-pull-next",
          "settings": {
            "createdAt": 1555413045188,
          },
        }
      `);
    } finally {
      delete process.env.VERCEL_PROJECT_ID;
      delete process.env.VERCEL_ORG_ID;
    }
  });

  it('should handle --environment=preview flag', async () => {
    const cwd = setupUnitFixture('vercel-pull-next');
    useUser();
    const teams = useTeams('team_dummy');
    assert(Array.isArray(teams));
    useProject({
      ...defaultProject,
      id: 'vercel-pull-next',
      name: 'vercel-pull-next',
    });
    client.setArgv('pull', '--environment=preview', cwd);
    const exitCodePromise = pull(client);
    await expect(client.stderr).toOutput(
      `Downloading \`preview\` Environment Variables for ${teams[0].slug}/vercel-pull-next`
    );
    await expect(client.stderr).toOutput(
      `Created .vercel${path.sep}.env.preview.local file`
    );
    await expect(client.stderr).toOutput(
      `Downloaded project settings to ${cwd}${path.sep}.vercel${path.sep}project.json`
    );
    await expect(exitCodePromise).resolves.toEqual(0);

    const rawPreviewEnv = await fs.readFile(
      path.join(cwd, '.vercel', '.env.preview.local')
    );
    const previewFileHasPreviewEnv = rawPreviewEnv
      .toString()
      .includes('REDIS_CONNECTION_STRING');
    expect(previewFileHasPreviewEnv).toBeTruthy();
  });

  it('should handle --environment=production flag', async () => {
    const cwd = setupUnitFixture('vercel-pull-next');
    useUser();
    const teams = useTeams('team_dummy');
    assert(Array.isArray(teams));
    useProject({
      ...defaultProject,
      id: 'vercel-pull-next',
      name: 'vercel-pull-next',
      accountId: 'team_dummy',
    });
    client.setArgv('pull', '--environment=production', cwd);
    const exitCodePromise = pull(client);
    await expect(client.stderr).toOutput(
      `Downloading \`production\` Environment Variables for ${teams[0].slug}/vercel-pull-next`
    );
    await expect(client.stderr).toOutput(
      `Created .vercel${path.sep}.env.production.local file`
    );
    await expect(client.stderr).toOutput(
      `Downloaded project settings to ${cwd}${path.sep}.vercel${path.sep}project.json`
    );
    await expect(exitCodePromise).resolves.toEqual(0);

    const rawProdEnv = await fs.readFile(
      path.join(cwd, '.vercel', '.env.production.local')
    );
    const previewFileHasPreviewEnv1 = rawProdEnv
      .toString()
      .includes('REDIS_CONNECTION_STRING');
    expect(previewFileHasPreviewEnv1).toBeTruthy();
    const previewFileHasPreviewEnv2 = rawProdEnv
      .toString()
      .includes('SQL_CONNECTION_STRING');
    expect(previewFileHasPreviewEnv2).toBeTruthy();
  });

  it('should work with repo link', async () => {
    const cwd = setupUnitFixture('monorepo-link');
    useUser();
    const teams = useTeams('team_dummy');
    assert(Array.isArray(teams));
    useProject({
      ...defaultProject,
      id: 'QmbKpqpiUqbcke',
      name: 'dashboard',
      rootDirectory: 'dashboard',
      accountId: 'team_dummy',
    });
    client.cwd = path.join(cwd, 'dashboard');
    client.setArgv('pull');
    const exitCodePromise = pull(client);
    await expect(client.stderr).toOutput(
      `Downloading \`development\` Environment Variables for ${teams[0].slug}/dashboard`
    );
    await expect(client.stderr).toOutput(
      `Created .vercel${path.sep}.env.development.local file`
    );
    await expect(client.stderr).toOutput(
      `Downloaded project settings to ${cwd}${path.sep}dashboard${path.sep}.vercel${path.sep}project.json`
    );
    await expect(exitCodePromise).resolves.toEqual(0);
  });
});
