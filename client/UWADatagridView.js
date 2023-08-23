const { text } = require("body-parser");

define("UWADatagridView", [
  "UWA/Class/View",
  "UWA/Class/Debug",
  "UWA/String",
], function (View, Debug, UWAString) {
  "use strict";

  console.log("inside view");
  var UWADatagridView = UWA.Class.View.extend(UWA.Class.Debug, {
    tagName: "div",

    className: "myClass",

    //   domEvents: {
    //     "click .icon": "open",
    //     "click button.edit": "openEditDialog",
    //     "click button.delete": "delete",
    //   },
    setup: function () {
      var that = this;
      console.log(this);
      this.collection.fetch({
        reset: true,
        onComplete: function (posts, response, options) {
          // render();
          console.table(posts.toArray());
          //   console.log();
          console.log("oncomplete" + response);
          that.render();
          console.log(that.render);
        },
        onFailure: function (posts, response, options) {
          UWA.log("Oupss");
          console.log("onfailure");
        },
      });
      // this.collection.fetch(); // onComplete() --> posts --> render()
      // this.listenTo(this.model, "onChange", this.render);
      this.log("initialized!");
    },

    render: function () {
      console.log("rendering");
      // console.log(this.collection.toArray());
      console.log(JSON.parse(JSON.stringify(this.collection.toArray())));

      // Create dataGrid instance
      uwaDatagridView1 = new UWA.Controls.DataGrid({

        className: 'my-dataGrid',
        columns: [
          {
            dataIndex: 'id',
            // isFixed: true,
            // noSortable: true,
            // isFirst: true
          },
          {
            text: 'title',
            dataIndex: 'title',

          },
          {
            text: 'message',
            dataIndex: 'message'
          }
        ],
        data: JSON.parse(JSON.stringify(this.collection.toArray())),
        sortable: widget.getBool('sortable')
      });
      this.container.setContent([
        {
          tag: 'button',
          'class': 'edit',
          text:'EDIT'
        },
        {
          tag: 'button',
          'class': 'delete',
          text:'DELETE'
        }
      ]);
      uwaDatagridView1.inject(this.container);
      uwaDatagridView1.addScroller();
      return this;
    },
  });

  return UWADatagridView;
});
