export default class Drag {


    constructor() {

        // variables of queryselector from class drag, myDraggableElement, drop-area
        let dragDiv = document.querySelector('.drag');
        let dragTitle = dragDiv.querySelector('.myDraggableElement') || dragDiv;
        let dropArea = document.querySelector('.drop-area');
        
        // Array of offsets
        let area = {
            left: dropArea.offsetLeft,
            right: dropArea.offsetLeft + dropArea.offsetWidth - dragDiv.offsetWidth,
            top: dropArea.offsetTop,
            bottom: dropArea.offsetTop + dropArea.offsetHeight - dragDiv.offsetHeight,
        };

        // initialize the start position
        let startX = 0;
        let startY = 0;

        // event listener of calling drag start when mouse button is pressing on drag title( div class myDraggableElement)
        dragTitle.addEventListener('mousedown', dragStart);

        // function of drag start
        function dragStart(e) {
            e.preventDefault();
            // Record previous position of draggable element
            startX = e.clientX - dragDiv.offsetLeft;
            startY = e.clientY - dragDiv.offsetTop;
            
            // event listener of calling move function when mouse is moving
            document.addEventListener('mousemove', move);

            // event listener of calling stop function when mouse  button is released
            document.addEventListener('mouseup', stop);
        }

        function move(e) {
            // calculate distance between current position and top right corner of the area div.
            x = e.clientX - startX;
            y = e.clientY - startY;
            x = Math.max(Math.min(x, area.right), area.left);
            y = Math.max(Math.min(y, area.bottom), area.top);
            dragDiv.style.left = x + 'px';
            dragDiv.style.top = y + 'px';
        }

        function stop() {
            // delete move and stop event listener when mouse button is released
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', stop)
        }
    }
}