import { useState } from 'react';
import Icon from '@/components/AppIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const CheckoutModal = ({ isOpen, onClose, total }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  const stateOptions = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' },
    { value: 'IL', label: 'Illinois' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName) newErrors.fullName = 'ERR_001';
    if (!formData?.email) newErrors.email = 'ERR_002';
    if (!formData?.phone) newErrors.phone = 'ERR_003';
    if (!formData?.address) newErrors.address = 'ERR_004';
    if (!formData?.city) newErrors.city = 'ERR_005';
    if (!formData?.state) newErrors.state = 'ERR_006';
    if (!formData?.zipCode) newErrors.zipCode = 'ERR_007';
    if (!formData?.cardNumber) newErrors.cardNumber = 'ERR_008';
    if (!formData?.expiryDate) newErrors.expiryDate = 'ERR_009';
    if (!formData?.cvv) newErrors.cvv = 'ERR_010';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      throw new Error('Payment processing failed');
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between z-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            <Icon name="CreditCard" size={24} color="var(--color-primary)" />
            Checkout
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6 md:space-y-8">
          <div className="bg-primary/10 border border-primary rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-between">
              <span className="text-base md:text-lg text-foreground">Order Total:</span>
              <span className="text-2xl md:text-3xl font-bold text-primary">
                ${total?.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
              <Icon name="User" size={20} />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={formData?.fullName}
                onChange={(e) => handleChange('fullName', e?.target?.value)}
                error={errors?.fullName}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={formData?.email}
                onChange={(e) => handleChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData?.phone}
                onChange={(e) => handleChange('phone', e?.target?.value)}
                error={errors?.phone}
                required
                className="md:col-span-2"
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
              <Icon name="MapPin" size={20} />
              Shipping Address
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Street Address"
                type="text"
                placeholder="123 Main Street"
                value={formData?.address}
                onChange={(e) => handleChange('address', e?.target?.value)}
                error={errors?.address}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  type="text"
                  placeholder="San Francisco"
                  value={formData?.city}
                  onChange={(e) => handleChange('city', e?.target?.value)}
                  error={errors?.city}
                  required
                />

                <Select
                  label="State"
                  placeholder="Select state"
                  options={stateOptions}
                  value={formData?.state}
                  onChange={(value) => handleChange('state', value)}
                  error={errors?.state}
                  required
                />

                <Input
                  label="ZIP Code"
                  type="text"
                  placeholder="94102"
                  value={formData?.zipCode}
                  onChange={(e) => handleChange('zipCode', e?.target?.value)}
                  error={errors?.zipCode}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
              <Icon name="CreditCard" size={20} />
              Payment Information
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Card Number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData?.cardNumber}
                onChange={(e) => handleChange('cardNumber', e?.target?.value)}
                error={errors?.cardNumber}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  type="text"
                  placeholder="MM/YY"
                  value={formData?.expiryDate}
                  onChange={(e) => handleChange('expiryDate', e?.target?.value)}
                  error={errors?.expiryDate}
                  required
                />

                <Input
                  label="CVV"
                  type="text"
                  placeholder="123"
                  value={formData?.cvv}
                  onChange={(e) => handleChange('cvv', e?.target?.value)}
                  error={errors?.cvv}
                  required
                />
              </div>
            </div>
          </div>


          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              fullWidth
              iconName="Lock"
              iconPosition="left"
            >
              Complete Purchase
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;