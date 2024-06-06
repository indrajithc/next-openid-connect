import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

let schemaUrl = process.env.API_HOST;

if (!schemaUrl) {
  console.error("Before GraphQL types can be generated, you need to set API_HOST environment variable.");
  console.error("Follow development instructions in the README.md file.");
  process.exit(1);
}

const config: CodegenConfig = {
  overwrite: true,
  schema: `${schemaUrl}/graphql/`,
  documents: "src/api/**/*.graphql",
  generates: {
    "src/api/saleor/generated/": {
      preset: "client",
      plugins: [],
      config: {
        documentMode: "string",
        useTypeImports: true,
        strictScalars: true,
        scalars: {
          Time: "string",
          Date: "string",
          DateTime: "string",
          Day: "number",
          Decimal: "number",
          GenericScalar: "unknown",
          JSON: "unknown",
          JSONString: "string",
          Metadata: "Record<string, string>",
          Minute: "number",
          PositiveDecimal: "number",
          UUID: "string",
          Upload: "unknown",
          WeightScalar: "unknown",
          _Any: "unknown",
        },
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
