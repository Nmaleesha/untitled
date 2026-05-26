import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const updateSize = () => {
      if (!mounted) return;
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    
    // Call it initially but via setTimeout to avoid synchronous setState warning
    setTimeout(updateSize, 0);
    
    mql.addEventListener("change", updateSize)
    return () => {
      mounted = false;
      mql.removeEventListener("change", updateSize)
    }
  }, [])

  return !!isMobile
}
