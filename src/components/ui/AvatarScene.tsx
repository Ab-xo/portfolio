import { useEffect, useRef } from 'react'
import {
  BoxGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import { gsap } from '../../lib/gsap'

export function AvatarScene() {
  const stageRef = useRef<HTMLDivElement>(null)
  const fallbackRef = useRef<HTMLImageElement>(null)

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
    const camera = new PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.z = 6
    const orbit = new Group()
    scene.add(orbit)

    const portrait = new Group()
    scene.add(portrait)
    const backing = new Mesh(
      new BoxGeometry(2.5, 2.5, 0.12),
      new MeshBasicMaterial({ color: 0x101716 }),
    )
    backing.position.z = -0.08
    portrait.add(backing)

    const texture = new TextureLoader().load(
      '/avatar.png',
      () => {
        if (fallbackRef.current) {
          gsap.to(fallbackRef.current, { autoAlpha: 0, duration: 0.35 })
        }
      },
      undefined,
      () => undefined,
    )
    texture.colorSpace = SRGBColorSpace
    const portraitMesh = new Mesh(
      new PlaneGeometry(2.46, 2.46),
      new MeshBasicMaterial({ map: texture, transparent: true, side: DoubleSide }),
    )
    portrait.add(portraitMesh)

    const materials = [
      new MeshBasicMaterial({ color: 0x53e0c2, transparent: true, opacity: 0.8 }),
      new MeshBasicMaterial({ color: 0xe6a77a, transparent: true, opacity: 0.7 }),
    ]
    const rings = [
      new Mesh(new TorusGeometry(1.42, 0.012, 8, 120), materials[0]),
      new Mesh(new TorusGeometry(1.62, 0.006, 8, 120), materials[1]),
    ]
    rings[1].rotation.set(0.48, 0.2, -0.32)
    rings.forEach((ring) => (ring.position.z = -0.3))
    orbit.add(...rings)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.className = 'absolute inset-0 h-full w-full'
    renderer.domElement.setAttribute('aria-hidden', 'true')
    stage.appendChild(renderer.domElement)

    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      renderer.render(scene, camera)
    })
    resize.observe(stage)

    const onPointerMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      gsap.to([orbit.rotation, portrait.rotation], {
        x: y * 0.14,
        y: x * 0.2,
        duration: 0.7,
        ease: 'power3.out',
      })
    }
    const resetPointer = () => {
      gsap.to([orbit.rotation, portrait.rotation], { x: 0, y: 0, duration: 0.8, ease: 'power3.out' })
    }
    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerleave', resetPointer)

    let frame = 0
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const draw = (time: number) => {
      orbit.rotation.z = Math.sin(time * 0.00035) * 0.045
      portrait.rotation.y += (Math.sin(time * 0.00045) * 0.025 - portrait.rotation.y) * 0.025
      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(draw)
    }
    if (reducedMotion) renderer.render(scene, camera)
    else frame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frame)
      resize.disconnect()
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerleave', resetPointer)
      gsap.killTweensOf([orbit.rotation, portrait.rotation])
      backing.geometry.dispose()
      ;(backing.material as MeshBasicMaterial).dispose()
      portraitMesh.geometry.dispose()
      ;(portraitMesh.material as MeshBasicMaterial).dispose()
      texture.dispose()
      rings.forEach((ring) => ring.geometry.dispose())
      materials.forEach((material) => material.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      role="img"
      aria-label="Portrait of Abraham Gebeyehu in a teal 3D frame"
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      <div ref={stageRef} className="absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-[13%] grid place-items-center">
        <img
          ref={fallbackRef}
          src="/avatar.png"
          alt=""
          aria-hidden="true"
          width="700"
          height="700"
          fetchPriority="high"
          className="h-full w-full object-contain"
        />
      </div>
      <span className="absolute left-[8%] top-[22%] h-2 w-2 rounded-full bg-accent shadow-[0_0_24px_var(--color-accent)]" aria-hidden="true" />
      <span className="absolute bottom-[18%] right-[12%] h-1.5 w-1.5 rounded-full bg-[#e6a77a]" aria-hidden="true" />
    </div>
  )
}