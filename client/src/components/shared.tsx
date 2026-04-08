import { Heart, MessageCircle } from "lucide-react";

export const FeatureCard = ({ feature }: {
  feature: {
    title: string;
    caption: string;
    description: string;
    icon: React.ElementType;
  };
}) => {
  const Icon = feature.icon;

  return (
    <div className="bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition duration-300 rounded-2xl p-8 text-center">
      
      <Icon className="w-8 h-8 mb-4 mx-auto text-amber-400" />
      
      <h2 className="text-xl mb-2 font-semibold">
        {feature.title}</h2>
      <p className="text-sm font-medium text-gray-500 mb-3">{feature.caption}</p>
      <p className="text-gray-600 font-normal">{feature.description}</p>
    </div>
  );
}

export const HexagonFrame = () => {
  const cx = 48, cy = 48;
  const hex = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 90);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");

  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <polygon points={hex(46)} fill="#0369A1" />
      <polygon points={hex(41)} fill="#ffffff" />
    </svg>
  );
}

export const CompPost = ({ compSpec }: { 
  compSpec: {
    title: string;
    username: string;
    champions: string[];
    overview: string;
    createdAt: string;
    heartCount: number;
    commentCount: number;
  }}) => {
    
    return (
      <div className="bg-white border-gray-10 shadow-xl rounded-2xl p-6">
        <h3 className="font-bold text-lg">{compSpec.title}</h3>
        <p className="text-sm text-gray-600 font-light">{compSpec.username} • {compSpec.createdAt}</p>

        <div className="flex">
          {Array.from({ length: compSpec.champions.length }, (_, i) => (
            <HexagonFrame key={i}/>
          ))}
        </div>
        <p className="text-sm font-light">{compSpec.overview}</p>

        <div className="flex">
          <p>
            <Heart />
            
          </p>

          <MessageCircle />
        </div>
      </div>
    );
}

// TODO: make a border around like a box
// export const CompBoard = () => {
//   const cols = 7;
//   const rows = 4;
//   const hexSize = 96;
//   const colSpacing = hexSize * 0.88;
//   const rowSpacing = hexSize * 0.78;

//   const boardHeight = rows * rowSpacing + hexSize;

//   return (
//     <div className="relative w-full overflow-x-auto p-8" style={{ height: boardHeight }}>
//       {Array.from({ length: rows }, (_, row) =>
//         Array.from({ length: cols }, (_, col) => {
//           const x = col * colSpacing + (row % 2 === 1 ? colSpacing / 2 : 0);
//           const y = row * rowSpacing;
//           return (
//             <div
//               key={`${row}-${col}`}
//               className="absolute"
//               style={{ left: x, top: y }}
//             >
//               <HexagonFrame />
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }