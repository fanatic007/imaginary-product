import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Icon from "@/components/AppIcon";
import { debounceFunction } from "my-lib";
import Input from "@/components/ui/Input";
import { useState, useEffect } from "react";

const FilterToolbar = ({ onFilterChange, categories, totalProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isControlled, setIsControlled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsControlled(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const filters = {
      search: searchTerm,
      category: selectedCategory,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null
    };
    onFilterChange(filters);
  }, [searchTerm, selectedCategory, minPrice, maxPrice, onFilterChange]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories?.map(cat => ({ value: cat, label: cat?.charAt(0)?.toUpperCase() + cat?.slice(1) }))
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h2 className="text-lg md:text-xl font-semibold text-foreground">
            Filter Products
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Package" size={16} />
          <span className="whitespace-nowrap">
            {totalProducts?.toLocaleString()} products
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          {isControlled ? (
            <Input
              type="search"
              label="Search Products"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          ) : (
            <Input
              type="search"
              label="Search Products"
              placeholder="Search by name..."
              defaultValue={searchTerm}
            />
          )}
        </div>

        <Select
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        <div className="flex gap-2">
          <Input
            type="number"
            label="Min Price"
            placeholder="$0"
            value={minPrice}
            onChange={(e) => setMinPrice(e?.target?.value)}
            className="flex-1"
          />
          <Input
            type="number"
            label="Max Price"
            placeholder="$999"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e?.target?.value)}
            className="flex-1"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterToolbar;