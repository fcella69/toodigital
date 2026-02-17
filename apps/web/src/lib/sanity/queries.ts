import { groq } from "next-sanity";

export const homeHeroQuery = groq`
  *[_type == "home"][0]{
    hero {
      title,
      subtitle,
      ctaLabel,
      socials[] {
        label,
        url,
        type
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
    menuRightTitle,
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
      submitLabel
    }
  }
`;

export const contactsQuery = `
*[_type == "contactsPage"][0]{
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
`;

export const aboutQuery = `
*[_type == "aboutPage"][0]{
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


export const webQuery = `
*[_type == "webPage"][0]{
  hero{
    title,
    subtitle
  },
  intro{
    kicker,
    title,
    text,
    "image": image.asset->url
  },
  services{
  kicker,
  title,
  text,
  items[]{
    title,
    text
    },
  },
  performance{
  kicker,
  title,
  text,
  metrics[]{
    value,
    suffix,
    label
  },
  points[]{
    text
  }
},
tech{
  kicker,
  title,
  text,
  items[]{
    name,
    category,
    description
  }
},
standard{
  kicker,
  title,
  text,
  items[]{
    title,
    text
  }
},
cta {
  kicker,
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}


}
`;



