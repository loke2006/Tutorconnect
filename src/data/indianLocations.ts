// Comprehensive list of Indian states and major cities
export const indianStates = [
  { value: 'all', label: 'All States' },
  { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
  { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
  { value: 'assam', label: 'Assam' },
  { value: 'bihar', label: 'Bihar' },
  { value: 'chhattisgarh', label: 'Chhattisgarh' },
  { value: 'goa', label: 'Goa' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
  { value: 'jharkhand', label: 'Jharkhand' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'manipur', label: 'Manipur' },
  { value: 'meghalaya', label: 'Meghalaya' },
  { value: 'mizoram', label: 'Mizoram' },
  { value: 'nagaland', label: 'Nagaland' },
  { value: 'odisha', label: 'Odisha' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'sikkim', label: 'Sikkim' },
  { value: 'tamil-nadu', label: 'Tamil Nadu' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'tripura', label: 'Tripura' },
  { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'west-bengal', label: 'West Bengal' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'jammu-kashmir', label: 'Jammu & Kashmir' },
  { value: 'ladakh', label: 'Ladakh' },
  { value: 'andaman-nicobar', label: 'Andaman & Nicobar' },
  { value: 'chandigarh', label: 'Chandigarh' },
  { value: 'dadra-nagar-haveli', label: 'Dadra & Nagar Haveli' },
  { value: 'lakshadweep', label: 'Lakshadweep' },
  { value: 'puducherry', label: 'Puducherry' }
];

export const citiesByState: Record<string, Array<{ value: string; label: string }>> = {
  'all': [{ value: 'all', label: 'All Cities' }],
  'andhra-pradesh': [
    { value: 'all', label: 'All Cities' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'visakhapatnam', label: 'Visakhapatnam' },
    { value: 'vijayawada', label: 'Vijayawada' },
    { value: 'guntur', label: 'Guntur' },
    { value: 'nellore', label: 'Nellore' },
    { value: 'kurnool', label: 'Kurnool' },
    { value: 'tirupati', label: 'Tirupati' }
  ],
  'karnataka': [
    { value: 'all', label: 'All Cities' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'mysore', label: 'Mysore' },
    { value: 'mangalore', label: 'Mangalore' },
    { value: 'hubli', label: 'Hubli' },
    { value: 'belgaum', label: 'Belgaum' },
    { value: 'gulbarga', label: 'Gulbarga' },
    { value: 'davanagere', label: 'Davanagere' },
    { value: 'bellary', label: 'Bellary' }
  ],
  'maharashtra': [
    { value: 'all', label: 'All Cities' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'pune', label: 'Pune' },
    { value: 'nagpur', label: 'Nagpur' },
    { value: 'nashik', label: 'Nashik' },
    { value: 'aurangabad', label: 'Aurangabad' },
    { value: 'solapur', label: 'Solapur' },
    { value: 'amravati', label: 'Amravati' },
    { value: 'kolhapur', label: 'Kolhapur' },
    { value: 'thane', label: 'Thane' },
    { value: 'navi-mumbai', label: 'Navi Mumbai' }
  ],
  'tamil-nadu': [
    { value: 'all', label: 'All Cities' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'coimbatore', label: 'Coimbatore' },
    { value: 'madurai', label: 'Madurai' },
    { value: 'tiruchirappalli', label: 'Tiruchirappalli' },
    { value: 'salem', label: 'Salem' },
    { value: 'tirunelveli', label: 'Tirunelveli' },
    { value: 'erode', label: 'Erode' },
    { value: 'vellore', label: 'Vellore' }
  ],
  'delhi': [
    { value: 'all', label: 'All Areas' },
    { value: 'new-delhi', label: 'New Delhi' },
    { value: 'south-delhi', label: 'South Delhi' },
    { value: 'north-delhi', label: 'North Delhi' },
    { value: 'east-delhi', label: 'East Delhi' },
    { value: 'west-delhi', label: 'West Delhi' },
    { value: 'central-delhi', label: 'Central Delhi' },
    { value: 'dwarka', label: 'Dwarka' },
    { value: 'rohini', label: 'Rohini' }
  ],
  'uttar-pradesh': [
    { value: 'all', label: 'All Cities' },
    { value: 'lucknow', label: 'Lucknow' },
    { value: 'kanpur', label: 'Kanpur' },
    { value: 'ghaziabad', label: 'Ghaziabad' },
    { value: 'agra', label: 'Agra' },
    { value: 'varanasi', label: 'Varanasi' },
    { value: 'meerut', label: 'Meerut' },
    { value: 'allahabad', label: 'Allahabad' },
    { value: 'bareilly', label: 'Bareilly' },
    { value: 'noida', label: 'Noida' },
    { value: 'greater-noida', label: 'Greater Noida' }
  ],
  'west-bengal': [
    { value: 'all', label: 'All Cities' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'howrah', label: 'Howrah' },
    { value: 'durgapur', label: 'Durgapur' },
    { value: 'asansol', label: 'Asansol' },
    { value: 'siliguri', label: 'Siliguri' },
    { value: 'bardhaman', label: 'Bardhaman' }
  ],
  'gujarat': [
    { value: 'all', label: 'All Cities' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'surat', label: 'Surat' },
    { value: 'vadodara', label: 'Vadodara' },
    { value: 'rajkot', label: 'Rajkot' },
    { value: 'gandhinagar', label: 'Gandhinagar' },
    { value: 'bhavnagar', label: 'Bhavnagar' },
    { value: 'jamnagar', label: 'Jamnagar' }
  ],
  'rajasthan': [
    { value: 'all', label: 'All Cities' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'jodhpur', label: 'Jodhpur' },
    { value: 'udaipur', label: 'Udaipur' },
    { value: 'kota', label: 'Kota' },
    { value: 'bikaner', label: 'Bikaner' },
    { value: 'ajmer', label: 'Ajmer' },
    { value: 'alwar', label: 'Alwar' }
  ],
  'kerala': [
    { value: 'all', label: 'All Cities' },
    { value: 'thiruvananthapuram', label: 'Thiruvananthapuram' },
    { value: 'kochi', label: 'Kochi' },
    { value: 'kozhikode', label: 'Kozhikode' },
    { value: 'thrissur', label: 'Thrissur' },
    { value: 'kollam', label: 'Kollam' },
    { value: 'palakkad', label: 'Palakkad' }
  ],
  'telangana': [
    { value: 'all', label: 'All Cities' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'warangal', label: 'Warangal' },
    { value: 'nizamabad', label: 'Nizamabad' },
    { value: 'karimnagar', label: 'Karimnagar' },
    { value: 'ramagundam', label: 'Ramagundam' }
  ],
  'bihar': [
    { value: 'all', label: 'All Cities' },
    { value: 'patna', label: 'Patna' },
    { value: 'gaya', label: 'Gaya' },
    { value: 'bhagalpur', label: 'Bhagalpur' },
    { value: 'muzaffarpur', label: 'Muzaffarpur' },
    { value: 'darbhanga', label: 'Darbhanga' }
  ],
  'madhya-pradesh': [
    { value: 'all', label: 'All Cities' },
    { value: 'bhopal', label: 'Bhopal' },
    { value: 'indore', label: 'Indore' },
    { value: 'jabalpur', label: 'Jabalpur' },
    { value: 'gwalior', label: 'Gwalior' },
    { value: 'ujjain', label: 'Ujjain' }
  ],
  'punjab': [
    { value: 'all', label: 'All Cities' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'ludhiana', label: 'Ludhiana' },
    { value: 'amritsar', label: 'Amritsar' },
    { value: 'jalandhar', label: 'Jalandhar' },
    { value: 'patiala', label: 'Patiala' },
    { value: 'bathinda', label: 'Bathinda' }
  ],
  'haryana': [
    { value: 'all', label: 'All Cities' },
    { value: 'gurgaon', label: 'Gurgaon' },
    { value: 'faridabad', label: 'Faridabad' },
    { value: 'panipat', label: 'Panipat' },
    { value: 'ambala', label: 'Ambala' },
    { value: 'yamunanagar', label: 'Yamunanagar' },
    { value: 'rohtak', label: 'Rohtak' },
    { value: 'hisar', label: 'Hisar' }
  ],
  'odisha': [
    { value: 'all', label: 'All Cities' },
    { value: 'bhubaneswar', label: 'Bhubaneswar' },
    { value: 'cuttack', label: 'Cuttack' },
    { value: 'rourkela', label: 'Rourkela' },
    { value: 'berhampur', label: 'Berhampur' },
    { value: 'sambalpur', label: 'Sambalpur' }
  ],
  'assam': [
    { value: 'all', label: 'All Cities' },
    { value: 'guwahati', label: 'Guwahati' },
    { value: 'silchar', label: 'Silchar' },
    { value: 'dibrugarh', label: 'Dibrugarh' },
    { value: 'jorhat', label: 'Jorhat' },
    { value: 'tezpur', label: 'Tezpur' }
  ],
  'jharkhand': [
    { value: 'all', label: 'All Cities' },
    { value: 'ranchi', label: 'Ranchi' },
    { value: 'jamshedpur', label: 'Jamshedpur' },
    { value: 'dhanbad', label: 'Dhanbad' },
    { value: 'bokaro', label: 'Bokaro' },
    { value: 'hazaribagh', label: 'Hazaribagh' }
  ],
  'chhattisgarh': [
    { value: 'all', label: 'All Cities' },
    { value: 'raipur', label: 'Raipur' },
    { value: 'bhilai', label: 'Bhilai' },
    { value: 'bilaspur', label: 'Bilaspur' },
    { value: 'korba', label: 'Korba' },
    { value: 'durg', label: 'Durg' }
  ],
  'uttarakhand': [
    { value: 'all', label: 'All Cities' },
    { value: 'dehradun', label: 'Dehradun' },
    { value: 'haridwar', label: 'Haridwar' },
    { value: 'haldwani', label: 'Haldwani' },
    { value: 'roorkee', label: 'Roorkee' },
    { value: 'rishikesh', label: 'Rishikesh' }
  ],
  'himachal-pradesh': [
    { value: 'all', label: 'All Cities' },
    { value: 'shimla', label: 'Shimla' },
    { value: 'dharamshala', label: 'Dharamshala' },
    { value: 'solan', label: 'Solan' },
    { value: 'mandi', label: 'Mandi' },
    { value: 'kullu', label: 'Kullu' }
  ],
  'goa': [
    { value: 'all', label: 'All Cities' },
    { value: 'panaji', label: 'Panaji' },
    { value: 'margao', label: 'Margao' },
    { value: 'vasco-da-gama', label: 'Vasco da Gama' },
    { value: 'mapusa', label: 'Mapusa' },
    { value: 'ponda', label: 'Ponda' }
  ],
  'tripura': [
    { value: 'all', label: 'All Cities' },
    { value: 'agartala', label: 'Agartala' },
    { value: 'udaipur', label: 'Udaipur' },
    { value: 'dharmanagar', label: 'Dharmanagar' }
  ],
  'manipur': [
    { value: 'all', label: 'All Cities' },
    { value: 'imphal', label: 'Imphal' },
    { value: 'thoubal', label: 'Thoubal' },
    { value: 'churachandpur', label: 'Churachandpur' }
  ],
  'meghalaya': [
    { value: 'all', label: 'All Cities' },
    { value: 'shillong', label: 'Shillong' },
    { value: 'tura', label: 'Tura' },
    { value: 'jowai', label: 'Jowai' }
  ],
  'mizoram': [
    { value: 'all', label: 'All Cities' },
    { value: 'aizawl', label: 'Aizawl' },
    { value: 'lunglei', label: 'Lunglei' },
    { value: 'champhai', label: 'Champhai' }
  ],
  'nagaland': [
    { value: 'all', label: 'All Cities' },
    { value: 'kohima', label: 'Kohima' },
    { value: 'dimapur', label: 'Dimapur' },
    { value: 'mokokchung', label: 'Mokokchung' }
  ],
  'sikkim': [
    { value: 'all', label: 'All Cities' },
    { value: 'gangtok', label: 'Gangtok' },
    { value: 'namchi', label: 'Namchi' },
    { value: 'mangan', label: 'Mangan' }
  ],
  'arunachal-pradesh': [
    { value: 'all', label: 'All Cities' },
    { value: 'itanagar', label: 'Itanagar' },
    { value: 'naharlagun', label: 'Naharlagun' },
    { value: 'pasighat', label: 'Pasighat' }
  ],
  'jammu-kashmir': [
    { value: 'all', label: 'All Cities' },
    { value: 'srinagar', label: 'Srinagar' },
    { value: 'jammu', label: 'Jammu' },
    { value: 'anantnag', label: 'Anantnag' },
    { value: 'baramulla', label: 'Baramulla' }
  ],
  'ladakh': [
    { value: 'all', label: 'All Cities' },
    { value: 'leh', label: 'Leh' },
    { value: 'kargil', label: 'Kargil' }
  ],
  'andaman-nicobar': [
    { value: 'all', label: 'All Cities' },
    { value: 'port-blair', label: 'Port Blair' },
    { value: 'car-nicobar', label: 'Car Nicobar' }
  ],
  'chandigarh': [
    { value: 'all', label: 'All Areas' },
    { value: 'sector-17', label: 'Sector 17' },
    { value: 'sector-22', label: 'Sector 22' },
    { value: 'sector-35', label: 'Sector 35' },
    { value: 'sector-43', label: 'Sector 43' }
  ],
  'puducherry': [
    { value: 'all', label: 'All Cities' },
    { value: 'pondicherry', label: 'Pondicherry' },
    { value: 'karaikal', label: 'Karaikal' },
    { value: 'mahe', label: 'Mahe' },
    { value: 'yanam', label: 'Yanam' }
  ],
  'dadra-nagar-haveli': [
    { value: 'all', label: 'All Cities' },
    { value: 'silvassa', label: 'Silvassa' }
  ],
  'lakshadweep': [
    { value: 'all', label: 'All Islands' },
    { value: 'kavaratti', label: 'Kavaratti' }
  ]
};

// Get all unique cities for search
export const getAllCities = () => {
  const allCities = new Set<{ value: string; label: string }>();
  Object.values(citiesByState).forEach(cities => {
    cities.forEach(city => {
      if (city.value !== 'all') {
        allCities.add(city);
      }
    });
  });
  return Array.from(allCities).sort((a, b) => a.label.localeCompare(b.label));
};