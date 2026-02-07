import { groq } from "next-sanity";

export const homeHeroQuery = groq`
  *[_type == "home"][0]{
    hero {
      fixedWord,
      rotatingWords,
      ctaLabel
    }
  }
`;
