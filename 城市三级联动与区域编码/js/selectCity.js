const prov = document.getElementById('prov');
const city = document.getElementById('city');
const country = document.getElementById('country');
const addressnumber = document.getElementById('addressnumber')

/*用于保存当前所选的省市区*/
let current = {
    prov: '',
    city: '',
    country: ''
};


/*自动加载省份列表*/
(function showProv() {
    for (let key in cityList) {
        let provOpt = document.createElement('option');
        provOpt.innerText =provOpt.value= key;
        prov.appendChild(provOpt);
    }
})();

/*根据所选的省份来显示城市列表*/
function showCity(obj) {
    let val = obj.options[obj.selectedIndex].value;
    if (val != current.prov) {
        current.prov = val;
        country.length = 1;
        city.length = 1;
        addressnumber.innerHTML = addressnumber.value='';
    }

    if (val != '') {
        for (let key in cityList[current.prov]['city']) {
            let cityOpt = document.createElement('option');
            cityOpt.innerText = cityOpt.value = key;
            city.appendChild(cityOpt);
        }
    }
}

/*根据所选的城市来显示县区列表*/
function showCountry(obj) {
    let val = obj.options[obj.selectedIndex].value;
    if (val != current.city) {
        current.city = val;
        addressnumber.innerHTML = addressnumber.value='';
        country.length = 1; //清空之前的内容只留第一个默认选项
    }
    if (val != '') {
        for (const key in cityList[current.prov]['city'][current.city]['country']) {
            const countryOpt = document.createElement('option');
            countryOpt.innerText =countryOpt.value = key
            country.appendChild(countryOpt);
        }
    }
}

/*选择县区之后的处理函数*/
function selecCountry(obj) {
    current.country = obj.options[obj.selectedIndex].value;
    if (current.prov != '' && current.city != '' && current.country != '') {
        addressnumber.innerHTML = addressnumber.value = cityList[current.prov]['city'][current.city]['country'][current.country]['code'];
    }
}