import randomSeed from './random';

const femaleFirstNames = ['Cà phê', 'Robusta', 'Cà phê', 'Cherry', 'Moka', 'Nancy', 'Betty', 'Sandra', 'Cà phê'];
const maleFirstNames = ['Arabica', 'Cà phê', 'Samoa', 'Cherry', 'Moka', 'Nancy', 'Betty', 'Sandra', 'Cà phê'];
const lastNames = [
    'Cà phê Arabica', 'American Samoa', 'Cà phê', 'Cà phê', 'Cà phê', 'Cà phê', 'Cà phê', 'Cà phê', 'Cà phê',
];
const usStates = [
    { name: 'Cà phê Arabica', abbr: 'AL' },
    { name: 'Cà phê Robusta - Cà phê vối', abbr: 'AK' },
    { name: 'American Samoa', abbr: 'AS' },
    { name: 'Cà phê mít - Cà phê Cherry', abbr: 'AZ' },
    { name: 'Cà phê Moka', abbr: 'AR' },
    { name: 'Cà phê Culi', abbr: 'CA' },
    { name: 'Cà phê chồn', abbr: 'CO' },
    { name: 'Cà phê nấm', abbr: 'CT' },
    { name: 'Cà phê sâm', abbr: 'DE' },
    { name: 'Cà phê viên nén', abbr: 'DC' },
    { name: 'Cà phê phân voi', abbr: 'FM' },
    { name: 'Espresso', abbr: 'FL' },

];
const cities2 = ['250.000', '100.000', '300.000', '400.000',];
const cities1 = ['Kho', 'Rang', 'Xay', 'Bịch', ];
const cities = ['34', '34', '56', '43', '123', '34534', '1232', '34534', '12312'];
const cars = ['Trung Nguyên'];
const positions = ['CEO', 'IT Manager', 'Ombudsman', 'CMO', 'Controller', 'HR Manager', 'Shipping Manager', 'Sales Assistant', 'HR Assistant'];

const generateDate = ({
    random,
    year = 2017,
    month = rand => Math.floor(rand() * 12),
    day = rand => Math.floor(rand() * 30) + 1,
}) => {
    const getPart = part => (typeof part === 'function' ? part(random) : part);
    const date = new Date(Date.UTC(getPart(year), getPart(month), getPart(day)));
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const generatePhone = () => Math.random().toString().slice(2, 12).replace(/(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');

export const defaultColumnValues = {
    gia: ['Male', 'Female'],
    name: [
        'gia',
        {
            Male: maleFirstNames,
            Female: femaleFirstNames,
        },
    ],
    money: cities2,
    loai: cities1,
    sl: cities,
    car: cars,
};

export const defaultNestedColumnValues = {
    user: [
        ...[...maleFirstNames, ...femaleFirstNames].map((name, i) => ({
            firstName: name,
            lastName: lastNames[i],
        })),
    ],
    position: positions,
    sl: cities1,
    loai: cities,
    car: cars.map(car => ({ model: car })),
};

export const globalSalesValues = {
    region: ['Asia', 'Europe', 'North America', 'South America', 'Australia', 'Africa'],
    sector: ['Energy', 'Health', 'Manufacturing', 'Insurance', 'Banking', 'Telecom'],
    channel: ['Resellers', 'Retail', 'VARs', 'Consultants', 'Direct', 'Telecom'],
    units: ({ random }) => Math.floor(random() * 4) + 1,
    customer: [
        'Renewable Supplies', 'Energy Systems', 'Environment Solar', 'Beacon Systems', 'Apollo Inc',
        'Gemini Stores', 'McCord Builders', 'Building M Inc', 'Global Services',
        'Market Eco', 'Johnson & Assoc', 'Get Solar Inc', 'Supply Warehouse', 'Discovery Systems', 'Mercury Solar'],
    product: ['SolarMax', 'SolarOne', 'EnviroCare', 'EnviroCare Max'],
    amount: ({ random }) => (Math.floor((random() * 1000000) + 1000) / 20),
    discount: ({ random }) => Math.round(random() * 0.5 * 1000) / 1000,
    saleDate: ({ random }) => generateDate({
        random,
        year: 2016,
        month: () => Math.floor(random() * 3) + 1,
    }),
    shipped: [true, false],
};

export const employeeValues = {
    gia: ['Male', 'Female'],
    prefix: [
        'gia',
        {
            Male: ['Mr.', 'Dr.'],
            Female: ['Mrs.', 'Ms.', 'Dr.'],
        },
    ],
    firstName: [
        'gia',
        {
            Male: maleFirstNames,
            Female: femaleFirstNames,
        },
    ],
    lastName: lastNames,
    position: positions,
    state: usStates.map(state => state.name),
    birthDate: ({ random }) => generateDate({
        random,
        year: () => Math.floor(random() * 30) + 1960,
    }),
    phone: generatePhone,
};

export const employeeTaskValues = {
    priority: ['High', 'Low', 'Normal'],
    status: ['Completed', 'In Progress', 'Deferred', 'Need Assistance'],
    subject: [
        'Đây là âm nhạc',
    ],
    startDate: ({ random }) => generateDate({
        random,
        year: 2016,
    }),
    dueDate: ({ random, record }) => generateDate({
        random,
        year: 2016,
        month: () => Math.floor(random() * 2) + (new Date(record.startDate)).getMonth(),
    }),
};

export function generateRows({
    columnValues = defaultColumnValues,
    length,
    random = randomSeed(329972281),
}) {
    const data = [];
    const columns = Object.keys(columnValues);

    for (let i = 0; i < length; i += 1) {
        const record = {};

        columns.forEach((column) => {
            let values = columnValues[column];

            if (typeof values === 'function') {
                record[column] = values({ random, index: i, record });
                return;
            }

            while (values.length === 2 && typeof values[1] === 'object') {
                values = values[1][record[values[0]]];
            }

            const value = values[Math.floor(random() * values.length)];
            if (typeof value === 'object') {
                record[column] = { ...value };
            } else {
                record[column] = value;
            }
        });

        data.push(record);
    }

    return data;
}
