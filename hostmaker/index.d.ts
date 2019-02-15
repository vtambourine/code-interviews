interface Property {
	address: PropertyAddress;
	airbnbId: number;
	incomeGenerated?: number;
	numberOfBedrooms?: number,
	numberOfBathrooms?: number,
	owner: string;
}

interface PropertyAddress {
	city?: string;
	country?: string;
	line1?: string;
	line2?: string;
	line3?: string;
	line4?: string;
	line5?: string;
	postCode?: string;
}

interface Window {
  mapboxgl: MapboxGL;
}
