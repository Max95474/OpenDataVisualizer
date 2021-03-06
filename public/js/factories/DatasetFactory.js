angular.module('main').factory('DatasetFactory', function($http, $q) {

    var allDatasets;
    var unitedDatasets;

    var datasetLoadedCallbacks = [];
    var datasetUploadedCallbacks = [];
    var currentDataset;

    function registerOnDatasetLoadedEvent(callback) {
        if(datasetLoadedCallbacks.indexOf(callback) == -1) {
            datasetLoadedCallbacks.push(callback);
        }
    }

    function notifyDatasetLoaded(dataset) {
        datasetLoadedCallbacks.forEach(function(callback) {
            callback(dataset);
        })
    }

    function registerOnDatasetUploadedEvent(callback) {
        if(datasetUploadedCallbacks.indexOf(callback) == -1) {
            datasetUploadedCallbacks.push(callback);
        }
    }

    function notifyDatasetUploadedCallback(dataset) {
        datasetUploadedCallbacks.forEach(function(callback) {
            callback(dataset);
        })
    }

    function getAllDatasets(callback) {
        $http({
            type: 'GET',
            url: '/api/dataset/all'
        }).then(function(resp) {
            if(!allDatasets || !angular.equals(unitedDatasets, resp.data)) {
                allDatasets = resp.data;
            }
            if(callback) {
                callback(allDatasets);
            }
        }, function(err) {
            console.log('Error: ');
            console.log(err);
        });
    }

    function getUnitedDataset(callback) {
        $http({
            type: 'GET',
            url: '/api/dataset/united'
        }).then(function(resp) {
            if(!unitedDatasets || !angular.equals(unitedDatasets, resp.data)) {
                unitedDatasets = resp.data;
                console.log('Updated datasets');
            }
            if(callback) {
                callback(unitedDatasets);
            }
        }, function(err) {
            console.log('Error: ');
            console.log(err);
        });
    }

    function loadDatasetFromUrl(url) {
        return $q(function(resolve, reject) {
            $http.post('/api/dataset/loadfromurl', {url: url}).then(function(resp) {
                notifyDatasetUploadedCallback(resp.data);
                resolve(resp.data);
            }).catch(function(err) {
                reject(err);
            })
        })
    }

    function getDatasetList() {
        return $q(function(resolve, reject) {
            $http.get('/api/dataset/list').then(function(resp) {
                resolve(resp.data);
            }).catch(function(err) {
                reject(err);
            })
        })
    }

    function getDatasetById(datasetId) {
        return $q(function(resolve, reject) {
            $http.get('/api/dataset/' + datasetId).then(function(resp) {
                notifyDatasetLoaded(resp.data);
                currentDataset = resp.data;
                resolve(resp.data);
            }).catch(function(err) {
                console.log(err);
                reject(err);
            })
        })
    }

    function updateDataset(dataset) {
        return $q(function(resolve, reject) {
            $http.post('/api/dataset/update/' + dataset.resource_id[0],{
                dataset: dataset
            }).then(function(resp) {
                notifyDatasetUploadedCallback(resp.data);
                resolve(resp);
            }).catch(function(err){ reject(err) })
        })
    }

    function getCurrentDataset() {
        return currentDataset;
    }

    function getExampleDatasets() {
        return exampleDatasets;
    }

    var exampleDataset1 = {"name": 'Лiкарнi', "help":"Search a datastore table. :param resource_id: id or alias of the data that is going to be selected.","success":true,"result":{"fields":[{"id":"Nazva likuvalnoho zakladu","type":"text"},{"id":"Nazva likarskoho zasobu","type":"text"},{"id":"Odynytsia vymiru","type":"text"},{"id":"Kilkist","type":"int"}],"resource_id":["c345edfe-b855-4f1d-b8db-a246dfc2da65"],"limit":5,"total":"113","records":[{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u0430 \u0440\u0430\u0439\u043e\u043d\u043d\u0430 \u043b\u0456\u043a\u0430\u0440\u043d\u044f ","Nazva likarskoho zasobu":"\u041f\u0430\u043f\u0430\u0432\u0435\u0440\u0456\u043d\u0430 \u0433/\u0445\u043b\u043e\u0440\u0438\u0434 20\u043c\u0433/ \u043c\u043b 2.0","Odynytsia vymiru":"\u0430\u043c\u043f","Kilkist":"50","feeds_flatitudestore_entry_id":"1","timestamp":"1456474962","feeds_entity_id":"398"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u0430 \u0440\u0430\u0439\u043e\u043d\u043d\u0430 \u043b\u0456\u043a\u0430\u0440\u043d\u044f ","Nazva likarskoho zasobu":"\u0415\u0443\u0444\u0456\u043b\u043b\u0456\u043d 2%- 5.0","Odynytsia vymiru":"\u0430\u043c\u043f","Kilkist":"100","feeds_flatitudestore_entry_id":"2","timestamp":"1456474962","feeds_entity_id":"398"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u0430 \u0440\u0430\u0439\u043e\u043d\u043d\u0430 \u043b\u0456\u043a\u0430\u0440\u043d\u044f ","Nazva likarskoho zasobu":"\u041a\u043e\u0440\u0434\u0456\u0430\u043c\u0456\u043d 250 \u043c\u0433/\u043c\u043b 2.0","Odynytsia vymiru":"\u0430\u043c\u043f","Kilkist":"110","feeds_flatitudestore_entry_id":"3","timestamp":"1456474962","feeds_entity_id":"398"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u0430 \u0440\u0430\u0439\u043e\u043d\u043d\u0430 \u043b\u0456\u043a\u0430\u0440\u043d\u044f ","Nazva likarskoho zasobu":"\u041d\u043e - \u0445 - \u0448\u0430","Odynytsia vymiru":"\u0430\u043c\u043f","Kilkist":"115","feeds_flatitudestore_entry_id":"4","timestamp":"1456474962","feeds_entity_id":"398"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u0430 \u0440\u0430\u0439\u043e\u043d\u043d\u0430 \u043b\u0456\u043a\u0430\u0440\u043d\u044f ","Nazva likarskoho zasobu":"\u0410\u0434\u0440\u0435\u043d\u0430\u043b\u0456\u043d 0,18%-1.0","Odynytsia vymiru":"\u0430\u043c\u043f","Kilkist":"15","feeds_flatitudestore_entry_id":"5","timestamp":"1456474962","feeds_entity_id":"398"}]}}
    var exampleDataset2 = {"name": 'Лiкарськi засоби',"help":"Search a datastore table. :param resource_id: id or alias of the data that is going to be selected.","success":true,"result":{"fields":[{"id":"Nazva likuvalnoho zakladu","type":"text"},{"id":"Nazva likarskoho zasobu","type":"text"},{"id":"Odynytsia vymiru","type":"text"},{"id":"Kilkist","type":"text"}],"resource_id":["85f801d9-4461-4c10-8fb1-18d3f3a9b932"],"limit":5,"total":"152","records":[{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440 \u043f\u0435\u0440\u0432\u0438\u043d\u043d\u043e\u0457 \u043c\u0435\u0434\u0438\u043a\u043e-\u0441\u0430\u043d\u0456\u0442\u0430\u0440\u043d\u043e\u0457 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438","Nazva likarskoho zasobu":"\u0430\u0434\u0440\u0435\u043d\u0430\u043b\u0438\u043d\u0430\u00a0 0,18% 1,0\u00a0 \u211610","Odynytsia vymiru":"\u0443\u043f","Kilkist":"3","feeds_flatitudestore_entry_id":"1","timestamp":"1456476662","feeds_entity_id":"401"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440 \u043f\u0435\u0440\u0432\u0438\u043d\u043d\u043e\u0457 \u043c\u0435\u0434\u0438\u043a\u043e-\u0441\u0430\u043d\u0456\u0442\u0430\u0440\u043d\u043e\u0457 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438","Nazva likarskoho zasobu":"\u0430\u043c\u043c\u0438\u0430\u043a \u0440-\u0440 10% 40\u043c\u043b","Odynytsia vymiru":"\u0444\u043b","Kilkist":"5","feeds_flatitudestore_entry_id":"2","timestamp":"1456476662","feeds_entity_id":"401"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440 \u043f\u0435\u0440\u0432\u0438\u043d\u043d\u043e\u0457 \u043c\u0435\u0434\u0438\u043a\u043e-\u0441\u0430\u043d\u0456\u0442\u0430\u0440\u043d\u043e\u0457 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438","Nazva likarskoho zasobu":"\u0430\u0441\u043a\u043e\u0440\u0431\u0438\u043d\u043e\u0432\u0430 \u043a-\u0441\u0442\u0430 5% 2\u043c\u043b \u211610","Odynytsia vymiru":"\u0443\u043f","Kilkist":"2","feeds_flatitudestore_entry_id":"3","timestamp":"1456476662","feeds_entity_id":"401"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440 \u043f\u0435\u0440\u0432\u0438\u043d\u043d\u043e\u0457 \u043c\u0435\u0434\u0438\u043a\u043e-\u0441\u0430\u043d\u0456\u0442\u0430\u0440\u043d\u043e\u0457 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438","Nazva likarskoho zasobu":"\u0430\u0441\u043f\u0430\u0440\u043a\u0430\u043c \u0430\u043c\u043f. 5\u043c\u043b \u211610","Odynytsia vymiru":"\u0443\u043f","Kilkist":"2","feeds_flatitudestore_entry_id":"4","timestamp":"1456476662","feeds_entity_id":"401"},{"Nazva likuvalnoho zakladu":"\u0426\u0435\u043d\u0442\u0440 \u043f\u0435\u0440\u0432\u0438\u043d\u043d\u043e\u0457 \u043c\u0435\u0434\u0438\u043a\u043e-\u0441\u0430\u043d\u0456\u0442\u0430\u0440\u043d\u043e\u0457 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u0438","Nazva likarskoho zasobu":"\u0430\u0442\u0440\u043e\u043f\u0438\u043d\u0430 \u0441\u0443\u043b\u044c\u0444\u0430\u0442 \u0430\u043c\u043f. 0,1% 1\u043c\u043b \u211610","Odynytsia vymiru":"\u0443\u043f","Kilkist":"19","feeds_flatitudestore_entry_id":"5","timestamp":"1456476662","feeds_entity_id":"401"}]}}
    var exampleDataset3 = {"name": "Пам'ятники 1 та 2 свiтових вiйн", "help":"Search a datastore table. :param resource_id: id or alias of the data that is going to be selected.","success":true,"result":{"fields":[{"id":"Nomer","type":"int"},{"id":"Kilkist","type":"int"},{"id":"Naimenovanie","type":"text"},{"id":"Location","type":"text"},{"id":"Mesce","type":"text"},{"id":"Data","type":"text"},{"id":"Data vidritya","type":"text"},{"id":"Avtor","type":"text"},{"id":"Material","type":"text"},{"id":"Osnovnie razmeri","type":"text"},{"id":"Kategoria","type":"text"},{"id":"Nomer rishenya","type":"int"},{"id":"Data rishenya","type":"text"},{"id":"latitude","type":"float"},{"id":"longitude","type":"float"}],"resource_id":["b7eb316b-2764-444f-a0c6-dd6afaeaf668"],"limit":5,"total":"221","records":[{"Nomer":"500","Kilkist":"1","Naimenovanie":"\u041f\u0430\u043c\u2019\u044f\u0442\u043d\u0438\u043a \u0432\u043e\u0457\u043d\u0430\u043c-\u043e\u0434\u043d\u043e\u0441\u0435\u043b\u044c\u0446\u044f\u043c, \u0437\u0430\u0433\u0438\u0431\u043b\u0438\u043c \u0432 \u0440\u043e\u043a\u0438 \u0412\u0435\u043b\u0438\u043a\u043e\u0457 \u0412\u0456\u0442\u0447\u0438\u0437\u043d\u044f\u043d\u043e\u0457 \u0432\u0456\u0439\u043d\u0438","Location":"\u0441. \u041d\u043e\u0432\u0456 \u041a\u0430\u043f\u043b\u0430\u043d\u0438","Mesce":"\u041d\u043e\u0432\u043e\u043a\u0430\u043f\u043b\u0430\u043d\u0456\u0432\u0441\u044c\u043a\u0430 \u0441/\u0440, \u0431\u0456\u043b\u044f \u0411\u0443\u0434\u0438\u043d\u043a\u0443 \u043a\u0443\u043b\u044c\u0442\u0443\u0440\u0438","Data":"1941-1945","Data vidritya":"1964","Avtor":"\u041e\u0434\u0435\u0441. \u0445\u0443\u0434. \u0432\u0438\u0440\u043e\u0431\u043d. \u043a\u043e\u043c\u0431\u0456\u043d\u0430\u0442 \u0425\u0443\u0434. \u0444\u043e\u043d\u0434\u0443 \u0423\u0420\u0421\u0420 ","Material":"\u043a\u0430\u043c\u0456\u043d\u044c-\u0447\u0435\u0440\u0435\u043f\u0430\u0448\u043d\u0438\u043a \u043e\u0446\u0435\u043c\u0435\u043d\u0442\u043e\u0432\u0430\u043d\u0438\u0439","Osnovnie razmeri":"\u043e\u0431\u0435\u043b\u0456\u0441\u043a - 3,5  \u0445  1,5  \u0445  1,5 \u043c","Kategoria":"\u043c\u0456\u0441\u0446\u0435\u0432\u0430","Nomer rishenya":"652","Data rishenya":"25-12-1984","latitude":"46.1887209","longitude":"29.37697","feeds_flatitudestore_entry_id":"1","timestamp":"1454873872","feeds_entity_id":"335"},{"Nomer":"431","Kilkist":"1","Naimenovanie":"\u041f\u0430\u043c\u2019\u044f\u0442\u043d\u0438\u043a \u0432\u043e\u0457\u043d\u0430\u043c-\u043e\u0434\u043d\u043e\u0441\u0435\u043b\u044c\u0446\u044f\u043c, \u0437\u0430\u0433\u0438\u0431\u043b\u0438\u043c \u0432 \u0440\u043e\u043a\u0438 \u0406 \u0441\u0432\u0456\u0442\u043e\u0432\u043e\u0457 \u0432\u0456\u0439\u043d\u0438","Location":"\u0441. \u041e\u0441\u0442\u0440\u0456\u0432\u043d\u0435","Mesce":"\u041e\u0441\u0442\u0440\u0456\u0432\u043d\u0435\u043d\u0441\u044c\u043a\u0430 \u0441/\u0440, \u0431\u0456\u043b\u044f \u0448\u043a\u043e\u043b\u0438","Data":"1914-1918","Data vidritya":"1936 1965","Avtor":"\u0430\u0432\u0442\u043e\u0440 -\u043d\u0435\u0432\u0456\u0434\u043e\u043c\u0438\u0439","Material":"\u043a\u0430\u043c\u0456\u043d\u044c-\u0447\u0435\u0440\u0435\u043f\u0430\u0448\u043d\u0438\u043a \u043e\u0446\u0435\u043c\u0435\u043d\u0442\u043e\u0432\u0430\u043d\u0438\u0439, \u043c\u0430\u0440\u043c\u0443\u0440","Osnovnie razmeri":"\u043e\u0431\u0435\u043b\u0456\u0441\u043a - 5,3  \u0445  2,2  \u0445  2,2 \u043c; \u0441\u0442\u0435\u043b\u0430 - 2,4  \u0445  2,3 \u043c; \u043c\u0435\u043c. \u0434\u043e\u0448\u043a\u0430 - 0,5  \u0445  0,5 \u043c","Kategoria":"\u043c\u0456\u0441\u0446\u0435\u0432\u0430","Nomer rishenya":"381","Data rishenya":"27-07-1971","latitude":"45.7520695","longitude":"29.0669003","feeds_flatitudestore_entry_id":"2","timestamp":"1454873872","feeds_entity_id":"335"},{"Nomer":"426","Kilkist":"1","Naimenovanie":"\u041c\u043e\u0433\u0438\u043b\u0430 \u0440\u0430\u0434\u044f\u043d\u0441\u044c\u043a\u043e\u0433\u043e \u0432\u043e\u0457\u043d\u0430 \u0422\u0432\u043e\u0440\u043e\u0432\u0441\u044c\u043a\u043e\u0433\u043e \u041c.\u0406., \u0449\u043e \u0437\u0430\u0433\u0438\u043d\u0443\u0432 \u043f\u0440\u0438 \u0432\u0438\u0437\u0432\u043e\u043b\u0435\u043d\u043d\u0456 \u0441\u0435\u043b\u0430 24 \u0441\u0435\u0440\u043f\u043d\u044f 1944","Location":"\u0441. \u041e\u0441\u0442\u0440\u0456\u0432\u043d\u0435","Mesce":"\u041e\u0441\u0442\u0440\u0456\u0432\u043d\u0435\u043d\u0441\u044c\u043a\u0430 \u0441/\u0440, \u043f\u0430\u0440\u043a","Data":"1944","Data vidritya":"1950","Avtor":"\u041e\u0434\u0435\u0441. \u0445\u0443\u0434. \u0432\u0438\u0440\u043e\u0431\u043d. \u043a\u043e\u043c\u0431\u0456\u043d\u0430\u0442 \u0425\u0443\u0434. \u0444\u043e\u043d\u0434\u0443 \u0423\u0420\u0421\u0420","Material":"\u043a\u0430\u043c\u0456\u043d\u044c-\u0447\u0435\u0440\u0435\u043f\u0430\u0448\u043d\u0438\u043a  \u043e\u0446\u0435\u043c\u0435\u043d\u0442\u043e\u0432\u0430\u043d\u0438\u0439, \u043c\u0430\u0440\u043c\u0443\u0440\u043e\u0432\u0430 \u043a\u0440\u0438\u0445\u0442\u0430","Osnovnie razmeri":"\u043c\u043e\u0433\u0438\u043b\u0430 - 1,3  \u0445  0,8 \u043c; \u0441\u0442\u0430\u0442\u0443\u044f - 2,8  \u0445  1,0  \u0445  0,8 \u043c; \u043f\u043e\u0441\u0442\u0430\u043c\u0435\u043d\u0442 - 2,5  \u0445  1,4 \u043c; \u043c\u0435\u043c. \u043f\u043b\u0438\u0442\u0430 - 1,0  \u0445  0,4 \u043c","Kategoria":"\u043c\u0456\u0441\u0446\u0435\u0432\u0430","Nomer rishenya":"381","Data rishenya":"27-07-1971",
        "latitude":"45.437631","longitude":"29.1568028","feeds_flatitudestore_entry_id":"3","timestamp":"1454873872","feeds_entity_id":"335"},{"Nomer":"501","Kilkist":"1","Naimenovanie":"\u041f\u0430\u043c\u2019\u044f\u0442\u043d\u0438\u043a \u0432\u043e\u0457\u043d\u0430\u043c \u0432\u0438\u0437\u0432\u043e\u043b\u0438\u0442\u0435\u043b\u044f\u043c \u0442\u0430 \u0432\u043e\u0457\u043d\u0430\u043c-\u043e\u0434\u043d\u043e\u0441\u0435\u043b\u044c\u0446\u044f\u043c, \u0437\u0430\u0433\u0438\u0431\u043b\u0438\u043c \u0432 \u0440\u043e\u043a\u0438 \u0412\u0435\u043b\u0438\u043a\u043e\u0457 \u0412\u0456\u0442\u0447\u0438\u0437\u043d\u044f\u043d\u043e\u0457 \u0432\u0456\u0439\u043d\u0438","Location":"\u0441. \u041e\u0441\u0442\u0440\u0456\u0432\u043d\u0435","Mesce":"\u041e\u0441\u0442\u0440\u0456\u0432\u043d\u0435\u043d\u0441\u044c\u043a\u0430 \u0441/\u0440, \u0446\u0435\u043d\u0442\u0440 \u0441\u0435\u043b\u0430","Data":"1941-1945","Data vidritya":"1975","Avtor":"\u041e\u0434\u0435\u0441. \u0445\u0443\u0434. \u0432\u0438\u0440\u043e\u0431\u043d. \u043a\u043e\u043c\u0431\u0456\u043d\u0430\u0442 \u0425\u0443\u0434. \u0444\u043e\u043d\u0434\u0443 \u0423\u0420\u0421\u0420","Material":"\u0437/\u0431\u0435\u0442\u043e\u043d, \u043a\u0430\u043c\u0456\u043d\u044c-\u0447\u0435\u0440\u0435\u043f\u0430\u0448\u043d\u0438\u043a \u043e\u0446\u0435\u043c\u0435\u043d\u0442\u043e\u0432\u0430\u043d\u0438\u0439","Osnovnie razmeri":"\u0441\u0442\u0430\u0442\u0443\u044f - 2,8  \u0445  1  \u0445  0,8 \u043c; \u043f\u043e\u0441\u0442\u0430\u043c\u0435\u043d\u0442 -  2,15  \u0445  1,4  \u0445  1,4 \u043c","Kategoria":"\u043c\u0456\u0441\u0446\u0435\u0432\u0430","Nomer rishenya":"652","Data rishenya":"25-12-1984","latitude":"45.4341887","longitude":"29.144593","feeds_flatitudestore_entry_id":"4","timestamp":"1454873872","feeds_entity_id":"335"},{"Nomer":"437","Kilkist":"1","Naimenovanie":"\u041f\u0430\u043c\u2019\u044f\u0442\u043d\u0438\u043a 125 \u0432\u043e\u0457\u043d\u0430\u043c -\u043e\u0434\u043d\u043e\u0441\u0435\u043b\u044c\u0446\u044f\u043c, \u0437\u0430\u0433\u0438\u0431\u043b\u0438\u043c \u0432 \u0440\u043e\u043a\u0438 \u0412\u0435\u043b\u0438\u043a\u043e\u0457 \u0412\u0456\u0442\u0447\u0438\u0437\u043d\u044f\u043d\u043e\u0457 \u0432\u0456\u0439\u043d\u0438 (\u0456\u0441\u0442., \u043c\u0438\u0441\u0442.))","Location":"\u0441. \u041f\u0430\u0432\u043b\u0456\u0432\u043a\u0430","Mesce":"\u041f\u0430\u0432\u043b\u0456\u0432\u0441\u044c\u043a\u0430 \u0441/\u0440, \u043f\u0440\u0438 \u0432\u2019\u0457\u0437\u0434\u0456 \u0432 \u0441\u0435\u043b\u043e","Data":"1941-1945","Data vidritya":"1965, 1975","Avtor":"\u0430\u0432\u0442\u043e\u0440 - \u041e.\u0421.\u0411\u043e\u043d\u0434\u0430-\u0440\u0435\u043d\u043a\u043e","Material":"\u2014","Osnovnie razmeri":"\u0441\u0442\u0430\u0442\u0443\u044f - 2,8  \u0445  1,25  \u0445  0,9 \u043c; \u043f\u043e\u0441\u0442\u0430\u043c\u0435\u043d\u0442 - 1,6  \u0445  2,0  \u0445  1,5 \u043c; \u0441\u0442\u0435\u043b\u0438 ( 2 ) - 13,3  \u0445  2,6  \u0445  0,8 \u043c, 12,0  \u0445  2,6  \u0445  0,9 \u043c","Kategoria":"\u043c\u0456\u0441\u0446\u0435\u0432\u0430","Nomer rishenya":"381","Data rishenya":"27-07-1971","latitude":"45.9653576", "longitude":"29.2016748", "feeds_flatitudestore_entry_id":"5","timestamp":"1454873872","feeds_entity_id":"335"}]}};
    var exampleDatasets = [exampleDataset1, exampleDataset2, exampleDataset3];
    console.log('Datasets: ', exampleDatasets);


    var datasetSeelctedCallbacks = [];

    function registerDatasetSelectedCb (cb) {
        datasetSeelctedCallbacks.push(cb)
    }

    function notifyDatasetSelected (data) {
        _.each(datasetSeelctedCallbacks, function (cb) { cb(data) });
    }

    return {
        registerOnDatasetLoadedEvent: registerOnDatasetLoadedEvent,
        getAllDatasets: getAllDatasets,
        getUnitedDataset: getUnitedDataset,
        getExampleDatasets: getExampleDatasets,
        getDatasetById: getDatasetById,
        getDatasetList: getDatasetList,
        loadDatasetFromUrl: loadDatasetFromUrl,
        updateDataset: updateDataset,
        registerDatasetSelectedCb: registerDatasetSelectedCb,
        notifyDatasetSelected: notifyDatasetSelected,
        registerOnDatasetUploadedEvent: registerOnDatasetUploadedEvent,
        notifyDatasetUploadedCallback: notifyDatasetUploadedCallback,
        getCurrentDataset: getCurrentDataset
    }
});