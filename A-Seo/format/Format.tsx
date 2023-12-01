import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Format({
  pagePath,
  pageTitle,
  pageDescription,
  pageKeyword,
  og_image,
  children,
}: any) {
  return (
    <div>
      <Head>
        <link rel="canonical" href={`${frontendURL}${pagePath || ''}`} />
        <link rel="icon" href="/image/logo.png" />

        <title>{pageTitle || 'Default Title'}</title>
        <meta name="description" content={pageDescription || 'Default description'} />
        <meta name="keywords" content={pageKeyword || 'Default keywords'} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1"
        />

        {og_image && (
          <React.Fragment>
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`${frontendURL}${pagePath || ''}`} />
            <meta property="og:title" content={pageTitle || 'Default title'} />
            <meta
              property="og:description"
              content={pageDescription || 'Default description'}
            />
            <meta property="og:image" content={og_image} />
            {/* <meta property="og:locale" content="th_TH" /> */}
            <meta property="og:publisher" content={frontendURL} />
          </React.Fragment>
        )}
      </Head>

      <div className="fixed w-full mx-auto pt-6 z-10">
        <Navbar />
      </div>
      <div className="max-w-screen-xl min-h-screen mx-auto py-[88px] px-4 sm:px-6">
        {children}
      </div>
      <div className="max-w-screen mx-auto">
        <Footer />
      </div>
    </div>
  );
}
