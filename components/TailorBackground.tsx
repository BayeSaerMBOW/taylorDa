'use client'

export default function TailorBackground() {
  return (
    <div 
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ 
        zIndex: 0,
        // Background jaune visible
        background: 'linear-gradient(135deg, #fef9c3 0%, #ffffff 30%, #fef9c3 70%, #ffffff 100%)',
      }}
    >
      {/* Motifs de ciseaux répétitifs - TRÈS VISIBLES */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cg transform='translate(125,125)'%3E%3Cpath d='M-70 -50 L-35 25 L-55 45 L-90 -5 Z' fill='none' stroke='%23fbbf24' stroke-width='5' opacity='0.35'/%3E%3Cpath d='M70 50 L35 -25 L55 -45 L90 5 Z' fill='none' stroke='%23fbbf24' stroke-width='5' opacity='0.35'/%3E%3Ccircle cx='0' cy='0' r='18' fill='%23fbbf24' opacity='0.35'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
          backgroundPosition: '100px 100px',
        }}
      />
      
      {/* Lignes de couture (points de surjet) - TRÈS VISIBLES */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='90'%3E%3Cpath d='M0 45 Q18 30 36 45 T72 45 T108 45 T144 45 T180 45' stroke='%23fbbf24' stroke-width='4' fill='none' opacity='0.45'/%3E%3Cpath d='M0 45 Q18 60 36 45 T72 45 T108 45 T144 45 T180 45' stroke='%23fbbf24' stroke-width='4' fill='none' opacity='0.45'/%3E%3Ccircle cx='18' cy='45' r='6' fill='%23fbbf24' opacity='0.45'/%3E%3Ccircle cx='54' cy='45' r='6' fill='%23fbbf24' opacity='0.45'/%3E%3Ccircle cx='90' cy='45' r='6' fill='%23fbbf24' opacity='0.45'/%3E%3Ccircle cx='126' cy='45' r='6' fill='%23fbbf24' opacity='0.45'/%3E%3Ccircle cx='162' cy='45' r='6' fill='%23fbbf24' opacity='0.45'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 110px',
          backgroundPosition: '150px 300px',
        }}
      />
      
      {/* Ruban de mesure - TRÈS VISIBLE */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='50'%3E%3Cg transform='rotate(-15 150 25)' opacity='0.25'%3E%3Crect x='0' y='20' width='300' height='12' fill='%23000000'/%3E%3Cline x1='30' y1='14' x2='30' y2='38' stroke='%23000000' stroke-width='3'/%3E%3Cline x1='60' y1='14' x2='60' y2='38' stroke='%23000000' stroke-width='3'/%3E%3Cline x1='90' y1='14' x2='90' y2='38' stroke='%23000000' stroke-width='3'/%3E%3Cline x1='120' y1='14' x2='120' y2='38' stroke='%23000000' stroke-width='3'/%3E%3Cline x1='150' y1='14' x2='150' y2='38' stroke='%23000000' stroke-width='3'/%3E%3Cline x1='180' y1='14' x2='180' y2='38' stroke='%23000000' stroke-width='3'/%3E%3Cline x1='210' y1='14' x2='210' y2='38' stroke='%23000000' stroke-width='3'/%3E%3Cline x1='240' y1='14' x2='240' y2='38' stroke='%23000000' stroke-width='3'/%3E%3Cline x1='270' y1='14' x2='270' y2='38' stroke='%23000000' stroke-width='3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '400px 70px',
          backgroundPosition: '200px 200px',
        }}
      />
      
      {/* Aiguilles avec fils - TRÈS VISIBLES */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='200'%3E%3Cg opacity='0.25'%3E%3Cpath d='M70 0 L70 80 L50 110 L70 140 L70 200' stroke='%23000000' stroke-width='4' fill='none'/%3E%3Cpath d='M70 80 Q60 85 70 90 Q80 85 70 80' stroke='%23000000' stroke-width='3' fill='none'/%3E%3Cpath d='M70 140 Q60 145 70 150 Q80 145 70 140' stroke='%23000000' stroke-width='3' fill='none'/%3E%3Cpath d='M70 50 L50 70 L70 80 L90 70 Z' fill='%23000000'/%3E%3Cpath d='M70 110 L50 130 L70 140 L90 130 Z' fill='%23000000'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '170px 240px',
          backgroundPosition: '400px 400px',
        }}
      />
      
      {/* Points de couture répétitifs - TRÈS VISIBLES */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg opacity='0.3'%3E%3Ccircle cx='40' cy='40' r='4' fill='%23fbbf24'/%3E%3Cpath d='M40 25 Q38 30 40 35 Q42 30 40 25' stroke='%23fbbf24' stroke-width='2.5' fill='none'/%3E%3Cpath d='M40 35 Q38 40 40 45 Q42 40 40 45' stroke='%23fbbf24' stroke-width='2.5' fill='none'/%3E%3Cpath d='M40 45 Q38 50 40 55 Q42 50 40 55' stroke='%23fbbf24' stroke-width='2.5' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
          backgroundPosition: '600px 300px',
        }}
      />
      
      {/* Texture de tissu - VISIBLE */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cg opacity='0.12'%3E%3Cpath d='M0 0 L100 100 M100 0 L0 100' stroke='%23000000' stroke-width='2'/%3E%3Cline x1='0' y1='33' x2='100' y2='33' stroke='%23000000' stroke-width='1'/%3E%3Cline x1='0' y1='66' x2='100' y2='66' stroke='%23000000' stroke-width='1'/%3E%3Cline x1='33' y1='0' x2='33' y2='100' stroke='%23000000' stroke-width='1'/%3E%3Cline x1='66' y1='0' x2='66' y2='100' stroke='%23000000' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
