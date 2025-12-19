"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle,
  Globe,
  Lock,
  FileCheck,
  X,
  ChevronDown,
  ChevronUp,
  Building2,
  Scale,
  Eye,
  Server,
  MapPin,
} from "lucide-react";

const complianceStandards = [
  // Security & Privacy.
  {
    name: "OWASP Top 10",
    fullForm: "Open Web Application Security Project",
    description: "NGEK TECH is fully compliant with OWASP (Open Web Application Security Project) Application Security standards.",
    icon: Shield,
    status: "Compliant",
    category: "Security",
  },
  {
    name: "GDPR",
    fullForm: "General Data Protection Regulation",
    description: "NGEK TECH complies with GDPR (General Data Protection Regulation) - the European Union data protection law.",
    icon: Lock,
    status: "Compliant",
    category: "Privacy",
  },
  {
    name: "CCPA",
    fullForm: "California Consumer Privacy Act",
    description: "NGEK TECH adheres to CCPA (California Consumer Privacy Act) requirements for consumer data protection.",
    icon: Eye,
    status: "Compliant",
    category: "Privacy",
  },
  {
    name: "SOC 2 Type II",
    fullForm: "Service Organization Control 2 Type II",
    description: "NGEK TECH maintains SOC 2 (Service Organization Control 2) Type II security standards compliance.",
    icon: Server,
    status: "Compliant",
    category: "Security",
  },
  {
    name: "ISO 27001",
    fullForm: "International Organization for Standardization 27001",
    description: "NGEK TECH follows ISO (International Organization for Standardization) 27001 information security management standards.",
    icon: FileCheck,
    status: "Compliant",
    category: "Security",
  },
  // FinTech.
  {
    name: "PCI DSS",
    fullForm: "Payment Card Industry Data Security Standard",
    description: "NGEK TECH is fully compliant with PCI DSS (Payment Card Industry Data Security Standard) Level 1 for secure payment processing.",
    icon: Scale,
    status: "Compliant",
    category: "FinTech",
  },
  {
    name: "PSD2/SCA",
    fullForm: "Payment Services Directive 2 / Strong Customer Authentication",
    description: "NGEK TECH complies with PSD2 (Payment Services Directive 2) and SCA (Strong Customer Authentication) requirements for EU payments.",
    icon: Lock,
    status: "Compliant",
    category: "FinTech",
  },
  {
    name: "MiFID II",
    fullForm: "Markets in Financial Instruments Directive II",
    description: "NGEK TECH is compliant with MiFID II (Markets in Financial Instruments Directive II) for financial services transparency.",
    icon: Scale,
    status: "Compliant",
    category: "FinTech",
  },
  {
    name: "DORA",
    fullForm: "Digital Operational Resilience Act",
    description: "NGEK TECH complies with DORA (Digital Operational Resilience Act) for financial sector digital resilience in the EU.",
    icon: Server,
    status: "Compliant",
    category: "FinTech",
  },
  // Healthcare.
  {
    name: "HIPAA",
    fullForm: "Health Insurance Portability and Accountability Act",
    description: "NGEK TECH is fully compliant with HIPAA (Health Insurance Portability and Accountability Act) for healthcare data protection.",
    icon: Building2,
    status: "Compliant",
    category: "Healthcare",
  },
  {
    name: "HITECH",
    fullForm: "Health Information Technology for Economic and Clinical Health Act",
    description: "NGEK TECH complies with HITECH (Health Information Technology for Economic and Clinical Health Act) for electronic health records.",
    icon: Server,
    status: "Compliant",
    category: "Healthcare",
  },
  {
    name: "FDA 21 CFR Part 11",
    fullForm: "FDA Electronic Records and Signatures",
    description: "NGEK TECH is compliant with FDA 21 CFR Part 11 for electronic records and signatures in life sciences.",
    icon: FileCheck,
    status: "Compliant",
    category: "Healthcare",
  },
  {
    name: "HL7 FHIR",
    fullForm: "Health Level Seven Fast Healthcare Interoperability Resources",
    description: "NGEK TECH supports HL7 FHIR (Fast Healthcare Interoperability Resources) standards for healthcare data exchange.",
    icon: Server,
    status: "Compliant",
    category: "Healthcare",
  },
  // Legal.
  {
    name: "ABA Guidelines",
    fullForm: "American Bar Association Model Rules",
    description: "NGEK TECH adheres to ABA (American Bar Association) Model Rules for Professional Conduct in legal technology.",
    icon: Scale,
    status: "Compliant",
    category: "Legal",
  },
  {
    name: "eDiscovery/EDRM",
    fullForm: "Electronic Discovery Reference Model",
    description: "NGEK TECH complies with EDRM (Electronic Discovery Reference Model) standards for legal hold and litigation support.",
    icon: FileCheck,
    status: "Compliant",
    category: "Legal",
  },
  {
    name: "GDPR Art. 17",
    fullForm: "Right to Erasure (Right to be Forgotten)",
    description: "NGEK TECH implements GDPR Article 17 Right to Erasure for legal data retention and deletion requirements.",
    icon: Lock,
    status: "Compliant",
    category: "Legal",
  },
  // Travel.
  {
    name: "IATA NDC",
    fullForm: "International Air Transport Association New Distribution Capability",
    description: "NGEK TECH is certified for IATA NDC (New Distribution Capability) for airline distribution and retailing.",
    icon: Globe,
    status: "Compliant",
    category: "Travel",
  },
  {
    name: "PNR/APIS",
    fullForm: "Passenger Name Record / Advance Passenger Information System",
    description: "NGEK TECH complies with PNR (Passenger Name Record) and APIS (Advance Passenger Information System) data handling requirements.",
    icon: Lock,
    status: "Compliant",
    category: "Travel",
  },
  {
    name: "ATPCO",
    fullForm: "Airline Tariff Publishing Company Standards",
    description: "NGEK TECH adheres to ATPCO (Airline Tariff Publishing Company) standards for fare and ancillary data.",
    icon: FileCheck,
    status: "Compliant",
    category: "Travel",
  },
];

const jurisdictions: Record<string, string[]> = {
  "United States of America (USA)": [
    "New York City", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego",
    "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco",
    "Indianapolis", "Seattle", "Denver", "Washington D.C.", "Boston", "Nashville", "Detroit", "Portland",
    "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno",
    "Sacramento", "Kansas City", "Mesa", "Atlanta", "Omaha", "Colorado Springs", "Raleigh", "Miami",
    "Long Beach", "Virginia Beach", "Oakland", "Minneapolis", "Tampa", "Tulsa", "Arlington", "New Orleans",
    "Wichita", "Cleveland", "Bakersfield", "Aurora", "Anaheim", "Honolulu", "Santa Ana", "Riverside",
    "Corpus Christi", "Lexington", "Henderson", "Stockton", "Saint Paul", "Cincinnati", "St. Louis",
    "Pittsburgh", "Greensboro", "Lincoln", "Anchorage", "Plano", "Orlando", "Irvine", "Newark",
    "Durham", "Chula Vista", "Toledo", "Fort Wayne", "St. Petersburg", "Laredo", "Jersey City",
    "Chandler", "Madison", "Lubbock", "Scottsdale", "Reno", "Buffalo", "Gilbert", "Glendale",
    "North Las Vegas", "Winston-Salem", "Chesapeake", "Norfolk", "Fremont", "Garland", "Irving",
    "Hialeah", "Richmond", "Boise", "Spokane", "Baton Rouge",
  ],
  "India": [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
    "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
    "Meerut", "Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai",
    "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur",
    "Madurai", "Raipur", "Kota", "Chandigarh", "Guwahati", "Solapur", "Hubli", "Mysore",
    "Tiruchirappalli", "Bareilly", "Aligarh", "Tiruppur", "Moradabad", "Jalandhar", "Bhubaneswar",
    "Salem", "Warangal", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati",
    "Noida", "Jamshedpur", "Bhilai", "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar",
    "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer", "Akola",
    "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Jammu",
    "Sangli", "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya",
    "Udaipur", "Maheshtala", "Davanagere", "Kozhikode", "Kurnool", "Rajpur Sonarpur", "Rajahmundry",
  ],
  "United Kingdom (UK)": [
    "London", "Birmingham", "Manchester", "Leeds", "Glasgow", "Liverpool", "Bristol", "Edinburgh",
    "Sheffield", "Leicester", "Coventry", "Bradford", "Cardiff", "Belfast", "Nottingham", "Kingston upon Hull",
    "Newcastle upon Tyne", "Stoke-on-Trent", "Southampton", "Derby", "Portsmouth", "Brighton", "Plymouth",
    "Northampton", "Reading", "Luton", "Wolverhampton", "Bolton", "Aberdeen", "Bournemouth", "Norwich",
    "Swindon", "Swansea", "Milton Keynes", "Southend-on-Sea", "Middlesbrough", "Peterborough", "Sunderland",
    "Warrington", "Huddersfield", "Oxford", "Poole", "Slough", "Cambridge", "Dundee", "York", "Ipswich",
  ],
  "Canada": [
    "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City",
    "Hamilton", "Kitchener", "London", "Victoria", "Halifax", "Oshawa", "Windsor", "Saskatoon",
    "Regina", "St. Catharines", "St. John's", "Barrie", "Kelowna", "Abbotsford", "Sudbury", "Kingston",
    "Saguenay", "Trois-Rivières", "Guelph", "Moncton", "Brantford", "Thunder Bay", "Saint John",
    "Peterborough", "Nanaimo", "Lethbridge", "Kamloops", "Red Deer", "Medicine Hat", "Drummondville",
  ],
  "Australia": [
    "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle",
    "Wollongong", "Sunshine Coast", "Hobart", "Geelong", "Townsville", "Cairns", "Darwin", "Toowoomba",
    "Ballarat", "Bendigo", "Launceston", "Mackay", "Rockhampton", "Bunbury", "Bundaberg", "Hervey Bay",
    "Wagga Wagga", "Coffs Harbour", "Gladstone", "Mildura", "Shepparton", "Albury", "Port Macquarie",
  ],
  "Germany": [
    "Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Dusseldorf", "Leipzig",
    "Dortmund", "Essen", "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg", "Bochum",
    "Wuppertal", "Bielefeld", "Bonn", "Munster", "Mannheim", "Karlsruhe", "Augsburg", "Wiesbaden",
    "Monchengladbach", "Gelsenkirchen", "Aachen", "Braunschweig", "Kiel", "Chemnitz", "Halle",
    "Magdeburg", "Freiburg", "Krefeld", "Mainz", "Lubeck", "Erfurt", "Oberhausen", "Rostock",
  ],
  "France": [
    "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier",
    "Bordeaux", "Lille", "Rennes", "Reims", "Saint-Etienne", "Toulon", "Le Havre", "Grenoble",
    "Dijon", "Angers", "Nimes", "Villeurbanne", "Saint-Denis", "Le Mans", "Aix-en-Provence",
    "Clermont-Ferrand", "Brest", "Tours", "Limoges", "Amiens", "Perpignan", "Metz", "Besancon",
    "Orleans", "Mulhouse", "Rouen", "Caen", "Nancy", "Saint-Paul", "Argenteuil", "Montreuil",
  ],
  "Japan": [
    "Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto",
    "Kawasaki", "Saitama", "Hiroshima", "Sendai", "Kitakyushu", "Chiba", "Sakai", "Niigata",
    "Hamamatsu", "Shizuoka", "Sagamihara", "Okayama", "Kumamoto", "Kagoshima", "Funabashi",
    "Hachioji", "Kawaguchi", "Himeji", "Matsuyama", "Higashiosaka", "Utsunomiya", "Matsudo",
    "Nishinomiya", "Ichikawa", "Kurashiki", "Fukuyama", "Amagasaki", "Kanazawa", "Nagasaki",
  ],
  "China": [
    "Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Chengdu", "Hangzhou", "Wuhan", "Xi'an",
    "Suzhou", "Nanjing", "Tianjin", "Chongqing", "Dongguan", "Shenyang", "Qingdao", "Ningbo",
    "Zhengzhou", "Changsha", "Dalian", "Harbin", "Jinan", "Kunming", "Foshan", "Fuzhou",
    "Changchun", "Wuxi", "Xiamen", "Hefei", "Nanchang", "Shijiazhuang", "Taiyuan", "Guiyang",
    "Nanning", "Lanzhou", "Wenzhou", "Zhuhai", "Huizhou", "Zhongshan", "Jiangmen", "Yangzhou",
  ],
  "Singapore": ["Singapore"],
  "United Arab Emirates (UAE)": [
    "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain",
    "Al Ain", "Khalifa City", "Dubai Marina", "Jumeirah", "Business Bay", "DIFC",
  ],
  "Hong Kong SAR": ["Hong Kong", "Kowloon", "New Territories", "Lantau Island", "Hong Kong Island"],
  "Netherlands": [
    "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen",
    "Almere", "Breda", "Nijmegen", "Apeldoorn", "Haarlem", "Arnhem", "Zaanstad", "Amersfoort",
    "Haarlemmermeer", "Den Bosch", "Zoetermeer", "Zwolle", "Maastricht", "Leiden", "Dordrecht",
  ],
  "Switzerland": [
    "Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Winterthur", "Lucerne", "St. Gallen",
    "Lugano", "Biel", "Thun", "Koniz", "La Chaux-de-Fonds", "Fribourg", "Schaffhausen", "Vernier",
  ],
  "Sweden": [
    "Stockholm", "Gothenburg", "Malmo", "Uppsala", "Vasteras", "Orebro", "Linkoping", "Helsingborg",
    "Jonkoping", "Norrkoping", "Lund", "Umea", "Gavle", "Boras", "Sodertalje", "Eskilstuna",
  ],
  "Ireland": [
    "Dublin", "Cork", "Galway", "Limerick", "Waterford", "Drogheda", "Swords", "Dundalk",
    "Bray", "Navan", "Kilkenny", "Ennis", "Carlow", "Tralee", "Newbridge", "Portlaoise",
  ],
  "New Zealand": [
    "Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Napier-Hastings", "Dunedin",
    "Palmerston North", "Nelson", "Rotorua", "New Plymouth", "Whangarei", "Invercargill", "Whanganui",
  ],
  "South Korea": [
    "Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan",
    "Changwon", "Seongnam", "Goyang", "Yongin", "Bucheon", "Ansan", "Cheongju", "Jeonju",
    "Anyang", "Cheonan", "Namyangju", "Hwaseong", "Jeju City", "Gimhae", "Pohang", "Uijeongbu",
  ],
  "Brazil": [
    "Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus",
    "Curitiba", "Recife", "Goiania", "Porto Alegre", "Belem", "Guarulhos", "Campinas", "Sao Luis",
    "Sao Goncalo", "Maceio", "Duque de Caxias", "Campo Grande", "Natal", "Teresina", "Sao Bernardo",
    "Nova Iguacu", "Joao Pessoa", "Santo Andre", "Osasco", "Sao Jose dos Campos", "Jaboatao",
    "Ribeirao Preto", "Uberlandia", "Sorocaba", "Contagem", "Aracaju", "Feira de Santana", "Cuiaba",
  ],
  "Mexico": [
    "Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "Toluca", "Leon", "Juarez",
    "Torreon", "Queretaro", "San Luis Potosi", "Merida", "Mexicali", "Aguascalientes", "Hermosillo",
    "Chihuahua", "Saltillo", "Cancun", "Morelia", "Veracruz", "Culiacan", "Acapulco", "Tlaxcala",
    "Villahermosa", "Tuxtla Gutierrez", "Durango", "Tepic", "Campeche", "Cuernavaca", "Oaxaca",
  ],
  "Spain": [
    "Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Malaga", "Murcia", "Palma",
    "Las Palmas", "Bilbao", "Alicante", "Cordoba", "Valladolid", "Vigo", "Gijon", "Hospitalet",
    "A Coruna", "Vitoria-Gasteiz", "Granada", "Elche", "Oviedo", "Terrassa", "Badalona", "Cartagena",
    "Jerez", "Sabadell", "Mostoles", "Santa Cruz de Tenerife", "Pamplona", "Almeria", "Donostia",
  ],
  "Italy": [
    "Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence",
    "Bari", "Catania", "Venice", "Verona", "Messina", "Padua", "Trieste", "Brescia",
    "Taranto", "Prato", "Reggio Calabria", "Modena", "Parma", "Reggio Emilia", "Perugia",
    "Livorno", "Ravenna", "Cagliari", "Foggia", "Rimini", "Salerno", "Ferrara", "Sassari",
  ],
  "South Africa": [
    "Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London",
    "Nelspruit", "Kimberley", "Polokwane", "Rustenburg", "Pietermaritzburg", "Soweto", "Benoni",
  ],
  "Nigeria": [
    "Lagos", "Kano", "Ibadan", "Abuja", "Port Harcourt", "Benin City", "Maiduguri", "Zaria",
    "Aba", "Jos", "Ilorin", "Oyo", "Enugu", "Abeokuta", "Onitsha", "Warri", "Sokoto", "Calabar",
  ],
  "Egypt": [
    "Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez", "Luxor", "Mansoura",
    "El Mahalla El Kubra", "Tanta", "Asyut", "Ismailia", "Faiyum", "Zagazig", "Aswan", "Damietta",
  ],
  "Saudi Arabia": [
    "Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Taif", "Tabuk",
    "Buraidah", "Khamis Mushait", "Abha", "Najran", "Yanbu", "Al Hufuf", "Jubail", "Hafar Al Batin",
  ],
  "Israel": [
    "Tel Aviv", "Jerusalem", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beer Sheva",
    "Holon", "Bnei Brak", "Ramat Gan", "Ashkelon", "Rehovot", "Bat Yam", "Herzliya", "Kfar Saba",
  ],
  "Turkey": [
    "Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Gaziantep", "Konya",
    "Mersin", "Diyarbakir", "Kayseri", "Eskisehir", "Samsun", "Denizli", "Sanliurfa", "Malatya",
  ],
  "Russia": [
    "Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Nizhny Novgorod",
    "Chelyabinsk", "Samara", "Omsk", "Rostov-on-Don", "Ufa", "Krasnoyarsk", "Voronezh", "Perm",
    "Volgograd", "Krasnodar", "Saratov", "Tyumen", "Tolyatti", "Izhevsk", "Barnaul", "Ulyanovsk",
  ],
  "Poland": [
    "Warsaw", "Krakow", "Lodz", "Wroclaw", "Poznan", "Gdansk", "Szczecin", "Bydgoszcz",
    "Lublin", "Bialystok", "Katowice", "Gdynia", "Czestochowa", "Radom", "Sosnowiec", "Torun",
  ],
  "Thailand": [
    "Bangkok", "Nonthaburi", "Nakhon Ratchasima", "Chiang Mai", "Hat Yai", "Udon Thani", "Pak Kret",
    "Khon Kaen", "Chaophraya Surasak", "Phuket", "Pattaya", "Surat Thani", "Chiang Rai", "Nakhon Si Thammarat",
  ],
  "Vietnam": [
    "Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong", "Can Tho", "Bien Hoa", "Hue",
    "Nha Trang", "Buon Ma Thuot", "Quy Nhon", "Vung Tau", "Nam Dinh", "Phan Thiet", "Long Xuyen",
  ],
  "Indonesia": [
    "Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Makassar", "Palembang", "Tangerang",
    "Depok", "Bekasi", "Padang", "Denpasar", "Malang", "Samarinda", "Batam", "Banjarmasin",
  ],
  "Malaysia": [
    "Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh", "Shah Alam", "Petaling Jaya", "Kuching",
    "Kota Kinabalu", "Kuantan", "Melaka", "Miri", "Alor Setar", "Sandakan", "Seremban", "Klang",
  ],
  "Philippines": [
    "Manila", "Quezon City", "Davao City", "Caloocan", "Cebu City", "Zamboanga City", "Taguig",
    "Pasig", "Antipolo", "Cagayan de Oro", "Paranaque", "Dasmarinas", "Valenzuela", "Bacoor",
  ],
  "Argentina": [
    "Buenos Aires", "Cordoba", "Rosario", "Mendoza", "Tucuman", "La Plata", "Mar del Plata",
    "Salta", "Santa Fe", "San Juan", "Resistencia", "Neuquen", "Santiago del Estero", "Corrientes",
  ],
  "Colombia": [
    "Bogota", "Medellin", "Cali", "Barranquilla", "Cartagena", "Cucuta", "Bucaramanga", "Pereira",
    "Santa Marta", "Ibague", "Pasto", "Manizales", "Neiva", "Soledad", "Villavicencio", "Armenia",
  ],
  "Chile": [
    "Santiago", "Valparaiso", "Concepcion", "La Serena", "Antofagasta", "Temuco", "Rancagua",
    "Talca", "Arica", "Coquimbo", "Puerto Montt", "Iquique", "Chillan", "Osorno", "Valdivia",
  ],
  "Austria": [
    "Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", "Wels",
    "Sankt Polten", "Dornbirn", "Wiener Neustadt", "Steyr", "Feldkirch", "Bregenz", "Leonding",
  ],
  "Belgium": [
    "Brussels", "Antwerp", "Ghent", "Charleroi", "Liege", "Bruges", "Namur", "Leuven",
    "Mons", "Mechelen", "Aalst", "La Louviere", "Kortrijk", "Hasselt", "Ostend", "Sint-Niklaas",
  ],
  "Portugal": [
    "Lisbon", "Porto", "Vila Nova de Gaia", "Amadora", "Braga", "Funchal", "Coimbra", "Setubal",
    "Almada", "Agualva-Cacem", "Queluz", "Leiria", "Viseu", "Evora", "Faro", "Guimaraes",
  ],
  "Denmark": [
    "Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg", "Randers", "Kolding", "Horsens",
    "Vejle", "Roskilde", "Herning", "Silkeborg", "Naestved", "Fredericia", "Viborg", "Holstebro",
  ],
  "Norway": [
    "Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen", "Fredrikstad", "Kristiansand", "Sandnes",
    "Tromso", "Sarpsborg", "Skoyen", "Asker", "Aalesund", "Sandefjord", "Haugesund", "Tonsberg",
  ],
  "Finland": [
    "Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku", "Jyvaskyla", "Lahti",
    "Kuopio", "Pori", "Kouvola", "Joensuu", "Lappeenranta", "Hameenlinna", "Vaasa", "Rovaniemi",
  ],
  "Greece": [
    "Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", "Rhodes", "Ioannina",
    "Chania", "Chalcis", "Agrinio", "Katerini", "Trikala", "Serres", "Lamia", "Alexandroupoli",
  ],
  "Czech Republic": [
    "Prague", "Brno", "Ostrava", "Plzen", "Liberec", "Olomouc", "Ceske Budejovice", "Hradec Kralove",
    "Usti nad Labem", "Pardubice", "Zlin", "Havirov", "Kladno", "Most", "Opava", "Frydek-Mistek",
  ],
  "Romania": [
    "Bucharest", "Cluj-Napoca", "Timisoara", "Iasi", "Constanta", "Craiova", "Brasov", "Galati",
    "Ploiesti", "Oradea", "Braila", "Arad", "Pitesti", "Sibiu", "Bacau", "Targu Mures",
  ],
  "Hungary": [
    "Budapest", "Debrecen", "Szeged", "Miskolc", "Pecs", "Gyor", "Nyiregyhaza", "Kecskemet",
    "Szekesfehervar", "Szombathely", "Szolnok", "Tatabanya", "Kaposvar", "Bekescsaba", "Erd", "Veszprem",
  ],
};

const regulatoryDetails = [
  {
    title: "Data Protection & Privacy",
    icon: Lock,
    content: `NGEK TECH maintains strict compliance with global data protection regulations including:

- **GDPR (General Data Protection Regulation) - European Union (EU)**: NGEK TECH provides full compliance with European data protection standards, including data subject rights, lawful processing bases, and cross-border transfer mechanisms.
- **CCPA (California Consumer Privacy Act) - California, USA**: NGEK TECH adheres completely to California Consumer Privacy Act requirements for consumer data rights and business obligations.
- **LGPD (Lei Geral de Proteção de Dados / General Data Protection Law) - Brazil**: NGEK TECH complies with Brazil's General Data Protection Law for all data processing activities.
- **PDPA (Personal Data Protection Act) - Singapore**: NGEK TECH adheres to Singapore's Personal Data Protection Act requirements.
- **Privacy Act - Australia**: NGEK TECH complies with Australian Privacy Principles (APPs) for handling personal information.

NGEK TECH documents all data processing activities and conducts DPIAs (Data Protection Impact Assessments) for high-risk processing operations.`,
  },
  {
    title: "Information Security Standards",
    icon: Shield,
    content: `NGEK TECH implements industry-leading security standards:

- **ISO 27001 (International Organization for Standardization 27001)**: NGEK TECH maintains a certified ISMS (Information Security Management System) that ensures a systematic approach to managing sensitive information.
- **SOC 2 Type II (Service Organization Control 2 Type II)**: NGEK TECH undergoes annual audits that verify security, availability, processing integrity, confidentiality, and privacy controls.
- **OWASP Top 10 (Open Web Application Security Project Top 10)**: NGEK TECH tests all applications against OWASP ASVS (Application Security Verification Standard).
- **NIST (National Institute of Standards and Technology) Cybersecurity Framework**: NGEK TECH implements NIST guidelines for identifying, protecting, detecting, responding to, and recovering from cyber threats.
- **CIS (Center for Internet Security) Controls**: NGEK TECH adheres to Center for Internet Security critical security controls.

NGEK TECH conducts regular penetration testing and vulnerability assessments through certified third-party auditors.`,
  },
  {
    title: "FinTech & Payment Compliance",
    icon: Scale,
    content: `NGEK TECH maintains comprehensive FinTech and payment processing compliance:

- **PCI DSS Level 1 (Payment Card Industry Data Security Standard)**: NGEK TECH is fully certified at the highest level of PCI DSS compliance for secure handling of cardholder data, covering all 12 requirements including network security, data protection, vulnerability management, access control, monitoring, and security policies.
- **PSD2/SCA (Payment Services Directive 2 / Strong Customer Authentication)**: NGEK TECH complies with EU PSD2 requirements including Strong Customer Authentication (SCA), secure communication protocols, and open banking APIs.
- **MiFID II (Markets in Financial Instruments Directive II)**: NGEK TECH complies with MiFID II requirements for transaction reporting, best execution, and investor protection in financial services.
- **DORA (Digital Operational Resilience Act)**: NGEK TECH implements DORA requirements for ICT risk management, incident reporting, and digital operational resilience testing for financial entities.
- **AML/KYC (Anti-Money Laundering / Know Your Customer)**: NGEK TECH implements robust AML/KYC procedures including customer due diligence, transaction monitoring, and suspicious activity reporting.
- **GLBA (Gramm-Leach-Bliley Act)**: NGEK TECH complies with GLBA Safeguards Rule for financial institutions' customer information protection.
- **SOX (Sarbanes-Oxley Act)**: NGEK TECH maintains SOX compliance for financial reporting controls and audit trails.

NGEK TECH subjects all payment operations to quarterly ASV (Approved Scanning Vendor) scans and annual QSA (Qualified Security Assessor) audits.`,
  },
  {
    title: "Healthcare Compliance",
    icon: Building2,
    content: `NGEK TECH provides comprehensive healthcare regulatory compliance:

- **HIPAA (Health Insurance Portability and Accountability Act)**: NGEK TECH is fully HIPAA compliant, implementing all required administrative, physical, and technical safeguards for PHI (Protected Health Information). This includes encryption, access controls, audit logging, and BAAs (Business Associate Agreements).
- **HITECH Act (Health Information Technology for Economic and Clinical Health)**: NGEK TECH complies with HITECH breach notification requirements, enhanced penalties, and meaningful use standards for EHR (Electronic Health Record) systems.
- **FDA 21 CFR Part 11**: NGEK TECH is compliant with FDA requirements for electronic records and electronic signatures in pharmaceutical, biotechnology, and medical device applications.
- **HL7 FHIR (Fast Healthcare Interoperability Resources)**: NGEK TECH supports HL7 FHIR R4 standards for healthcare data exchange, enabling seamless interoperability between healthcare systems.
- **HITRUST CSF (Health Information Trust Alliance Common Security Framework)**: NGEK TECH aligns with HITRUST CSF for comprehensive healthcare security and compliance.
- **GDPR for Health Data**: NGEK TECH implements special category data protections under GDPR Article 9 for health-related personal data.
- **NHS DSP Toolkit (UK)**: NGEK TECH complies with NHS Data Security and Protection Toolkit requirements for UK healthcare providers.

NGEK TECH maintains dedicated healthcare compliance infrastructure with isolated environments for PHI processing.`,
  },
  {
    title: "Legal & eDiscovery Compliance",
    icon: Scale,
    content: `NGEK TECH supports legal industry compliance and litigation readiness:

- **ABA Model Rules (American Bar Association)**: NGEK TECH adheres to ABA Model Rules of Professional Conduct, particularly Rules 1.6 (Confidentiality) and 1.15 (Safekeeping Property) for legal technology solutions.
- **EDRM (Electronic Discovery Reference Model)**: NGEK TECH implements full EDRM lifecycle support including identification, preservation, collection, processing, review, analysis, production, and presentation of ESI (Electronically Stored Information).
- **Legal Hold Management**: NGEK TECH provides automated legal hold capabilities with custodian notifications, acknowledgment tracking, and defensible preservation protocols.
- **Attorney-Client Privilege Protection**: NGEK TECH implements technical controls to maintain and protect attorney-client privileged communications and work product.
- **GDPR Article 17 (Right to Erasure)**: NGEK TECH implements compliant data retention and deletion procedures that respect legal hold obligations and regulatory retention requirements.
- **FRCP Rules 26, 34, 37 (Federal Rules of Civil Procedure)**: NGEK TECH supports proportional discovery, ESI production formats, and sanctions avoidance protocols.
- **State Bar Requirements**: NGEK TECH complies with state-specific bar association requirements for legal technology and client data protection.

NGEK TECH provides audit trails, chain of custody documentation, and expert testimony support for litigation matters.`,
  },
  {
    title: "Travel & Hospitality Compliance",
    icon: Globe,
    content: `NGEK TECH maintains comprehensive travel industry compliance:

- **IATA NDC (New Distribution Capability)**: NGEK TECH is certified for IATA NDC Level 4, enabling modern airline retailing with rich content, personalized offers, and direct connect capabilities.
- **PNR Data Protection (Passenger Name Record)**: NGEK TECH complies with EU PNR Directive (2016/681), US CBP requirements, and bilateral PNR agreements for lawful data handling and retention limits.
- **APIS (Advance Passenger Information System)**: NGEK TECH implements secure APIS data transmission compliant with ICAO standards and destination country requirements.
- **ATPCO (Airline Tariff Publishing Company)**: NGEK TECH adheres to ATPCO ATPCO standards for fare filing, rules, and ancillary service data management.
- **GDS Compliance (Global Distribution Systems)**: NGEK TECH maintains compliance with Amadeus, Sabre, and Travelport connectivity and data handling requirements.
- **TSA/DHS Requirements (US)**: NGEK TECH complies with Transportation Security Administration and Department of Homeland Security requirements for travel technology providers.
- **EU Package Travel Directive**: NGEK TECH complies with EU Package Travel Directive (2015/2302) requirements for package holiday providers.
- **PCI DSS for Travel**: NGEK TECH implements PCI DSS specifically for travel merchant accounts and OTA (Online Travel Agency) payment processing.

NGEK TECH provides specialized compliance support for airlines, hotels, OTAs, TMCs, and travel technology providers.`,
  },
  {
    title: "Accessibility & Inclusivity",
    icon: Eye,
    content: `NGEK TECH is committed to digital accessibility:

- **WCAG 2.1 AA (Web Content Accessibility Guidelines 2.1 Level AA)**: NGEK TECH complies with Web Content Accessibility Guidelines for all web applications.
- **Section 508**: NGEK TECH complies with United States federal accessibility requirements.
- **ADA (Americans with Disabilities Act) Compliance**: NGEK TECH adheres to Americans with Disabilities Act digital accessibility standards.
- **EN 301 549**: NGEK TECH complies with European accessibility requirements for ICT (Information and Communications Technology) products and services.

NGEK TECH conducts regular accessibility audits and user testing with assistive technologies to ensure inclusive digital experiences.`,
  },
  {
    title: "Environmental & Social Governance (ESG)",
    icon: Globe,
    content: `NGEK TECH maintains strong ESG (Environmental, Social, and Governance) commitments:

- **Carbon Neutral Operations**: NGEK TECH commits to carbon-neutral hosting and operations.
- **UN SDGs (United Nations Sustainable Development Goals)**: NGEK TECH aligns with United Nations Sustainable Development Goals.
- **Ethical AI (Artificial Intelligence) Principles**: NGEK TECH adheres to responsible AI (Artificial Intelligence) development and deployment practices.
- **Supplier Code of Conduct**: NGEK TECH requires ESG (Environmental, Social, and Governance) compliance for all third-party vendors and partners.
- **Diversity & Inclusion**: NGEK TECH commits to diverse and inclusive workplace practices.

NGEK TECH provides annual ESG (Environmental, Social, and Governance) reports upon request.`,
  },
];

export default function Compliance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [showAllCities, setShowAllCities] = useState(false);

  const totalCities = Object.values(jurisdictions).flat().length;
  const totalCountries = Object.keys(jurisdictions).length;

  const featuredCities = [
    "New York City, USA",
    "Los Angeles, USA",
    "San Francisco, USA",
    "Chicago, USA",
    "Mumbai, India",
    "Delhi, India",
    "Bangalore, India",
    "London, UK",
    "Singapore",
    "Tokyo, Japan",
    "Sydney, Australia",
    "Dubai, UAE",
  ];

  return (
    <section id="compliance" className="py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Compliance & Regulatory.</span>
          </h2>
          <p className="text-[#666] text-lg max-w-3xl mx-auto">
            NGEK TECH maintains the highest standards of regulatory compliance across {totalCities.toLocaleString()}+ cities in {totalCountries} countries worldwide and ensures your business operates within all applicable legal frameworks.
          </p>
        </motion.div>

        {/* Industry Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["All", "Security", "Privacy", "FinTech", "Healthcare", "Legal", "Travel"].map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-[#666] border border-[#e5e5e5] hover:border-[#ff6b00] hover:text-[#ff6b00] transition-colors cursor-default"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Compliance Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-12">
          {complianceStandards.map((standard, index) => (
            <motion.div
              key={standard.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-3 shadow-sm border border-[#e5e5e5] text-center hover:shadow-md hover:border-[#ff6b00]/30 transition-all group"
            >
              <div className="w-10 h-10 gradient-bg rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
                <standard.icon size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a] text-xs mb-0.5 leading-tight">{standard.name}</h3>
              <p className="text-[9px] text-[#888] mb-1.5 leading-tight line-clamp-2">{standard.fullForm}</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-green-600 font-medium">
                <CheckCircle size={10} />
                {standard.status}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Key Jurisdictions Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-[#e5e5e5] mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Globe size={28} className="text-[#ff6b00]" />
              <div>
                <h3 className="text-xl font-bold text-[#1a1a1a]">Global Jurisdiction Coverage.</h3>
                <p className="text-sm text-[#666]">{totalCities.toLocaleString()} cities across {totalCountries} countries.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-[#ff6b00] font-medium">
              <MapPin size={16} />
              Worldwide Coverage
            </div>
          </div>

          <p className="text-[#666] mb-6">
            NGEK TECH is fully compliant with all local and global laws, regulations, and industry standards across major jurisdictions including:
          </p>

          {/* Featured Cities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
            {featuredCities.map((city) => (
              <div key={city} className="flex items-center gap-2 text-sm text-[#333] bg-[#f5f5f5] px-3 py-2 rounded-lg">
                <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                <span className="truncate">{city}</span>
              </div>
            ))}
          </div>

          {/* Show All Cities Dropdown */}
          <div className="border-t border-[#e5e5e5] pt-4">
            <button
              onClick={() => setShowAllCities(!showAllCities)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#fafafa] rounded-xl hover:bg-[#f0f0f0] transition-colors"
            >
              <span className="font-medium text-[#1a1a1a]">
                View All {totalCities.toLocaleString()} Cities in {totalCountries} Countries
              </span>
              {showAllCities ? (
                <ChevronUp size={20} className="text-[#666]" />
              ) : (
                <ChevronDown size={20} className="text-[#666]" />
              )}
            </button>

            <AnimatePresence>
              {showAllCities && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 max-h-96 overflow-y-auto space-y-2 pr-2">
                    {Object.entries(jurisdictions).map(([country, cities]) => (
                      <div key={country} className="border border-[#e5e5e5] rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedCountry(expandedCountry === country ? null : country)}
                          className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-[#fafafa] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="font-medium text-[#1a1a1a] text-sm">{country}</span>
                            <span className="text-xs text-[#666] bg-[#f5f5f5] px-2 py-0.5 rounded-full">
                              {cities.length} cities
                            </span>
                          </div>
                          {expandedCountry === country ? (
                            <ChevronUp size={16} className="text-[#666]" />
                          ) : (
                            <ChevronDown size={16} className="text-[#666]" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedCountry === country && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 py-3 bg-[#fafafa] border-t border-[#e5e5e5]">
                                <div className="flex flex-wrap gap-2">
                                  {cities.map((city) => (
                                    <span
                                      key={city}
                                      className="inline-flex items-center gap-1 text-xs text-[#333] bg-white px-2 py-1 rounded-lg border border-[#e5e5e5]"
                                    >
                                      {city}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 gradient-bg text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileCheck size={24} />
            View Full Regulatory & Compliance (FRC) Details.
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="gradient-bg p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield size={28} className="text-white" />
                  <div>
                    <h2 className="text-xl font-bold text-white">FRC (Full Regulatory & Compliance) Details.</h2>
                    <p className="text-white/80 text-sm">{totalCities.toLocaleString()} cities | {totalCountries} countries | {complianceStandards.length} certifications.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
                {/* Compliance Standards Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-[#ff6b00]" />
                    Compliance Standards & Certifications.
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {complianceStandards.map((standard) => (
                      <div key={standard.name} className="bg-[#f5f5f5] rounded-xl p-4 flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#ff6b00] rounded-lg flex items-center justify-center flex-shrink-0">
                          <standard.icon size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-[#1a1a1a]">{standard.name}</h4>
                            <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              <CheckCircle size={10} />
                              {standard.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#888] mb-1">{standard.fullForm}</p>
                          <p className="text-sm text-[#666]">{standard.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Regulatory Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                    <FileCheck size={20} className="text-[#ff6b00]" />
                    Detailed Regulatory Information.
                  </h3>
                  <div className="space-y-3">
                    {regulatoryDetails.map((detail, index) => (
                      <div key={detail.title} className="border border-[#e5e5e5] rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                          className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-[#fafafa] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <detail.icon size={18} className="text-[#ff6b00]" />
                            <span className="font-medium text-[#1a1a1a]">{detail.title}</span>
                          </div>
                          {expandedSection === index ? (
                            <ChevronUp size={18} className="text-[#666]" />
                          ) : (
                            <ChevronDown size={18} className="text-[#666]" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedSection === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 py-4 bg-[#fafafa] border-t border-[#e5e5e5]">
                                <div className="prose prose-sm max-w-none text-[#666]">
                                  {detail.content.split("\n\n").map((paragraph, pIndex) => (
                                    <p key={pIndex} className="mb-3 last:mb-0 whitespace-pre-line">
                                      {paragraph.split("**").map((part, partIndex) =>
                                        partIndex % 2 === 1 ? (
                                          <strong key={partIndex} className="text-[#1a1a1a]">
                                            {part}
                                          </strong>
                                        ) : (
                                          part
                                        )
                                      )}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Note */}
                <div className="bg-[#fff5eb] rounded-xl p-4 border-l-4 border-[#ff6b00]">
                  <p className="text-sm text-[#666]">
                    <strong className="text-[#1a1a1a]">Compliance Guarantee:</strong> NGEK TECH continuously monitors regulatory changes across all {totalCountries} operating jurisdictions and {totalCities.toLocaleString()}+ cities. Our legal and compliance teams ensure that all services remain compliant with evolving local and international regulations. For specific compliance inquiries, please contact{" "}
                    <a href="mailto:contact.adityapatange@gmail.com" className="text-[#ff6b00] hover:underline">
                      contact.adityapatange@gmail.com
                    </a>
                    .
                  </p>
                </div>

                {/* Last Updated */}
                <div className="mt-6 text-center text-xs text-[#999]">
                  <p>Last Updated: December 19, 2025.</p>
                  <p>Document Version: FRC-2025.12.002.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
