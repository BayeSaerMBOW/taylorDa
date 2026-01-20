'use client'

import Link from 'next/link'

interface LogoProps {
  className?: string
  showTagline?: boolean
  size?: 'small' | 'medium' | 'large'
}

export default function Logo({ className = '', showTagline = true, size = 'medium' }: LogoProps) {
  const sizeClasses = {
    small: 'h-16',
    medium: 'h-24',
    large: 'h-32'
  }

  const textSizes = {
    small: { da: '36', collection: '14', tagline: '8' },
    medium: { da: '48', collection: '18', tagline: '10' },
    large: { da: '64', collection: '24', tagline: '12' }
  }

  const currentSize = textSizes[size]

  return (
    <Link href="/" className={`inline-block ${className} group transition-transform duration-300 hover:scale-105`}>
      <div className={`${sizeClasses[size]} relative flex items-center`}>
        {/* Logo SVG avec le design DA COLLECTION */}
        <svg 
          viewBox="0 0 400 200" 
          className="h-full w-auto"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Motif de lotus pour le fond */}
            <pattern id="lotusPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="10" fill="none" stroke="#1e40af" strokeWidth="0.8" opacity="0.4"/>
              <path d="M25 15 Q20 20 25 25 Q30 20 25 15" fill="none" stroke="#1e40af" strokeWidth="0.8" opacity="0.4"/>
              <path d="M25 25 Q20 30 25 35 Q30 30 25 35" fill="none" stroke="#1e40af" strokeWidth="0.8" opacity="0.4"/>
              <path d="M15 25 Q20 20 25 25 Q20 30 15 25" fill="none" stroke="#1e40af" strokeWidth="0.8" opacity="0.4"/>
              <path d="M35 25 Q30 20 25 25 Q30 30 35 25" fill="none" stroke="#1e40af" strokeWidth="0.8" opacity="0.4"/>
            </pattern>
            
            {/* Gradient doré pour les lettres DA */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          
          {/* Fond bleu marine */}
          <rect width="400" height="200" fill="#1e3a8a"/>
          <rect width="400" height="200" fill="url(#lotusPattern)"/>
          
          {/* Lettres DA en doré - positionnées au centre */}
          <g transform="translate(200, 70)">
            {/* Lettre D */}
            <text 
              x="-25" 
              y="0" 
              fontSize={currentSize.da} 
              fontWeight="900" 
              fill="url(#goldGradient)" 
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              className="group-hover:opacity-90 transition-opacity duration-300"
            >
              D
            </text>
            
            {/* Lettre A */}
            <text 
              x="25" 
              y="0" 
              fontSize={currentSize.da} 
              fontWeight="900" 
              fill="url(#goldGradient)" 
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              className="group-hover:opacity-90 transition-opacity duration-300"
            >
              A
            </text>
            
            {/* Aiguille et fil blanc - diagonale traversant DA */}
            <g transform="translate(0, -10)">
              {/* Fil qui traverse */}
              <path 
                d="M -35 -20 Q -25 -10 -15 0 L 15 20 Q 25 30 35 40" 
                stroke="white" 
                strokeWidth="4" 
                fill="none"
                strokeLinecap="round"
                opacity="0.95"
              />
              {/* Aiguille */}
              <g transform="translate(35, 40)">
                {/* Corps de l'aiguille */}
                <line x1="0" y1="0" x2="8" y2="-8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                {/* Œil de l'aiguille */}
                <circle cx="4" cy="-4" r="2.5" fill="white" opacity="0.9"/>
                {/* Pointe de l'aiguille */}
                <line x1="8" y1="-8" x2="12" y2="-12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </g>
            </g>
          </g>
          
          {/* Collection en script blanc élégant */}
          <text 
            x="200" 
            y="110" 
            fontSize={currentSize.collection} 
            fill="white" 
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontStyle="italic"
            letterSpacing="3"
            opacity="0.95"
          >
            Collection
          </text>
          
          {/* Made in SENEGAL */}
          {showTagline && (
            <>
              <text 
                x="200" 
                y="145" 
                fontSize={currentSize.tagline} 
                fill="white" 
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                letterSpacing="2"
                fontWeight="500"
                opacity="0.9"
              >
                Made in SENEGAL
              </text>
              
              {/* Ligne dorée horizontale */}
              <line 
                x1="100" 
                y1="165" 
                x2="300" 
                y2="165" 
                stroke="url(#goldGradient)" 
                strokeWidth="2"
                className="group-hover:opacity-80 transition-opacity duration-300"
              />
            </>
          )}
        </svg>
      </div>
    </Link>
  )
}
