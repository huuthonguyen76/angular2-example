(function (application) {
  (application.components || (application.components = {})).myButton = ng.core.Component({
    selector: 'my-button',
    inputs: ['emitter'],
    template: `
      <div *ngIf="show">
        <button>My button</button>
      </div>
    `
  })
  .Class({
    constructor: function() {
      this.show = false;
    },
    ngAfterViewInit: function () {
      var _this = this;
      _this.emitter.subscribe(function(event) {
        if (event == 'swipeleft') {
          _this.show = false;
          console.log('swipeleft');
        } else {
          _this.show = true;
          console.log('swipeRight');
        }
      });
    }
  });
  (application.components || (application.components = {})).mySwipe = ng.core.Component({
    selector: 'my-swipe',
    directives: [application.components.myButton],
    template: `
      <div class="swipe-container">
        <div class ="swipe-content">
          <ng-content select=".swipe-content-section"></ng-content>
        </div>
        <div class ="swipe-actions">
          <ng-content select=".swipe-action-section"></ng-content>
        </div>
      </div>
      <my-button [emitter]="emitter"></my-button>
    `,
    styleUrls: ['my-swipe.css']
  })
  .Class({
    constructor: function() {
      var _this = this;
      _this.emitter = new ng.core.EventEmitter();
    },
    ngAfterViewInit: function () {
      var _this = this;

      var elements = document.getElementsByClassName('swipe-content');
      var manager;
      for (var i = 0; i < elements.length; i++) {
        manager = new Hammer.Manager(elements[i], {
          recognizers: [
              [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
          ]
        });

        manager.on('swipeleft', function (e) {
          _this.emitter.next('swipeleft');
          e.target.className = 'swipe-content swiped';
        });
        manager.on('swiperight', function (e) {
          _this.emitter.next('swiperight');
          e.target.className = 'swipe-content';
        });
      }
    }
  });
})(window.application || (window.application = {}));

