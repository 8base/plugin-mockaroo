import * as mockaroo from 'mockaroo';

import { TABLE_SCHEMA } from '../__fixtures__';
import handler from '../handler';

const context = {
  api: {
    gqlRequest: jest.fn().mockResolvedValueOnce({ table: TABLE_SCHEMA }),
  },
};

afterEach(() => {
  context.api.gqlRequest.mockReset();
  mockaroo.generate.mockClear();
});

it('Should mock data for the table with passed id according params', async () => {
  context.api.gqlRequest.mockResolvedValueOnce({ table: TABLE_SCHEMA });
  mockaroo.generate.mockResolvedValueOnce([{ foo: 'bar' }]);

  const result = await handler(
    {
      data: { id: TABLE_SCHEMA.id, count: 100, apiKey: 'apiKey' },
    },
    context,
  );

  expect(context.api.gqlRequest.mock.calls[0]).toMatchSnapshot();

  expect(mockaroo.generate).toHaveBeenCalledTimes(1);
  expect(mockaroo.generate.mock.calls[0]).toMatchSnapshot();

  expect(context.api.gqlRequest.mock.calls[1]).toMatchSnapshot();

  expect(context.api.gqlRequest).toHaveBeenCalledTimes(2);

  expect(result).toMatchSnapshot();
});
