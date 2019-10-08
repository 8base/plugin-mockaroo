import * as R from 'ramda';
import { FIELD_TYPE, DATE_FORMATS, SWITCH_FORMATS, FieldSchema, isMetaField } from '@8base/utils';

const translateField = (field: FieldSchema) => {
  let result: any = {
    name: field.name,
  };

  switch (field.fieldType) {
    case FIELD_TYPE.DATE: {
      result = R.assoc('type', 'Date', result);

      if (R.pathEq(['fieldTypeAttributes', 'format'], DATE_FORMATS.DATE, field)) {
        result = R.assoc('format', '%F', result);
      }

      break;
    }

    case FIELD_TYPE.NUMBER: {
      result = R.assoc('type', 'Number', result);

      const minValue = R.path(['fieldTypeAttributes', 'minValue'], field);

      if (!R.isNil(minValue)) {
        result = R.assoc('min', minValue, result);
      }

      const maxValue = R.path(['fieldTypeAttributes', 'maxValue'], field);

      if (!R.isNil(maxValue)) {
        result = R.assoc('max', maxValue, result);
      }

      if (R.hasPath(['fieldTypeAttributes', 'precision'], field)) {
        result = R.assoc('decimals', field.fieldTypeAttributes.precision, result);
      }
      break;
    }

    case FIELD_TYPE.SWITCH: {
      if (R.pathEq(['fieldTypeAttributes', 'format'], SWITCH_FORMATS.CUSTOM, field)) {
        result = R.assoc('type', 'Custom List', result);
        result = R.assoc('values', field.fieldTypeAttributes.listOptions, result);
      } else {
        result = R.assoc('type', 'Boolean', result);
      }

      break;
    }

    case FIELD_TYPE.TEXT: {
      result = R.assoc('type', 'Character Sequence', result);
      result = R.assoc('format', '******', result);

      break;
    }

    default: {
      throw new Error(`Plugin doesn't support tables with ${field.fieldType} fields`);
    }
  }

  return result;
};

export const translateFields = R.pipe(
  R.reject(isMetaField),
  R.map(translateField),
);
