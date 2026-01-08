import { useRef, useState, useEffect, forwardRef } from "react"
import SignatureCanvas from "react-signature-canvas"

const SignatureBox = forwardRef((props, ref) => {
  const containerRef = useRef(null)
  const [width, setWidth] = useState(null)

  useEffect(() => {
    if (!containerRef.current) return

    const resize = () => {
      setWidth(containerRef.current.offsetWidth)
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <div ref={containerRef} className="w-full touch-none">
      {width && (
        <SignatureCanvas
          ref={ref} // ✅ expose canvas to parent
          penColor="black"
          canvasProps={{
            width,
            height: 200,
            className:
              "w-full h-[200px] bg-white rounded-xl border touch-none",
          }}
        />
      )}
    </div>
  )
})

export default SignatureBox
