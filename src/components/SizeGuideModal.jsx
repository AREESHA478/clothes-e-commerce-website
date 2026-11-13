import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, Info } from 'lucide-react';
import './SizeGuideModal.css';

const SizeGuideModal = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState('inches'); // 'inches' or 'cm'
  const [genderTab, setGenderTab] = useState('women'); // 'women' or 'men'

  if (!isSizeGuideOpen) return null;

  const womenMeasurements = [
    { size: 'XS', bust: unit === 'inches' ? '32 - 33"' : '81 - 84 cm', waist: unit === 'inches' ? '24 - 25"' : '61 - 64 cm', hip: unit === 'inches' ? '34 - 35"' : '86 - 89 cm' },
    { size: 'S',  bust: unit === 'inches' ? '34 - 35"' : '86 - 89 cm', waist: unit === 'inches' ? '26 - 27"' : '66 - 69 cm', hip: unit === 'inches' ? '36 - 37"' : '91 - 94 cm' },
    { size: 'M',  bust: unit === 'inches' ? '36 - 37"' : '91 - 94 cm', waist: unit === 'inches' ? '28 - 29"' : '71 - 74 cm', hip: unit === 'inches' ? '38 - 39"' : '96 - 99 cm' },
    { size: 'L',  bust: unit === 'inches' ? '38 - 40"' : '96 - 101 cm', waist: unit === 'inches' ? '30 - 32"' : '76 - 81 cm', hip: unit === 'inches' ? '40 - 42"' : '101 - 107 cm' },
    { size: 'XL', bust: unit === 'inches' ? '41 - 43"' : '104 - 109 cm', waist: unit === 'inches' ? '33 - 35"' : '84 - 89 cm', hip: unit === 'inches' ? '43 - 45"' : '109 - 114 cm' }
  ];

  const menMeasurements = [
    { size: 'S',  chest: unit === 'inches' ? '36 - 38"' : '91 - 96 cm', waist: unit === 'inches' ? '30 - 31"' : '76 - 79 cm', collar: unit === 'inches' ? '14.5"' : '37 cm' },
    { size: 'M',  chest: unit === 'inches' ? '39 - 41"' : '99 - 104 cm', waist: unit === 'inches' ? '32 - 33"' : '81 - 84 cm', collar: unit === 'inches' ? '15.5"' : '39 cm' },
    { size: 'L',  chest: unit === 'inches' ? '42 - 44"' : '106 - 111 cm', waist: unit === 'inches' ? '34 - 36"' : '86 - 91 cm', collar: unit === 'inches' ? '16.5"' : '42 cm' },
    { size: 'XL', chest: unit === 'inches' ? '45 - 47"' : '114 - 119 cm', waist: unit === 'inches' ? '37 - 39"' : '94 - 99 cm', collar: unit === 'inches' ? '17.5"' : '44 cm' },
    { size: 'XXL', chest: unit === 'inches' ? '48 - 50"' : '122 - 127 cm', waist: unit === 'inches' ? '40 - 42"' : '101 - 107 cm', collar: unit === 'inches' ? '18.5"' : '47 cm' }
  ];

  return (
    <div className="size-guide-overlay overlay-backdrop" onClick={() => setIsSizeGuideOpen(false)}>
      <div className="size-guide-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="size-guide-header">
          <div className="guide-title-row">
            <Ruler size={22} className="ruler-icon" />
            <h3 className="guide-title">Atelier Tailoring & Sizing Guide</h3>
          </div>
          <button 
            className="modal-close-btn"
            onClick={() => setIsSizeGuideOpen(false)}
            aria-label="Close size guide"
          >
            <X size={20} />
          </button>
        </div>

        <div className="size-guide-controls">
          <div className="gender-tabs">
            <button 
              className={`g-tab ${genderTab === 'women' ? 'active' : ''}`}
              onClick={() => setGenderTab('women')}
            >
              Women's Atelier
            </button>
            <button 
              className={`g-tab ${genderTab === 'men' ? 'active' : ''}`}
              onClick={() => setGenderTab('men')}
            >
              Men's Sartorial
            </button>
          </div>

          <div className="unit-toggle">
            <button 
              className={`u-btn ${unit === 'inches' ? 'active' : ''}`}
              onClick={() => setUnit('inches')}
            >
              Inches
            </button>
            <button 
              className={`u-btn ${unit === 'cm' ? 'active' : ''}`}
              onClick={() => setUnit('cm')}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="size-table-container">
          <table className="size-table">
            <thead>
              {genderTab === 'women' ? (
                <tr>
                  <th>Size</th>
                  <th>Bust</th>
                  <th>Waist</th>
                  <th>Hips</th>
                </tr>
              ) : (
                <tr>
                  <th>Size</th>
                  <th>Chest</th>
                  <th>Waist</th>
                  <th>Collar</th>
                </tr>
              )}
            </thead>
            <tbody>
              {genderTab === 'women' ? (
                womenMeasurements.map((m) => (
                  <tr key={m.size}>
                    <td className="size-col">{m.size}</td>
                    <td>{m.bust}</td>
                    <td>{m.waist}</td>
                    <td>{m.hip}</td>
                  </tr>
                ))
              ) : (
                menMeasurements.map((m) => (
                  <tr key={m.size}>
                    <td className="size-col">{m.size}</td>
                    <td>{m.chest}</td>
                    <td>{m.waist}</td>
                    <td>{m.collar}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="size-advice-box">
          <Info size={18} className="advice-icon" />
          <p>
            <strong>Atelier Fit Advice:</strong> Our relaxed linen garments are intentionally cut 
            with a fluid, effortless silhouette. If you prefer a more tailored body-contour fit, 
            we advise choosing one size down.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
