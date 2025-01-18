const API_BASE_URL = 'https://api.rawg.io/api';
const API_KEY = import.meta.env.VITE_API_KEY;

const GENRES = [
    { id: 4, name: 'Acción' },
    { id: 51, name: 'Indie' },
    { id: 3, name: 'Aventura' },
    { id: 5, name: 'RPG' },
    { id: 10, name: 'Estrategia' },
    { id: 2, name: 'Shooter' },
    { id: 40, name: 'Casual' },
    { id: 14, name: 'Simulación' },
    { id: 7, name: 'Puzzle' },
    { id: 11, name: 'Arcade' },
    { id: 83, name: 'Plataforma' },
    { id: 1, name: 'Carreras' },
    { id: 59, name: 'Multijugador' },
    { id: 15, name: 'Deportes' }
];

const PLATFORMS = [
    { id: 4, name: 'PC' },
    { id: 187, name: 'PlayStation 5' },
    { id: 186, name: 'Xbox Series X|S' },
    { id: 7, name: 'Nintendo Switch' },
    { id: 18, name: 'PlayStation 4' },
    { id: 1, name: 'Xbox One' },
    { id: 3, name: 'iOS' },
    { id: 21, name: 'Android' },
    { id: 5, name: 'macOS' }
];

const AGE_CATEGORIES = [
    { value: 'new', label: 'Nuevo (últimos 2 años)' },
    { value: 'recent', label: 'Reciente (2 a 5 años)' },
    { value: 'not_that_old', label: 'No tan viejo (5 a 10 años)' },
    { value: 'ancient', label: 'Antiguo (más de 10 años)' },
];

const QUALITY_CATEGORIES = [
    { value: 'excellent', label: 'Excelente' },
    { value: 'good', label: 'Bueno' },
    { value: 'okay', label: 'Aceptable' },
    { value: 'any', label: 'Cualquiera' },
];

export { API_BASE_URL, API_KEY, GENRES, PLATFORMS, AGE_CATEGORIES, QUALITY_CATEGORIES };