// const CONNECITON_URL = "http://universities.hipolabs.com";
const CONNECITON_URL =
    "http://universities.hipolabs.com/search?country={searched-country}";

const input = document.getElementById("input");
const buttonSend = document.getElementById("button__send");
const buttonReset = document.getElementById("button__reset");
const table = document.getElementById("table");
const counter = document.getElementById("counter");

const saveData = (data) => {
    localStorage.setItem("institute_data", JSON.stringify(data));
};

const getData = () => {
    const stringData = localStorage.getItem("institute_data");
    return JSON.parse(stringData);
};

let searchText = "ukraine";
input.value = searchText;
const allData = getData() ?? [];
console.log(allData);

const mockData = {
    alpha_two_code: "TR",
    country: "Turkey",
    domains: ["metu.edu.tr", "metu.edu.tr"],
    name: "Middle East Technical University",
    "state-province": null,
    web_pages: ["http://www.metu.edu.tr/", "http://www.metu.edu.tr/"],
};

const createElement = (html = "", type = "span") => {
    const elem = document.createElement(type);
    elem.append(html);
    return elem;
};

const createA = (html, href) => {
    const a = document.createElement("a");
    a.append(html);
    a.href = href;
    return a;
};
const showCount = (data = allData) => {
    const count = getCountChecker(data);
    counter.innerText = `Selected count: ${count}`;
};

const hideCount = () => {
    counter.innerHTML = "";
};

const createTableRowTH = () => {
    const tr = document.createElement("tr");

    tr.appendChild(createElement("index", "th"));
    tr.appendChild(createElement("aTwoCode", "th"));
    tr.appendChild(createElement("country", "th"));
    tr.appendChild(createElement("domains", "th"));
    tr.appendChild(createElement("name", "th"));
    tr.appendChild(createElement("stateProvince", "th"));
    tr.appendChild(createElement("webPages", "th"));
    tr.append(createElement("Checked", "th"));

    return tr;
};

const createTableRow = (
    index,
    alphaTwoCode,
    country,
    domains,
    name,
    stateProvince,
    webPages,
    checked = false
) => {
    const tr = document.createElement("tr");

    tr.appendChild(createElement(index + 1, "td"));
    tr.appendChild(createElement(alphaTwoCode, "td"));
    tr.appendChild(createElement(country, "td"));
    const links = document.createElement("div", "td");
    domains.forEach((domain) => {
        const link = createElement(domain);
        links.appendChild(link);
    });
    tr.appendChild(createElement(links, "td"));
    tr.appendChild(createElement(name, "td"));
    tr.appendChild(createElement(stateProvince, "td"));
    const pages = document.createElement("div", "td");
    webPages.forEach((page) => {
        const link = (page, page);
        pages.appendChild(createA(link, link));
    });
    tr.appendChild(createElement(pages, "td"));
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.addEventListener("change", handleRowCheck);
    tr.appendChild(createElement(checkbox, "td"));

    return tr;
};

const showUniversityTable = (listData = allData) => {
    table.innerHTML = "";

    const rowTH = createTableRowTH();
    table.appendChild(rowTH);

    listData.forEach((data, index) => {
        const row = createTableRow(
            (index = index),
            (alphaTwoCode = data["alpha_two_code"] || "Не знайдено"),
            (country = data["country"] || "Не знайдено"),
            (domains = data["domains"] || "Не знайдено"),
            (name = data["name"] || "Не знайдено"),
            (stateProvince = data["state-province"] || "Не знайдено"),
            (webPages = data["web_pages"] || "Не знайдено"),
            data.checked
        );
        table.appendChild(row);
    });
};

const addUniversityData = (data) => {
    allData.length = 0;
    allData.push(...data);

    if (allData.length > 0) {
        showUniversityTable(allData);
        showCount(allData);
        saveData(allData);
    } else {
        table.innerHTML = "За запитом нічого не знайдено";
    }
};

const fetchUniverityData = (url = CONNECITON_URL, resolve, reject) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
};

const getCountChecker = (data = allData) => {
    if (data.length == 0) return 0;
    const count = data.reduce(
        (prev, curr) => (curr.checked ? prev + 1 : prev),
        0
    );

    return count;
};
function handleInputChange(e) {
    searchText = e.target.value;
}

function handleSendButtonClick() {
    const url = CONNECITON_URL.replace("{searched-country}", searchText);
    fetchUniverityData(url, addUniversityData, (error) => {
        alert(error);
    });
}

function handleResetButtonClick() {
    table.innerHTML = "";
    hideCount();
    allData.length = 0;
    saveData(allData);
}

function handleRowCheck(e) {
    const isChecked = e.path[0].checked;
    const index = e.path[2].firstChild.innerHTML - 1;
    allData[index].checked = isChecked;
    saveData(allData);
    showCount(allData);
}

input.addEventListener("change", handleInputChange);
buttonSend.addEventListener("click", handleSendButtonClick);
buttonReset.addEventListener("click", handleResetButtonClick);

if (allData.length > 0) {
    showUniversityTable();

    showCount(allData);
}
