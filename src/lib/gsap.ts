// Central GSAP setup — register plugins once and re-export.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// A consistent house easing for the whole site.
export const EASE = 'expo.out'

export { gsap, ScrollTrigger, SplitText }
