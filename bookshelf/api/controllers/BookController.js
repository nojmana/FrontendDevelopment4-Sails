/**
 * BookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function(req, res) {
      Book.find({}).exec(function(err, books) {
          if (err) {
              res.send(500, {error: 'Database error'});
          }
          res.view('list', {books: books});
      });
  },

  add: function(req, res) {
      res.view('add');
  },
  create: function(req, res) {
      var title = req.body.title;
      var author = req.body.author;

      Book.create({title:title, author: author}).exec(function(err) {
        if (err) {
            res.send(500, {error: 'Database error'});
        }

        res.redirect('/book/list');
      });
  },
  delete: function(req, res) {
      Book.destroy({id:req.params.id}).exec(function(err) {
        if (err) {
            res.send(500, {error: 'Database error'});
        }

        res.redirect('/book/list');
      });
      
      return false
  },
  edit: function(req, res) {
      Book.findOne({id:req.params.id}).exec(function(err, book) {
          if (err) {
              res.send(500, {error: 'Database error'})
          }

          res.view('edit', {book: book});
      });
  },
  update: function(req, res) {
      var title = req.body.title;
      var author = req.body.author;
      
      Book.update({id:req.params.id}, {title:title, author: author}).exec(function(err) {
          if (err) {
              res.send(500, {error: 'Database error'});
            }

            res.redirect('/book/list');
        });
        
        return false;
    }

};

