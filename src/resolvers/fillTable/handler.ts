import * as Mockaroo from 'mockaroo';
import { SchemaNameGenerator } from '@8base/schema-name-generator';
import gql from 'graphql-tag';

import { TABLE_SCHEMA_QUERY } from './constants';
import { translateFields } from './utils';

const { MOCKAROO_API_KEY } = process.env;

type FillTableMockarooResult = {
  data: {
    success: boolean;
  };
};

export default async (event: any, ctx: any): Promise<FillTableMockarooResult> => {
  const { id, count, apiKey } = event.data;

  const client = new Mockaroo.Client({
    apiKey: apiKey || MOCKAROO_API_KEY,
  });

  const { table: tableSchema } = await ctx.api.gqlRequest(TABLE_SCHEMA_QUERY, {
    id,
  });

  const fields = translateFields(tableSchema.fields);

  const data = await client.generate({
    count,
    fields,
  });

  await ctx.api.gqlRequest(
    gql`
    mutation FillTableCreateMany($data: [${SchemaNameGenerator.getCreateManyInputName(tableSchema.name)}]!) {
      ${SchemaNameGenerator.getCreateManyItemFieldName(tableSchema.name)} (data: $data) {
        count
      }
    }
  `,
    { data },
  );

  return {
    data: {
      success: true,
    },
  };
};
