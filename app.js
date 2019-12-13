// hometask - table

const map = ["_id", "name", "isActive", "balance"];
const users = [
    {
        "_id": "5d220b10e8265cc978e2586b",
        "isActive": true,
        "balance": 2853.33,
        "age": 20,
        "name": "Buckner Osborne",
        "gender": "male",
        "company": "EMPIRICA",
        "email": "bucknerosborne@empirica.com",
        "phone": "+1 (850) 411-2997",
        "registered": "2018-08-13T04:28:45 -03:00",
        "nestedField": { total: 300 }
    },
    {
        "_id": "5d220b10144ef972f6c2b332",
        "isActive": true,
        "balance": 1464.63,
        "age": 38,
        "name": "Rosalie Smith",
        "gender": "female",
        "company": "KATAKANA",
        "email": "rosaliesmith@katakana.com",
        "phone": "+1 (943) 463-2496",
        "registered": "2016-12-09T05:15:34 -02:00",
        "nestedField": { total: 400 }
    },
    {
        "_id": "5d220b1083a0494655cdecf6",
        "isActive": false,
        "balance": 2823.39,
        "age": 40,
        "name": "Estrada Davenport",
        "gender": "male",
        "company": "EBIDCO",
        "email": "estradadavenport@ebidco.com",
        "phone": "+1 (890) 461-2088",
        "registered": "2016-03-04T03:36:38 -02:00",
        "nestedField": { total: 200 }
    },
];

const tableSchema = {
    index: '#',
    name: 'Name',
    email: 'Email',
    gender: 'Gender',
    company: 'Company',
    balance: 'Balance',
}

// Начнем с создания шапки таблицы. Функции будут возвращать DOM-элементы
// эта функция принимает в себя схему таблицы (tableSchema)
function generateThead(tableSchema) {
    const thead = document.createElement('thead');
    // далее нужно создать tr
    const tr = generateTr(tableSchema, 'th');
    thead.appendChild(tr);
    return thead;
}

// принимает в себя схему таблицы и имя тега
function generateTr(tableSchema, tagName = 'td') {
    // она будет создавать одну tr
    const tr = document.createElement('tr');
    Object.values(tableSchema).forEach(val => {
        const td = document.createElement(tagName);
        td.textContent = val;
        tr.appendChild(td);
    }); // получаем все значения из таблицы. На каждой итерации мы будем получать одно значение, на его основе мы будем создавать одну td, добавлять в нее контент и в tr апендить вновь созданную td
    return tr; // возвращаем эту tr наружу
}

// пишем функцию, которая будет создавать тело
function generateTbody(tableSchema, items) {
    const tbody = document.createElement('tbody');
    items.forEach((item, index) => {
        // для каждого usera мы будем собирать схему, по которой он должен создаваться и потом ее будем передавать в функцию generateTr и он на ее основе сгенерирует один row и вернет нам ее
        item.index = index + 1; // создаем каждому элементу индекс, чтобы не начинался с нуля
        const itemSchema = generateItemsSchema(tableSchema, item);

        // на основе схемы создаем tr
        const tr = generateTr(itemSchema, 'td');
        tbody.appendChild(tr);        
    });
    return tbody;
}

function generateItemsSchema(tableSchema, item) {
    const itemSchema = Object.keys(tableSchema).reduce((acc, key) => {
        // бедм проверять, что, если внутри item есть такой ключ, как в table-схеме, то мы в acc добавляем под этим ключом item
        if (key in item) {
            acc[key] = item[key];
        }
        return acc;
    }, {});
    // используем reduce, когда хотим создать новые формы из старых

    return itemSchema;
}

// функция будет генерировать шаблон (создавать), тег table, возвращать этот тег
function generateTableTemplate() {
    // теперь нужно создать саму таблицу и ее вернуть
    const table = document.createElement('table');
    table.classList.add('table'); // создаем класс таблицы
    return table;
}

// функция генерирует balance
function generateTotalBalance(tableSchema, items) {
    // считаем общее кол-во балансов всех пользователей
    const total = items.reduce((acc, item) => acc + parseFloat(item.balance), 0);

    const tr = document.createElement('tr');
    const td = document.createElement('td');

    // добавляем атрибуты callspan (позволяет нам растянуть td на кол-во колонок, на которое мы хотим)
    const columnCounts = Object.keys(tableSchema).length;

    // td добавляем шаблон
    td.insertAdjacentHTML('beforeend', `Total balance: <b>${total}</b>`);
    td.setAttribute('colspan', columnCounts);
    td.setAttribute('align', 'right');

    tr.appendChild(td);
    return tr;
}

// эта функция как точка входа, с которой будет все начинаться
function initTable(tableSchema, items) {
    // мы долдны найти контейнер, в который будем собирать нашу таблицу
    const container = document.querySelector('.table-container');
    const table = generateTableTemplate();
    const header = generateThead(tableSchema);
    const body = generateTbody(tableSchema, items);
    const total = generateTotalBalance(tableSchema, items);

    // теперь нужно header добавить в таблицу
    table.appendChild(header);

    // добавляем body в таблицу
    table.appendChild(body);

    // добавляем в таблицу tr с total
    table.appendChild(total);

    // добавляем таблицу в контейнер
    container.appendChild(table);
}

// будет собирать все в единую таблицу
initTable(tableSchema, users);