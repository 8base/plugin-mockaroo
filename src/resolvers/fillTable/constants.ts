import gql from 'graphql-tag';

export const TABLE_SCHEMA_QUERY = gql`
  query TableSchema($id: ID!) {
    table(id: $id) {
      ...TableFragment
    }
  }

  fragment TableFragment on Table {
    id
    name
    fields {
      ...TableFieldFragment
    }
  }

  fragment TableFieldFragment on TableField {
    ...CommonTableFieldFragment
    fieldTypeAttributes {
      ...TextFieldTypeAttributes
      ...NumberFieldTypeAttributes
      ...FileFieldTypeAttributes
      ...DateFieldTypeAttributes
      ...SwitchFieldTypeAttributes
      ...SmartFieldTypesAttributes
      ...MissingRelationFieldTypeAttributes
    }
  }

  fragment CommonTableFieldFragment on TableField {
    id
    name
    displayName
    table {
      id
      name
      displayName
    }
    description
    fieldType
    fieldTypeAttributes {
      ...TextFieldTypeAttributes
      ...NumberFieldTypeAttributes
      ...FileFieldTypeAttributes
      ...DateFieldTypeAttributes
      ...SwitchFieldTypeAttributes
      ...MissingRelationFieldTypeAttributes
    }
    isList
    isRequired
    isUnique
    defaultValue
    isSystem
    isMeta
    relation {
      refFieldName
      refFieldDisplayName
      relationTableName
      relationFieldName
      refTable {
        id
        name
        displayName
      }
      refField {
        id
        name
        displayName
      }
      refFieldIsList
      refFieldIsRequired
    }
    schemaFeatures {
      update
      delete
    }
    dataFeatures {
      create
      update
    }
  }

  fragment DateFieldTypeAttributes on DateFieldTypeAttributes {
    format
  }

  fragment TextFieldTypeAttributes on TextFieldTypeAttributes {
    format
    fieldSize
  }

  fragment NumberFieldTypeAttributes on NumberFieldTypeAttributes {
    format
    precision
    currency
    minValue
    maxValue
    isBigInt
  }

  fragment FileFieldTypeAttributes on FileFieldTypeAttributes {
    format
    maxSize
    typeRestrictions
  }

  fragment SmartFieldTypesAttributes on SmartFieldTypeAttributes {
    format
    innerFields {
      name
      displayName
      description
      fieldType
      isList
      isRequired
      isUnique
      fieldTypeAttributes {
        ...TextFieldTypeAttributes
        ...NumberFieldTypeAttributes
        ...FileFieldTypeAttributes
        ...DateFieldTypeAttributes
        ...SwitchFieldTypeAttributes
        ...MissingRelationFieldTypeAttributes
      }
    }
  }

  fragment SwitchFieldTypeAttributes on SwitchFieldTypeAttributes {
    format
    listOptions
  }

  fragment MissingRelationFieldTypeAttributes on MissingRelationFieldTypeAttributes {
    missingTable
  }
`;
