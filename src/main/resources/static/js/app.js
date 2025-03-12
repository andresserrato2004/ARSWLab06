const app = (function () {
    let authorName = "";
    let blueprints = [];

    //función para la lista de planos
    const updateBlueprints = function (author){
        authorName = author;
        apimock.getBlueprintsByAuthor(author, function (data){
            blueprints = data.map(bp => ({ name: bp.name, points: bp.points.length}));
            renderBlueprints();
        });
    };

    //función para mostrar la lista de datos en la tabla
    const renderBlueprints = function (author) {
        const tableBody = $("#blueprintTable tbody");
        tableBody.empty();

        blueprints.forEach(bp => {
            tableBody.append(
                `<tr>
                    <td>${bp.name}</td>
                    <td>${bp.points}</td>
                    <td><button class="btn btn-primary open-btn" data-name="${bp.name}">Open</button></td>
                </tr>`
            );
        });

        const totalPoints = blueprints.reduce((sum, bp) => sum + bp.points, 0);
        $(".blueprints-list h3").text(`Total user points: ${totalPoints}`);
    };

    const showBlueprint = function (name){
        const  blueprint = blueprints.find(bp => bp.name === name);
        if(blueprint){
            $(".current-blueprint h2").text(`Current blueprint: ${name}`);
            $(".blueprint-display").text(`{Blueprint imagen for ${name}`);
        }
    }

    return{
        setAuthor: function (author){
            updateBlueprints(author);
        },

        init: function () {
            $("button").click(function (){
                const  author = $("#author").val();
                app.setAuthor(author);
            })
        }
    };
})();

$(document).ready(function (){
    $("#getBlueprintsBtn").click(function () {
        const author = $("#author").val();
        app.setAuthor(author);
    });
})