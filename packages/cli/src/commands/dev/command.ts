import { packageName } from '../../util/pkg-name';
import { confirmOption, yesOption } from '../../util/arg-common';

export const devCommand = {
  name: 'dev',
  description: `Starts the \`${packageName} dev\` server.`,
  arguments: [
    {
      name: 'dir',
      required: false,
    },
  ],
  options: [
    {
      name: 'listen',
      description: 'Specify a URI endpoint on which to listen [0.0.0.0:3000]',
      argument: 'uri',
      shorthand: 'l',
      type: String,
      deprecated: false,
    },
    yesOption,
    { name: 'port', shorthand: 'p', type: String, deprecated: true },
    { ...confirmOption, deprecated: true },
  ],
  examples: [
    {
      name: `Start the \`${packageName} dev\` server on port 8080`,
      value: `${packageName} dev --listen 8080`,
    },
    {
      name: 'Make the `vercel dev` server bind to localhost on port 5000',
      value: `${packageName} dev --listen 127.0.0.1:5000 `,
    },
  ],
} as const;
