import { defineType } from "sanity";

export default defineType({
  name: "contactRequest",
  title: "Richiesta Contatto",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "surname", type: "string" },
    { name: "email", type: "string" },
    { name: "company", type: "string" },
    { name: "service", type: "string" },
    { name: "budget", type: "string" },
    { name: "message", type: "text" },
    { name: "createdAt", type: "datetime" }
  ]
});