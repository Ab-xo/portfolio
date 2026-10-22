import { useEffect, useRef } from 'react'
import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WireframeGeometry,
  WebGLRenderer,
} from 'three'
import { gsap } from '../../lib/gsap'

export function HeroAtmosphere() {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return
    }

    const scene = new Scene()
    const camera = new PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.z = 12

    const spin = new Group()
    const sphere = new Group()
    scene.add(spin)
    spin.add(sphere)

    const surface = new IcosahedronGeometry(3.15, 2)
    const wireframe = new WireframeGeometry(surface)
    surface.dispose()

    const lineMaterial = new LineBasicMaterial({ color: 0x53e0c2, transparent: true, opacity: 0.12 })
    const lines = new LineSegments(wireframe, lineMaterial)
    sphere.add(lines)

    const pointPositions: number[] = []
    const pointCount = 86
    const radius = 3.17
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    for (let index = 0; index < pointCount; index += 1) {
      const y = 1 - (index / (pointCount - 1)) * 2
      const ringRadius = Math.sqrt(1 - y * y)
      const angle = goldenAngle * index
      pointPositions.push(
        Math.cos(angle) * ringRadius * radius,
        y * radius,
        Math.sin(angle) * ringRadius * radius,
      )
    }
    const pointsGeometry = new BufferGeometry()
    pointsGeometry.setAttribute('position', new Float32BufferAttribute(pointPositions, 3))
    const pointsMaterial = new PointsMaterial({
      color: 0xe6a77a,
      size: 0.035,
      transparent: true,
      opacity: 0.68,
    })
    const points = new Points(pointsGeometry, pointsMaterial)
    sphere.add(points)

    const canvas = renderer.domElement
    canvas.className = 'absolute inset-0 h-full w-full'
    canvas.setAttribute('aria-hidden', 'true')
    stage.appendChild(canvas)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
    renderer.setClearColor(0x000000, 0)

    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()

      if (width < 768) {
        sphere.position.set(2.5, 2.2, -3)
        sphere.scale.setScalar(0.4)
        lineMaterial.opacity = 0.045
        pointsMaterial.opacity = 0.35
        canvas.style.maskImage =
          'linear-gradient(90deg, transparent 0%, transparent 56%, rgba(0,0,0,.08) 76%, #000 100%)'
      } else {
        sphere.position.set(3.7, 0.1, -1.5)
        sphere.scale.setScalar(1)
        lineMaterial.opacity = 0.12
        pointsMaterial.opacity = 0.68
        canvas.style.maskImage =
          'linear-gradient(90deg, transparent 8%, rgba(0,0,0,.08) 35%, #000 76%)'
      }
      canvas.style.webkitMaskImage = canvas.style.maskImage

      renderer.setSize(width, height, false)
      renderer.render(scene, camera)
    })
    resize.observe(stage)

    const section = stage.parentElement
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion || !section) return
      const bounds = section.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      gsap.to(sphere.rotation, {
        x: y * 0.1,
        y: x * 0.16,
        duration: 1.1,
        ease: 'power3.out',
      })
    }
    const onPointerLeave = () => {
      gsap.to(sphere.rotation, { x: 0, y: 0, duration: 0.9, ease: 'power3.out' })
    }
    section?.addEventListener('pointermove', onPointerMove)
    section?.addEventListener('pointerleave', onPointerLeave)

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reducedMotion) {
        gsap.to(spin.rotation, { y: Math.PI * 2, duration: 80, ease: 'none', repeat: -1 })
        const render = () => {
          renderer.render(scene, camera)
          frame = window.requestAnimationFrame(render)
        }
        frame = window.requestAnimationFrame(render)
      } else {
        window.cancelAnimationFrame(frame)
        if (!entry.isIntersecting) gsap.killTweensOf(spin.rotation)
        renderer.render(scene, camera)
      }
    })
    let frame = 0
    observer.observe(stage)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      resize.disconnect()
      section?.removeEventListener('pointermove', onPointerMove)
      section?.removeEventListener('pointerleave', onPointerLeave)
      gsap.killTweensOf([sphere.rotation, spin.rotation])
      wireframe.dispose()
      lineMaterial.dispose()
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }, [])

  return <div ref={stageRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
}