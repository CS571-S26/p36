import { ChevronLeft, ChevronRight } from "lucide-react";

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

export const Pagination = ({ currentPage, totalPages, onPageChange, }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // always start with page 1
    const pages: (number | "...")[] = [1];

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);
    return pages;
  }

  return (
    <div className="flex items-center justify-between mt-4 text-sm">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-2 py-1 font-normal text-gray-500 border-t-2 border-transparent hover:enabled:text-gray-800 hover:enabled:border-gray-300 hover:enabled:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={14} /> Previous
      </button>

      <div className="flex items-center">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span 
              key={`ellipsis-${index}`}
              className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 font-medium transition-colors hover:cursor-pointer
                ${
                  currentPage === page
                  ? "text-[#0084D1] border-t-2 border-[#0084D1]"
                  : "text-gray-700 border-t-2 border-transparent hover:border-gray-300"
                }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-2 py-1 font-normal text-gray-500 border-t-2 border-transparent hover:enabled:text-gray-800 hover:enabled:border-gray-300 hover:enabled:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  )
}