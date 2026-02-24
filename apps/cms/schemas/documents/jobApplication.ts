import { defineType } from "sanity";

export default defineType({
  name: "jobApplication",
  title: "Candidatura",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "surname", type: "string" },
    { name: "email", type: "string" },
    { name: "region", type: "string" },
    { name: "role", type: "string" },
    { name: "message", type: "text" },
    {
      name: "cv",
      type: "file",
      options: { accept: ".pdf" }
    },
    { name: "createdAt", type: "datetime" }
  ]
});