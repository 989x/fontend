import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function IndexPage() {
  const router = useRouter();

  // Listen for route changes and refresh the page when estateId changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Check if the route contains the dynamic estateId parameter
      // Original: http://localhost:3000/property/999999-3u95-461s
      if (url.includes('/property/')) {
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
