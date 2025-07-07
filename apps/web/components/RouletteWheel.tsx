import { useEffect, useRef } from 'react';

export default function RouletteWheel({
  isSpinning,
  result
}: {
  isSpinning: boolean;
  result?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
   
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
   
    // Draw roulette wheel
    const drawWheel = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 40;
     
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
     
      // Draw outer shadow
      ctx.beginPath();
      ctx.arc(centerX + 3, centerY + 3, radius + 35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fill();
      
      // Draw outer rim (gold)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 35, 0, Math.PI * 2);
      const outerGradient = ctx.createRadialGradient(centerX, centerY, radius + 25, centerX, centerY, radius + 35);
      outerGradient.addColorStop(0, '#FFD700');
      outerGradient.addColorStop(0.5, '#FFA500');
      outerGradient.addColorStop(1, '#B8860B');
      ctx.fillStyle = outerGradient;
      ctx.fill();
      
      // Draw inner rim detail
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 30, 0, Math.PI * 2);
      ctx.fillStyle = '#8B4513';
      ctx.fill();
      
      // Draw wood-like inner rim
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 25, 0, Math.PI * 2);
      const woodGradient = ctx.createRadialGradient(centerX, centerY, radius + 15, centerX, centerY, radius + 25);
      woodGradient.addColorStop(0, '#D2691E');
      woodGradient.addColorStop(0.5, '#A0522D');
      woodGradient.addColorStop(1, '#8B4513');
      ctx.fillStyle = woodGradient;
      ctx.fill();
      
      // Numbers and colors
      const numbers = [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
        24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
      ];
      
      const anglePerNumber = (Math.PI * 2) / numbers.length;
      
      // Draw segments
      numbers.forEach((num, i) => {
        const startAngle = i * anglePerNumber - Math.PI / 2;
        const endAngle = (i + 1) * anglePerNumber - Math.PI / 2;
        
        // Draw segment
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        
        // Set colors based on roulette rules
        let segmentColor;
        if (num === 0) {
          segmentColor = '#228B22'; // Green for 0
        } else if ([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)) {
          segmentColor = '#DC143C'; // Red
        } else {
          segmentColor = '#1a1a1a'; // Black
        }
        
        ctx.fillStyle = segmentColor;
        ctx.fill();
        
        // Add subtle gradient to each segment
        const segmentGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius);
        segmentGradient.addColorStop(0, segmentColor);
        segmentGradient.addColorStop(1, segmentColor === '#228B22' ? '#006400' : segmentColor === '#DC143C' ? '#8B0000' : '#000000');
        ctx.fillStyle = segmentGradient;
        ctx.fill();
        
        // Draw segment border
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Draw numbers
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      
      numbers.forEach((num, i) => {
        const angle = i * anglePerNumber - Math.PI / 2;
        const numRadius = radius * 0.8;
        const x = centerX + Math.cos(angle) * numRadius;
        const y = centerY + Math.sin(angle) * numRadius;
        
        // Draw number shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillText(num.toString(), x + 1, y + 1);
        
        // Draw number
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeText(num.toString(), x, y);
        ctx.fillText(num.toString(), x, y);
      });
      
      // Draw center hub
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
      centerGradient.addColorStop(0, '#FFD700');
      centerGradient.addColorStop(0.7, '#FFA500');
      centerGradient.addColorStop(1, '#B8860B');
      ctx.fillStyle = centerGradient;
      ctx.fill();
      
      // Draw center hub border
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw center logo/design
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#8B4513';
      ctx.fill();
      
      // Draw pointer (enhanced)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius - 35);
      ctx.lineTo(centerX - 12, centerY - radius - 10);
      ctx.lineTo(centerX - 8, centerY - radius - 5);
      ctx.lineTo(centerX, centerY - radius + 5);
      ctx.lineTo(centerX + 8, centerY - radius - 5);
      ctx.lineTo(centerX + 12, centerY - radius - 10);
      ctx.closePath();
      
      // Pointer gradient
      const pointerGradient = ctx.createLinearGradient(centerX, centerY - radius - 35, centerX, centerY - radius + 5);
      pointerGradient.addColorStop(0, '#FFD700');
      pointerGradient.addColorStop(0.5, '#FFA500');
      pointerGradient.addColorStop(1, '#FF8C00');
      ctx.fillStyle = pointerGradient;
      ctx.fill();
      
      // Pointer border
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Add decorative elements around the wheel
      for (let i = 0; i < 8; i++) {
        const decorAngle = (i * Math.PI * 2) / 8;
        const decorRadius = radius + 50;
        const decorX = centerX + Math.cos(decorAngle) * decorRadius;
        const decorY = centerY + Math.sin(decorAngle) * decorRadius;
        
        ctx.beginPath();
        ctx.arc(decorX, decorY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };
   
    drawWheel();
  }, []);
  
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Main wheel container */}
      <div className="relative bg-gradient-to-br from-amber-100 to-amber-200 rounded-full p-3 shadow-2xl">
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-full p-2 shadow-inner">
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className={`mx-auto transition-all duration-100 ${isSpinning ? 'animate-spin' : ''} drop-shadow-2xl`}
            style={{ 
              transition: 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)',
              filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.3))'
            }}
          />
        </div>
      </div>
      
      {/* Result display */}
      {result !== null && (
        <div className="mt-4 text-center">
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-full shadow-xl border-2 border-yellow-300">
            <div className="text-lg font-bold mb-1">🎰 WINNER! 🎰</div>
            <div className="text-2xl font-extrabold tracking-wider">
              {result}
            </div>
          </div>
        </div>
      )}
      
      {/* Spinning indicator */}
      {isSpinning && (
        <div className="mt-3">
          <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="text-yellow-400 text-sm font-semibold animate-pulse">
              🎯 Spinning... 🎯
            </div>
          </div>
        </div>
      )}
    </div>
  );
}