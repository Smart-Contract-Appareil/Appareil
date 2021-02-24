var categorie = {
    Cold : ['Armoire à température négative','Armoire à température positive','Cellule de refroidissement'],
    Hot : ['Grill','Plaques','Four','Chauffe assiette','Bain Marie'],
    AC : ['Ventilateur','Climatiseur','VMC']
}

var cat_select = document.getElementById('cat_select');
var type_select = document.getElementById('type_select');

cat_select.addEventListener('change',function(){

    var selected_option = categorie[this.value];

    while(type_select.options.length>0){
        type_select.options.remove(0);
    }

    Array.from(selected_option).forEach(function(el){
        let option = new Option(el, el);
        type_select.appendChild(option);

    });
});
