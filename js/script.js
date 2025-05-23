angular.module('blog', []);

angular.module('blog').controller('Rest', function($scope,$http){
    $http.get('https://api-fake-blog.onrender.com/postagens/').success(function(data){
        $scope.publicacoes=data;
    })
})


angular.module('blog').controller('PostagemController', function($scope, $http, $location) {
    // Obter ID da URL
    var query = $location.absUrl().split('?')[1];
    var id = null;
    if (query) {
        query.split('&').forEach(function(part) {
            var item = part.split('=');
            if (item[0] === 'id') id = parseInt(item[1]);
        });
    }

    // Buscar postagens
    $http.get('https://api-fake-blog.onrender.com/postagens/')
        .success(function(data) {
            console.log("Dados carregados:", data); // Debug
            console.log("ID solicitado:", id); // Debug

            if (id >= 0 && id < data.length) {
                $scope.postagem = data[id];
            } else {
                $scope.postagem = null;
            }
        })
        .error(function(err) {
            console.error("Erro ao carregar dados:", err);
        });
});

