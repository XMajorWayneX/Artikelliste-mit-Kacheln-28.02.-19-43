import React, { useState, useEffect } from 'react';

function ItemSearch({ items, regions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [schutzartFilter, setSchutzartFilter] = useState('');
  const [bwsFilter, setBwsFilter] = useState('');
  const [typFilter, setTypFilter] = useState('');
  const [artFilter, setArtFilter] = useState('');
  const [serieFilter, setSerieFilter] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');
  const [filteredAndSortedItems, setFilteredAndSortedItems] = useState([]);
  const [regionSelected, setRegionSelected] = useState(false);

  useEffect(() => {
    if (selectedRegion) {
      setRegionSelected(true);
      const filteredItems = items.filter(item => {
        const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const regionMatch = item.regions.includes(selectedRegion);
        const schutzartMatch = schutzartFilter === '' || item.schutzart === schutzartFilter;
        const bwsMatch = bwsFilter === '' || item.bws === bwsFilter;
        const typMatch = typFilter === '' || item.typ === typFilter;
        const artMatch = artFilter === '' || item.art === artFilter;
        const serieMatch = serieFilter === '' || item.serie === serieFilter;
        const materialMatch = materialFilter === '' || item.material === materialFilter;

        return (
          searchMatch &&
          regionMatch &&
          schutzartMatch &&
          bwsMatch &&
          typMatch &&
          artMatch &&
          serieMatch &&
          materialMatch
        );
      });

      const sortedItems = [...filteredItems].sort((a, b) => {
        const aPrefix = a.name.substring(0, 3).toUpperCase();
        const bPrefix = b.name.substring(0, 3).toUpperCase();
        return aPrefix.localeCompare(bPrefix);
      });

      setFilteredAndSortedItems(sortedItems);
    } else {
      setRegionSelected(false);
      setFilteredAndSortedItems([]);
    }
  }, [items, searchTerm, selectedRegion, schutzartFilter, bwsFilter, typFilter, artFilter, serieFilter, materialFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSchutzartFilter('');
    setBwsFilter('');
    setTypFilter('');
    setArtFilter('');
    setSerieFilter('');
    setMaterialFilter('');
  };

  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
  };

  return (
    <div>
      <h2>Artikel Suche</h2>
      {!regionSelected ? (
        <div className="region-tiles-container">
          {regions.map(region => (
            <div
              key={region.id}
              className="region-tile"
              onClick={() => handleRegionSelect(region.id)}
            >
              {region.name}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => { setSelectedRegion(''); setRegionSelected(false); }}>Gebiet wechseln</button>
          <div className="filter-container">
            <input
              type="text"
              placeholder="Artikel suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select value={schutzartFilter} onChange={(e) => setSchutzartFilter(e.target.value)}>
              <option value="">Schutzart</option>
              <option value="IP Hoch">IP Hoch</option>
              <option value="IP Niedrig">IP Niedrig</option>
            </select>

            <select value={bwsFilter} onChange={(e) => setBwsFilter(e.target.value)}>
              <option value="">BWS</option>
              <option value="BWS Ja">BWS Ja</option>
              <option value="BWS Nein">BWS Nein</option>
            </select>

            <select value={typFilter} onChange={(e) => setTypFilter(e.target.value)}>
              <option value="">Typ</option>
              <option value="RZ">RZ</option>
              <option value="SL">SL</option>
              <option value="Modul">Modul</option>
              <option value="Sonstiges">Sonstiges</option>
            </select>

            <select value={artFilter} onChange={(e) => setArtFilter(e.target.value)}>
              <option value="">Art</option>
              <option value="EZB">EZB</option>
              <option value="EVG">EVG</option>
            </select>

            <select value={serieFilter} onChange={(e) => setSerieFilter(e.target.value)}>
              <option value="">Serie</option>
              <option value="Display">Display</option>
              <option value="Würfel">Würfel</option>
              <option value="Kompakt">Kompakt</option>
              <option value="Kombi">Kombi</option>
              <option value="Spot">Spot</option>
              <option value="Trapez">Trapez</option>
              <option value="Fokus">Fokus</option>
              <option value="SUB">SUB</option>
              <option value="Sonder">Sonder</option>
            </select>

            <select value={materialFilter} onChange={(e) => setMaterialFilter(e.target.value)}>
              <option value="">Material</option>
              <option value="Stahl">Stahl</option>
              <option value="Alu">Alu</option>
              <option value="PC">PC</option>
              <option value="Edelstahl">Edelstahl</option>
              <option value="Sonder">Sonder</option>
            </select>

            <button onClick={handleResetFilters}>Filter zurücksetzen</button>
          </div>

          <ul>
            {filteredAndSortedItems.map(item => (
              <li key={item.id}>
                {item.name} - {item.price} €
                <br />
                Schutzart: {item.schutzart}, BWS: {item.bws}, Typ: {item.typ}, Art: {item.art}, Serie: {item.serie}, Material: {item.material}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ItemSearch;
