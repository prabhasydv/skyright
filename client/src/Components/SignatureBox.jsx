// import { useRef, useState, useEffect, forwardRef } from "react"
// import SignatureCanvas from "react-signature-canvas"

// const SignatureBox = forwardRef((props, ref) => {
//   const containerRef = useRef(null)
//   const [width, setWidth] = useState(null)

//   useEffect(() => {
//     if (!containerRef.current) return

//     const resize = () => {
//       setWidth(containerRef.current.offsetWidth)
//     }

//     resize()
//     window.addEventListener("resize", resize)
//     return () => window.removeEventListener("resize", resize)
//   }, [])

//   return (
//     <div ref={containerRef} className="w-full touch-none">
//       {width && (
//         <SignatureCanvas
//           ref={ref} // ✅ expose canvas to parent
//           penColor="black"
//           canvasProps={{
//             width,
//             height: 200,
//             className:
//               "w-full h-[200px] bg-white rounded-xl border touch-none",
//           }}
//         />
//       )}
//     </div>
//   )
// })

// export default SignatureBox








// import { useRef, useState, useEffect, forwardRef } from "react"
// import SignatureCanvas from "react-signature-canvas"

// const SignatureBox = forwardRef((props, ref) => {
//   const containerRef = useRef(null)
//   const [size, setSize] = useState({ width: 0, height: 200 })

//   useEffect(() => {
//     if (!containerRef.current) return

//     const resize = () => {
//       setSize({
//         width: containerRef.current.offsetWidth,
//         height: 200,
//       })
//     }

//     resize()
//     window.addEventListener("resize", resize)
//     return () => window.removeEventListener("resize", resize)
//   }, [])

//   const ratio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1

//   return (
//     <div ref={containerRef} className="w-full touch-none">
//       {size.width > 0 && (
//         <SignatureCanvas
//           ref={ref}
//           penColor="black"
//           canvasProps={{
//             width: size.width * ratio,
//             height: size.height * ratio,
//             style: {
//               width: size.width,
//               height: size.height,
//             },
//             className:
//               "bg-white rounded-xl border touch-none",
//           }}
//           backgroundColor="white"
//           clearOnResize={false}
//           onBegin={() => {
//             const canvas = ref.current?.getCanvas()
//             const ctx = canvas?.getContext("2d")
//             if (ctx) ctx.scale(ratio, ratio)
//           }}
//         />
//       )}
//     </div>
//   )
// })

// export default SignatureBox







import { useRef, useState, useEffect, forwardRef } from "react"
import SignatureCanvas from "react-signature-canvas"

const SignatureBox = forwardRef((props, ref) => {
  const containerRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 200 })

  useEffect(() => {
    if (!containerRef.current) return

    const resize = () => {
      setSize({
        width: containerRef.current.offsetWidth,
        height: 200,
      })
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  const ratio =
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1

  useEffect(() => {
    if (!ref.current || size.width === 0) return

    const canvas = ref.current.getCanvas()
    const ctx = canvas.getContext("2d")

    // ✅ Reset transform before scaling
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(ratio, ratio)
  }, [size.width, ratio, ref])

  return (
    <div ref={containerRef} className="w-full touch-none">
      {size.width > 0 && (
        <SignatureCanvas
          ref={ref}
          penColor="black"
          backgroundColor="white"
          clearOnResize={false}
          canvasProps={{
            width: size.width * ratio,
            height: size.height * ratio,
            style: {
              width: size.width,
              height: size.height,
            },
            className:
              "bg-white rounded-xl border touch-none",
          }}
        />
      )}
    </div>
  )
})

export default SignatureBox


