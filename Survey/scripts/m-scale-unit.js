// define(['o-question'], function (oQuestion) {
//     function mScaleUnit(id, group) {
//         oQuestion.call(this, id, group);

//         // Initialize properties
//         this.unit = null;
//         this.activeUnit = null;

//         // Fetch and store properties, then initialize scale units
//         this.fetchAndInitializeProperties(group);
//     }

//     mScaleUnit.prototype = Object.create(oQuestion.prototype);
//     mScaleUnit.prototype.constructor = mScaleUnit;

//     mScaleUnit.prototype.fetchAndInitializeProperties = function(group) {
//         var properties = this.fetchProperties(group);
//         if (properties) {
//             this.unit = properties.unit;
//             this.activeUnit = properties.activeUnit;
//             this.initializeScaleUnits();
//         }
//     };

//     mScaleUnit.prototype.fetchProperties = function(group) {
//         return app.getProperties(group);
//     };

//     mScaleUnit.prototype.initializeScaleUnits = function() {
//         var self = this;
//         var scaleUnits = document.querySelectorAll('.o-scale-unitcontainer .m-scale-unit');
//         scaleUnits.forEach(function(unit) {
//             var value = unit.getAttribute('data-value');
//             var imgElement = unit.querySelector('.a-image-multistate');
            
//             if (imgElement) {
//                 // Set the default image and alt for each scale unit based on the value
//                 if (value === '1' && self.unit) { 
//                     imgElement.src = self.unit.image;
//                     imgElement.alt = 'Scale Icon ' + value; 
//                 }
                
//                 unit.querySelector('input[type="checkbox"]').addEventListener('change', function() {
//                     if (this.checked) {
//                         imgElement.src = self.activeUnit.image; 
//                     } else {
//                         imgElement.src = self.unit.image; 
//                     }
//                 });
//             }
//         });
//     };

//     return mScaleUnit;
// });


define(['o-question'], function (oQuestion) {
    function mScaleUnit(id, group) {
        oQuestion.call(this, id, group);

        // Initialize properties
        this.unit = null;
        this.activeUnit = null;

        // Fetch and store properties, then initialize scale units
        this.fetchAndInitializeProperties(group);
    }

    mScaleUnit.prototype = Object.create(oQuestion.prototype);
    mScaleUnit.prototype.constructor = mScaleUnit;

    mScaleUnit.prototype.fetchAndInitializeProperties = function(group) {
        var properties = this.fetchProperties(group);
        if (properties) {
            this.unit = properties.unit;
            this.activeUnit = properties.activeUnit;
            this.ensureScaleUnitContainerExists();
            this.initializeScaleUnits();
        }
    };

    mScaleUnit.prototype.ensureScaleUnitContainerExists = function() {
        var container = document.querySelector('.o-scale-unitcontainer');
        if (!container) {
            var scale = document.querySelector('.o-question-scale-horizontal');
            container = document.createElement('div');
            container.className = 'o-scale-unitcontainer';
            scale.appendChild(container);
        }
        this.container = container;
    };

    mScaleUnit.prototype.fetchProperties = function(group) {
        return app.getProperties(group);
    };

    mScaleUnit.prototype.initializeScaleUnits = function() {
        var self = this;
        var scaleUnits = this.container.querySelectorAll('.m-scale-unit');
        if (!scaleUnits.length) {
            this.createScaleUnits();
        }
        this.attachEventListeners(scaleUnits);
    };

    mScaleUnit.prototype.createScaleUnits = function() {
        for (var i = 1; i <= 10; i++) {
            var unit = document.createElement('label');
            unit.className = 'm-scale-unit';
            unit.setAttribute('data-value', i);

            var input = document.createElement('input');
            input.type = 'checkbox';
            input.className = 'scale-checkbox';
            input.name = 'scaleOption';
            input.value = i;

            var span = document.createElement('span');
            span.className = 'checkbox-custom';

            var img = document.createElement('img');
            img.className = 'a-image-multistate';
            img.src = this.unit.image; // Default image
            img.alt = 'Scale Icon ' + i;

            var label = document.createElement('div');
            label.className = 'a-label-datavalue';
            label.textContent = i;

            unit.appendChild(input);
            unit.appendChild(span);
            unit.appendChild(img);
            unit.appendChild(label);
            this.container.appendChild(unit);
        }
    };

    mScaleUnit.prototype.attachEventListeners = function(scaleUnits) {
        var self = this;
        scaleUnits.forEach(function(unit) {
            var input = unit.querySelector('input[type="checkbox"]');
            var imgElement = unit.querySelector('.a-image-multistate');

            input.addEventListener('change', function() {
                if (this.checked) {
                    imgElement.src = self.activeUnit.image; 
                } else {
                    imgElement.src = self.unit.image; 
                }
            });
        });
    };
    
    return mScaleUnit;
});
