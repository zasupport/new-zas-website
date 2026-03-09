import type { SchemaOrg } from '@/types';

interface SchemaOrgProps {
  schema: SchemaOrg | SchemaOrg[];
}

export default function SchemaOrg({ schema }: SchemaOrgProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
