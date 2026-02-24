import { groq } from "next-sanity";

export const homeQuery = groq`
*[_type == "home"][0]{

seo{
  title,
  description,
  noIndex,
  ogImage{
    asset->{url},
    alt
  }
},

  hero {
    title,
    subtitle,
    ctaLabel,
    socials[] {
      label,
      url,
      type
    }
  },

  services {
    kicker,
    title,
    subtitle,
    items[] {
      title,
      text,
      slug,
      image {
        asset->{
          url
        },
        alt
      }
    }
  },

showcase {
  kicker,
  title,
  text,
  media {
    type,
    image {
      asset->{
        url
      }
    },
    videoUrl
  }
},

metrics {
  kicker,
  title,
  subtitle,
  mainValue,
  mainLabel,
  items[] {
    value,
    label
  }
},

cta {
  kicker,
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,

  backgroundImage {
    asset->{ url },
    alt
  },

  image {
    asset->{ url },
    alt
  }
}
  
}
`;


export const headerQuery = groq`
  *[_type == "header"][0]{
    logo {
      asset->{
        url
      }
    },
    menuLeft[]{
      label,
      link
    },
    menuRightTitle{
      label,
      link
    },
    menuRight[]{
      label,
      link
    },
    address,
    bottomTags,
    socials[]{
      type,
      url
    }
  }
`;

export const careersQuery = groq`
  *[_type == "careers"][0]{
seo{
  title,
  description,
  noIndex,
  ogImage{
    asset->{url},
    alt
  }
},

    hero {
      title,
      subtitle
    },
    form {
      kicker,
      title,
      subtitle,
      roles[]{
        label,
        regions
      },
      privacyText,
      submitLabel,
    }
  }
`;

export const contactsQuery = `
*[_type == "contactsPage"][0]{

seo{
  title,
  description,
  noIndex,
  ogImage{
    asset->{url},
    alt
  }
},

  hero {
    title,
    subtitle
  },

  support {
    title,
    text,
    buttonLabel,
    phone
  },

  form {
    kicker,
    title,
    subtitle,

    image {
      asset->{
        url
      },
      alt
    },

    "config": {
      nameField {
        enabled,
        label
      },

      surnameField {
        enabled,
        label
      },

      emailField {
        enabled,
        label
      },

      companyField {
        enabled,
        label
      },

      serviceField {
        enabled,
        label,
        options[] {
          label,
          value
        }
      },

      budgetField {
        enabled,
        label,
        options[] {
          label,
          value
        }
      },

      messageField {
        enabled,
        label
      },

      privacyText,
      submitLabel
    }
  }
}
`;


export const aboutQuery = `
*[_type == "aboutPage"][0]{

seo{
  title,
  description,
  noIndex,
  ogImage{
    asset->{url},
    alt
  }
},

  hero {
    title,
    subtitle
  },
  intro {
    kicker,
    title,
    text,
    image {
      asset->{
        _id,
        url
      }
    }
  },
  method {
    kicker,
    title,
    steps
  },
  why {
    kicker,
    title,
    text,
    items
  },
  vision {
    kicker,
    title,
    text,
    points,
    image {
      asset->{
        _id,
        url
      }
    }
  },
  cta
}
`;

export const servicesQuery = `
*[_type == "servicesPage"][0]{

seo{
  title,
  description,
  noIndex,
  ogImage{
    asset->{url},
    alt
  }
},

  hero{
    title,
    subtitle
  },

  web{
    navTitle,
    kicker,
    title,
    text,
    image{ asset->{url} },
    technologies[]{ asset->{url} },
    siteTypes[]{ title, description },
    cta{ title, text, buttonLabel, buttonLink }
  },

  brand{
    navTitle,
    kicker,
    title,
    text,
    image{ asset->{url} },
    platforms[]{ asset->{url} },
    services[]{ title, description, bullets },
    metrics[]{ value, suffix, label },
    cta{ title, text, buttonLabel, buttonLink }
  },

growth{
  navTitle,
  kicker,
  title,
  text,
  image{ asset->{url}, alt },

  showcaseKicker,
  showcaseTitle,
  showcase[]{ asset->{url}, alt },

  identityKicker,
  identityTitle,
  identity[]{
    title,
    text,
    icon{ asset->{url}, alt }
  },

  cta{
    title,
    text,
    buttonLabel,
    buttonLink
  }
},

consulting{
  navTitle,
  kicker,
  title,
  text,
  image{ asset->{url}, alt },

  processKicker,
  processTitle,
  process[]{ title, text },

  typesKicker,
  typesTitle,
  types[]{ title, text },

  cta{ title, text, buttonLabel, buttonLink }
}
}
`;


export const settingsQuery = groq`
  *[_type == "settings"][0]{
    siteName,
    seoTitle,
    seoDescription,
    favicon{
      asset->{url},
      alt
    }
  }
`;

export const footerQuery = `
*[_type == "footerSettings"][0]{
  logo{ asset->{url}, alt },
  tagline,
  menuLinks[]{ label, href },
  extraLinks[]{ label, href },
  policyLinks[]{ label, href },
  socialLinks[]{ platform, url },
  copyrightText
}
`;


