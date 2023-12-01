import Head from 'next/head';

function PageSEO() {
  const pageTitle = t.txt_SEOTitle;
  const pageDescription = t.txt_SEOMetaDesc;
  const pageURL = 'https://yourwebsite.com'; // Replace with your website URL
  const pageImageURL = 'https://yourwebsite.com/images/your-image.jpg'; // Replace with a relevant image URL

  return (
    <Head>
      {/* Basic SEO tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph (OG) metadata for social media sharing */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageURL} />
      <meta property="og:image" content={pageImageURL} />

      {/* Twitter Card metadata for Twitter sharing */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:url" content={pageURL} />
      <meta name="twitter:image" content={pageImageURL} />
    </Head>
  );
}

export default PageSEO;
