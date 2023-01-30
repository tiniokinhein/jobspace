import React from "react";
// import {Helmet} from "react-helmet-async";
import { Helmet } from 'react-helmet'
import LOGO from '../../assets/images/logo512.png'

export default function SEO({ title, description, image }) {
  const url = window.location.href;
  image = image ?? LOGO;
  title = (title ?? "Myanmar's Most Reliable Job Site") + " - JobSpace.com.mm";
  description = description ?? "Search new job vacancies and find your next career opportunity with JobSpace.com.mm, Myanmar's Most Reliable Job Site.";

  return (
      <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={url} />

          {/* Twitter meta tags below */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:image:src" content={image} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:creator" content="@JobSpaceMM" />
          <meta name="twitter:site" content="@JobSpaceMM" />
          <meta name="twitter:description" content={description} />s

          {/* Facebook meta tags below */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image} />
      </Helmet>
  );
}
