
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FilterPanelProps {
  filters: {
    state: string;
    minSize: string;
    maxSize: string;
    minAdmissionRate: string;
    maxAdmissionRate: string;
    maxTuition: string;
  };
  onChange: (filters: any) => void;
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange }) => {
  const handleFilterChange = (key: string, value: string) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onChange({
      state: '',
      minSize: '',
      maxSize: '',
      minAdmissionRate: '',
      maxAdmissionRate: '',
      maxTuition: ''
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 animate-fade-in">
      {/* State Filter */}
      <div className="space-y-2">
        <Label htmlFor="state" className="text-sm font-medium text-gray-700">
          State
        </Label>
        <Select
          value={filters.state || "all"}
          onValueChange={(value) => handleFilterChange('state', value === "all" ? "" : value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any state" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-lg max-h-60 overflow-y-auto z-50">
            <SelectItem value="all">Any state</SelectItem>
            {US_STATES.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Student Size Range */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Min Students
        </Label>
        <Input
          type="number"
          placeholder="1,000"
          value={filters.minSize}
          onChange={(e) => handleFilterChange('minSize', e.target.value)}
          className="w-full transition-all duration-200 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Max Students
        </Label>
        <Input
          type="number"
          placeholder="50,000"
          value={filters.maxSize}
          onChange={(e) => handleFilterChange('maxSize', e.target.value)}
          className="w-full transition-all duration-200 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Admission Rate Range */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Min Acceptance Rate (%)
        </Label>
        <Input
          type="number"
          placeholder="5"
          min="0"
          max="100"
          value={filters.minAdmissionRate}
          onChange={(e) => handleFilterChange('minAdmissionRate', e.target.value)}
          className="w-full transition-all duration-200 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Max Acceptance Rate (%)
        </Label>
        <Input
          type="number"
          placeholder="50"
          min="0"
          max="100"
          value={filters.maxAdmissionRate}
          onChange={(e) => handleFilterChange('maxAdmissionRate', e.target.value)}
          className="w-full transition-all duration-200 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Max Tuition */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          Max Tuition ($)
        </Label>
        <Input
          type="number"
          placeholder="50,000"
          value={filters.maxTuition}
          onChange={(e) => handleFilterChange('maxTuition', e.target.value)}
          className="w-full transition-all duration-200 focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Clear Filters Button */}
      <div className="flex items-end xl:col-span-6">
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 hover:scale-105 transition-all duration-200"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};
