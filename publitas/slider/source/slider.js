(function (window) {

var Slider = {
    /**
     * Renders image slider on the provided canvas.
     * @param {HTMLCanvasElement} canvas Canvas element
     * @param {String[]} images Array of image URLs
     * @param {Object} options
     */
    render(canvas, images, options) {
        // Extends options with its defaults.
        var options = Object.assign({ // eslint-disable-line no-redeclare
            dragActiveClass: 'drag-active',
            backgroundColor: '#ccc',
            nextImageLoadThreshold: 30
        }, options);

        // Define slider viewport dimensisons.
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var context = canvas.getContext('2d');

        // True, if user is flipping through images.
        var isDragging = false;

        // Current grab position.
        // Defines horizontal offset of the image sequence.
        var grabPosition = 0;

        // Queue of the slider images URLs.
        // Images load in lazy way — images requested one by one, while
        // user flipping through slider.
        var availableImages = [].concat(images);
        var imageElements = [];

        // Get the first image from the queue and draw it on the canvas.
        var imageElement = new Image();
        imageElement.src = availableImages.shift();
        imageElements.push(imageElement);
        imageElement.addEventListener('load', () => {
            draw();
        });

        /**
         * Main draw subroutine. Successively draws images from the list
         * on the canvas, fitting them in the viewport. Make recursive calls
         * if is dragging slider.
         */
        function draw() {
            var imageOffset = grabPosition;
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            imageElements.forEach(image => {
                var imageWidth;
                var imageHeight;
                if (image.width > image.height) {
                    imageWidth = canvasWidth;
                    imageHeight = canvasWidth * image.height / image.width;
                } else {
                    imageWidth = canvasHeight * image.width / image.height;
                    imageHeight = canvasHeight;
                }
                context.fillStyle = options.backgroundColor;
                context.fillRect(imageOffset, 0, canvasWidth, canvasHeight);
                context.drawImage(
                    image,
                    imageOffset + (canvasWidth - imageWidth) / 2,
                    (canvasHeight - imageHeight) / 2,
                    imageWidth,
                    imageHeight
                );
                imageOffset += canvasWidth;
            });

            // If there is image on the laod queue and current position
            // of the slider is near the right corener, put image from the queue
            // on the list.
            if (availableImages.length
                && canvasWidth * (imageElements.length - 1) + grabPosition < options.nextImageLoadThreshold) {
                var imageElement = new Image();
                imageElement.src = availableImages.shift();
                imageElements.push(imageElement);
            }

            if (isDragging) {
                window.requestAnimationFrame(draw);
            }
        }

        // Attach mouse event handlers.

        /**
         * Handle drag action on the slider.
         * Refine the current grab position.
         * @param {MouseEvent} event
         */
        function onDrag(event) {
            grabPosition = Math.min(grabPosition + event.movementX, 0);
            grabPosition = Math.max(grabPosition, -canvasWidth * (imageElements.length - 1));
        }

        /**
         * Stops the drag action.
         */
        function stopDragging() {
            document.removeEventListener('mousemove', onDrag);
            isDragging = false;
            canvas.classList.remove(options.dragActiveClass);
        }

        // On mouse down over the canvas starts the drag action.
        canvas.addEventListener('mousedown', () => {
            isDragging = true;
            canvas.classList.add(options.dragActiveClass);
            document.addEventListener('mousemove', onDrag);
            draw();
        });

        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('mouseleave', stopDragging);
    }
};

window.Slider = Slider;

})(window);
