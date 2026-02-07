import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

export default defineConfig({
  projectId: "9qdhg391",
  dataset: "production",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes
  }
});
