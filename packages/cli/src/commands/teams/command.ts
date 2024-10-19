import { packageName } from '../../util/pkg-name';
import { nextOption } from '../../util/arg-common';

export const listSubcommand = {
  name: 'ls',
  description: "Show all teams you're a part of",
  arguments: [],
  options: [
    nextOption,
    { name: 'since', shorthand: null, type: String, deprecated: false },
    { name: 'until', shorthand: null, type: String, deprecated: false },
    { name: 'count', shorthand: 'C', type: Number, deprecated: false },
  ],
  examples: [],
} as const;

export const teamsCommand = {
  name: 'teams',
  description: 'Manage teams under your Vercel account',
  arguments: [],
  subcommands: [
    {
      name: 'add',
      description: 'Create a new team',
      arguments: [],
      options: [],
      examples: [],
    },
    listSubcommand,
    {
      name: 'switch',
      description: 'Switch to a different team',
      arguments: [
        {
          name: 'name',
          required: false,
        },
      ],
      options: [],
      examples: [],
    },
    {
      name: 'invite',
      description: 'Invite a new member to a team',
      arguments: [
        {
          name: 'emails',
          required: true,
        },
      ],
      options: [],
      examples: [],
    },
  ],
  options: [
    // {
    //   name: 'next',
    //   shorthand: 'N',
    //   type: String,
    //   argument: 'MS',
    //   deprecated: false,
    //   description: 'Show next page of results',
    // },
  ],
  examples: [
    {
      name: "Switch to a team. If your team's url is 'vercel.com/name', then 'name' is the slug. If the slug is omitted, you can choose interactively.",
      value: `${packageName} teams switch <slug>`,
    },
    {
      name: 'Invite new members (interactively)',
      value: `${packageName} teams invite`,
    },
    {
      name: 'Invite multiple members simultaneously',
      value: `${packageName} teams invite abc@vercel.com xyz@vercel.com`,
    },
    {
      name: 'Paginate results, where `1584722256178` is the time in milliseconds since the UNIX epoch.',
      value: `${packageName} teams ls --next 1584722256178`,
    },
  ],
} as const;
