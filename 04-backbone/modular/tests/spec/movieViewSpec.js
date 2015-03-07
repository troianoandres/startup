describe('Tests for movieView', function() {
 
  beforeEach(function() {
    /*
    var flag = false,
    that = this;
 
    require(['models/Todo', 'views/CountView'], function(Todo, View) {
      that.todos = new Todo.Collection();
      that.view = new View({collection: that.todos});
      that.mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };
      $('#sandbox').html(that.view.render().el);
      flag = true;
    });
 
    waitsFor(function() {
      return flag;
    });
    */

  });
 
  afterEach(function() {
    //this.view.remove();
  });
 
  it("asd", function() {
    expect("asd").toEqual("asd");
  });

 /*
  describe('Shows And Hides', function() {
 
    it('should be hidden', function() {
      expect(this.view.$el.is(':visible')).toEqual(false);
    });
 
    it('should toggle on add', function() {
      this.todos.add(this.mockData);
      expect(this.view.$el.is(':visible')).toEqual(true);
    });
 
  });
 
  describe('Renders Text', function() {
 
    it('should be empty', function() {
      expect(this.view.$el.text()).toEqual("");
    });
 
    it('should re-render on add', function() {
      this.todos.add(this.mockData);
      expect(this.view.$el.text()).toEqual("1 item left");
 
      this.todos.add([this.mockData,this.mockData]);
      expect(this.view.$el.text()).toEqual("3 items left");
    });
 
  });

*/
 
});