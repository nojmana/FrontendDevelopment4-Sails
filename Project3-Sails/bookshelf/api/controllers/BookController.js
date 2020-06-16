/**
 * BookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list:function(req, res) {
      Book.find({}).exec(function(err, books) {
          if (err) {
              res.send(500, {error: 'Database error'});
          }
          res.view('list', {books: books});
      });
  },

  add:function(req, res) {
      res.view('add');
  },
  create:function(req, res) {
      var title = req.body.title;
      var author = req.body.author;

      Book.create({title:title, author: author}).exec(function(err) {
        if (err) {
            res.send(500, {error: 'Database error'});
        }

        res.redirect('/book/list');
      });
  }

};

