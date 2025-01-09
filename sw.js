const CACHE_NAME = 'api-cache-v1';

self.addEventListener('fetch', (event) => {
  // Check if the request is for your API
  if (event.request.method === 'GET' && event.request.url.includes('/karfarmas/address')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const networkFetch = fetch(event.request).then((networkResponse) => {
            // Update the cache with a clone of the network response
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          }).catch((error) => {
            console.error('Network request failed:', error);
            // Optionally, handle the error, e.g., return a fallback response
          });

          // Return the cached response if available, otherwise wait for the network response
          return cachedResponse || networkFetch;
        });
      })
    );
  }
});
