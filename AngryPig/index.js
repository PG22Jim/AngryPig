// Copyright (C) 2022 Jim Chen
// Date: 3/30/2022
// Angry Pig

// Use Debugger for Server testing 





import Prefab from './Script/prefabs.js'

//import Drag from './Script/Drag.js'


// Application Handler
class App {
    constructor( userid = 'test') {

        this.userid = 'JimChen';

        this.itemCount = 0;


        // Load the Library of prefabs
        this.prefabList = this.loadPrefabs();
        this.prefabList.forEach( $item => this.makeDraggable( $item ))

        // when div id: level-detail's sumit button is pressed, call onLevelSave event
        $("#level-detail").on('submit', event => this.onLevelSave( event ));
        
        $("#editor-area")
        .on('dragenter', event => { /* Nothing */})
        .on('dragover', event => {

            event.preventDefault();
            $(".obstacle").css({ 'cursor':'move'})

        })
        .on('dragleave', event => {})    
        .on('drop', event => this.onDrop(evnet));

    }

    loadPrefabs(){

        return [];
    }

    
    onLevelSave( event ) {
        // Handle form submission here
        event.preventDefault();

        // serializeArray from infos of level-detail id
        const formData = $('#level-detail').serializeArray();


        
        
        // serries of info to past to server.js    
        const request = {
            userid:'PG22Jim',
            name: formData["name"],
            file: "mySample",
            payload: formData
        };

        

        
        // post quest of Localhost:4000/get_level_list/JimChen with const request
        $.post('/get_level_list/JimChen', request )
        // recieve the responseSring and parse it
        .then( responseString => JSON.parse( responseString ))
        .then( response => {

            
            
            
            
            //getJSON to get the property of level_1.json    
            $.getJSON("./levels/level_1.json", function(json) {
            });


            console.log( response );
            if (!response.error) {
                alert("Order recieved!")
            }
        });
    }

    // initialize draggable div
    makeDraggable( $draggableThing){
        $draggableThing
            // when drag start event happens
            .on('dragstart', event =>{
                // drag data of x,y, and id of the dragging object
                const dragData = {
                    dx: event.offsetX,
                    dy: event.offsetY,
                    id: `#${event.target.id}`,

                };
                // JSON string of drag Data
                const somDataSting = JSON.stringify( dragData );
                event.originalEvent.dataTransfer.setData("text/plain", somDataSting)
                // 
            })
            .on('drag', event => {
                // Update css and therefore the stuff on screen
            })
            .on('dragend', event => {
                // disalbe/remove drag and dragend

            });

    }

    onDrop(){
        // Use the edit zone
        const dragData = this.#extractDraggableData( event);
        
        // What was dragged here
        const $draggable = $( dragData );
    
        let $obj = $draggable;
        if (!$draggable.hasClass("placed")){
            // if it doesn't have class "placed", create a new one
            $obj = $(`<div id="box-${this.itemCount++}" class="obstacle placed" draggable></div>`);
            $("#editor-area").append( $obj);

            //  attache the drag/drop handler to this object
            this.makeDraggable( $obj )
                    
        }

        // Set the final position on the moved div
        $obj.css({
            'height':$draggable.height(),
            'width':$draggable.width(),
            'background-image':$draggable.css('background-image')
        });
        $obj.offset({ left: event.clinetX - dragData.dx, top: event.clientY - dragData.dy })

    }

    #extractDraggableData( event) {
        const dragData = event.originalEvent.dataTransfer.getData("text/plain");
        return JSON.parse( dragData )
    }

}

// Main
const app = new App()




