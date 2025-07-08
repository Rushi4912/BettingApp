'use client'
import { useEffect, useRef } from 'react'

export default function RouletteWheel({
  isSpinning,
  result
}: {
  isSpinning: boolean
  result?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const W = canvas.width
    const H = canvas.height
    const cx = W / 2
    const cy = H / 2
    const radius = Math.min(cx, cy) - 20
    
    // European roulette number order
    const numbers = [
      0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27,
      13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33,
      1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12,
      35, 3, 26
    ]
    const anglePer = (Math.PI * 2) / numbers.length

    function draw() {
      // Clear canvas
      ctx.clearRect(0, 0, W, H)

      // OUTER WOODEN RIM
      ctx.save()
      ctx.translate(cx, cy)
      
      // Outer rim gradient
      const outerRimGrad = ctx.createRadialGradient(0, 0, radius + 10, 0, 0, radius + 20)
      outerRimGrad.addColorStop(0, '#8B4513')
      outerRimGrad.addColorStop(0.5, '#A0522D')
      outerRimGrad.addColorStop(1, '#654321')
      
      ctx.beginPath()
      ctx.arc(0, 0, radius + 20, 0, Math.PI * 2)
      ctx.fillStyle = outerRimGrad
      ctx.fill()
      
      // Golden outer border
      ctx.beginPath()
      ctx.arc(0, 0, radius + 20, 0, Math.PI * 2)
      ctx.lineWidth = 3
      ctx.strokeStyle = '#FFD700'
      ctx.stroke()
      
      // Inner golden border
      ctx.beginPath()
      ctx.arc(0, 0, radius + 10, 0, Math.PI * 2)
      ctx.lineWidth = 2
      ctx.strokeStyle = '#DAA520'
      ctx.stroke()

      // Golden diamonds on outer rim
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8
        ctx.save()
        ctx.rotate(angle)
        
        // Diamond shape
        ctx.beginPath()
        ctx.moveTo(radius + 15, -4)
        ctx.lineTo(radius + 18, 0)
        ctx.lineTo(radius + 15, 4)
        ctx.lineTo(radius + 12, 0)
        ctx.closePath()
        
        const diamondGrad = ctx.createLinearGradient(radius + 10, -4, radius + 20, 4)
        diamondGrad.addColorStop(0, '#FFD700')
        diamondGrad.addColorStop(0.5, '#FFA500')
        diamondGrad.addColorStop(1, '#DAA520')
        
        ctx.fillStyle = diamondGrad
        ctx.fill()
        ctx.strokeStyle = '#B8860B'
        ctx.lineWidth = 0.5
        ctx.stroke()
        
        ctx.restore()
      }
      
      ctx.restore()

      // WHEEL SEGMENTS
      numbers.forEach((num, i) => {
        const startAngle = i * anglePer - Math.PI / 2
        const endAngle = startAngle + anglePer

        ctx.save()
        ctx.translate(cx, cy)

        // Segment background
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.arc(0, 0, radius, startAngle, endAngle)
        ctx.closePath()

        // Determine segment color
        let segmentColor: string
        if (num === 0) {
          segmentColor = '#228B22' // Green for 0
        } else if ([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)) {
          segmentColor = '#DC143C' // Red
        } else {
          segmentColor = '#2F2F2F' // Black
        }

        // Create gradient for depth
        const segmentGrad = ctx.createRadialGradient(0, 0, radius * 0.3, 0, 0, radius)
        segmentGrad.addColorStop(0, segmentColor)
        segmentGrad.addColorStop(1, segmentColor === '#228B22' ? '#006400' : 
                                segmentColor === '#DC143C' ? '#8B0000' : '#1C1C1C')

        ctx.fillStyle = segmentGrad
        ctx.fill()

        // Golden segment borders
        ctx.beginPath()
        ctx.moveTo(Math.cos(startAngle) * radius * 0.6, Math.sin(startAngle) * radius * 0.6)
        ctx.lineTo(Math.cos(startAngle) * radius, Math.sin(startAngle) * radius)
        ctx.strokeStyle = '#FFD700'
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.restore()
      })

      // INNER BROWN CIRCLE
      ctx.save()
      ctx.translate(cx, cy)
      
      const innerCircleGrad = ctx.createRadialGradient(0, 0, radius * 0.4, 0, 0, radius * 0.6)
      innerCircleGrad.addColorStop(0, '#8B4513')
      innerCircleGrad.addColorStop(1, '#654321')
      
      ctx.beginPath()
      ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = innerCircleGrad
      ctx.fill()
      
      // Golden border for inner circle
      ctx.beginPath()
      ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2)
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 2
      ctx.stroke()
      
      ctx.restore()

      // NUMBERS
      ctx.font = 'bold 14px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      numbers.forEach((num, i) => {
        const angle = i * anglePer - Math.PI / 2
        const textRadius = radius * 0.82
        const x = cx + Math.cos(angle) * textRadius
        const y = cy + Math.sin(angle) * textRadius

        // Text shadow
        ctx.fillStyle = 'rgba(0,0,0,0.7)'
        ctx.fillText(num.toString(), x + 1, y + 1)
        
        // Main text
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText(num.toString(), x, y)
      })

      // CENTER HUB
      ctx.save()
      ctx.translate(cx, cy)
      
      // Hub background
      const hubGrad = ctx.createRadialGradient(-5, -5, 0, 0, 0, 35)
      hubGrad.addColorStop(0, '#FFD700')
      hubGrad.addColorStop(0.6, '#DAA520')
      hubGrad.addColorStop(1, '#B8860B')
      
      ctx.beginPath()
      ctx.arc(0, 0, 35, 0, Math.PI * 2)
      ctx.fillStyle = hubGrad
      ctx.fill()
      
      // Hub border
      ctx.beginPath()
      ctx.arc(0, 0, 35, 0, Math.PI * 2)
      ctx.strokeStyle = '#8B7355'
      ctx.lineWidth = 2
      ctx.stroke()

      // Spokes
      for (let i = 0; i < 6; i++) {
        const spokeAngle = (i * Math.PI * 2) / 6
        ctx.save()
        ctx.rotate(spokeAngle)
        
        // Spoke line
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(25, 0)
        ctx.strokeStyle = '#8B7355'
        ctx.lineWidth = 3
        ctx.stroke()
        
        // Spoke end circle
        ctx.beginPath()
        ctx.arc(25, 0, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#DAA520'
        ctx.fill()
        ctx.strokeStyle = '#8B7355'
        ctx.lineWidth = 1
        ctx.stroke()
        
        ctx.restore()
      }
      
      ctx.restore()

      // BALL (if result is defined)
      if (typeof result === 'number') {
        const idx = numbers.indexOf(result)
        if (idx >= 0) {
          const ballAngle = idx * anglePer - Math.PI / 2 + anglePer / 2
          const ballRadius = radius * 0.9
          const bx = cx + Math.cos(ballAngle) * ballRadius
          const by = cy + Math.sin(ballAngle) * ballRadius
          
          // Ball shadow
          ctx.beginPath()
          ctx.arc(bx + 2, by + 2, 8, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(0,0,0,0.3)'
          ctx.fill()
          
          // Ball
          const ballGrad = ctx.createRadialGradient(bx - 2, by - 2, 0, bx, by, 8)
          ballGrad.addColorStop(0, '#FFFFFF')
          ballGrad.addColorStop(0.7, '#F0F0F0')
          ballGrad.addColorStop(1, '#E0E0E0')
          
          ctx.beginPath()
          ctx.arc(bx, by, 8, 0, Math.PI * 2)
          ctx.fillStyle = ballGrad
          ctx.fill()
          
          ctx.beginPath()
          ctx.arc(bx, by, 8, 0, Math.PI * 2)
          ctx.strokeStyle = '#D0D0D0'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    draw()
  }, [result])

  return (
    <canvas
      ref={canvasRef}
      width={440}
      height={440}
      className={`${isSpinning ? 'animate-spin' : ''}`}
      style={{
        transition: 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)',
        borderRadius: '50%',
        display: 'block'
      }}
    />
  )
}