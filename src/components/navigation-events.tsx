'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLoadingStore } from '@/store/loading-store'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { showLoader, hideLoader } = useLoadingStore()

  useEffect(() => {
    // Hide loader whenever path changes and the new page is rendered
    hideLoader()
  }, [pathname, searchParams, hideLoader])

  useEffect(() => {
      const handleClick = (event: MouseEvent) => {
          let target = event.target as HTMLElement;
          // Find the anchor tag, climbing up the DOM tree
          while (target && target.tagName !== 'A') {
              target = target.parentElement as HTMLElement;
          }

          if (target && target.tagName === 'A') {
              const a = target as HTMLAnchorElement;
              const href = a.getAttribute('href');

              // Check if it's an internal link, not a new tab, and not just a hash link
              if (href && href.startsWith('/') && !href.startsWith('//') && a.target !== '_blank') {
                  // Get the current and target pathnames without search params
                  const currentPath = window.location.pathname;
                  const targetPath = new URL(href, window.location.origin).pathname;
                  
                  if (currentPath !== targetPath) {
                     showLoader();
                  }
              }
          }
      };

      document.addEventListener('click', handleClick);

      return () => {
          document.removeEventListener('click', handleClick);
      };
  }, [showLoader]);

  return null
}
