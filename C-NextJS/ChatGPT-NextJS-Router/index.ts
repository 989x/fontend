import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function IndexPage() {
  const router = useRouter();

  // Listen for route changes and refresh the page when estateId changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Check if the route contains the dynamic estateId parameter
      if (url.includes('/properties/')) {
        // Refresh the page by reloading the current URL
        window.location.reload();
      }
    };

    // Subscribe to route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Clean up the event listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <div>
      {/* Page content */}
    </div>
  );
}
