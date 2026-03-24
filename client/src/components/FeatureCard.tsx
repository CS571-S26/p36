
type FeatureCardProps = {
  feature: {
    title: string;
    caption: string;
    description: string;
    icon: React.ElementType;
  };
};

function FeatureCard({ feature }: FeatureCardProps) {
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
export default FeatureCard;