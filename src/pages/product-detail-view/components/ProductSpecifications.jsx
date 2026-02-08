const ProductSpecifications = ({ specifications }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
        Technical Specifications
      </h2>
      <div className="space-y-3">
        {Object.entries(specifications)?.map(([key, value], index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 border-b border-border last:border-0"
          >
            <span className="text-sm md:text-base font-medium text-muted-foreground min-w-[140px] md:min-w-[180px]">
              {key}
            </span>
            <span className="text-sm md:text-base text-foreground font-mono">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecifications;