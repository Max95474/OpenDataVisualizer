angular.module('main').controller('dataController', function(DatasetFactory) {
    var vm = this;
    DatasetFactory.getUnitedDatasets(function(data) {
        vm.dataset = data;
    });

});