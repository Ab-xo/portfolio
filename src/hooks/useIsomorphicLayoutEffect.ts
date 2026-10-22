import { useEffect, useLayoutEffect } from 'react'

// Avoids SSR warnings; behaves as useLayoutEffect in the browser.
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
