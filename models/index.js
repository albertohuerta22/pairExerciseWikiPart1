const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack'); //second param ,({logging: false})

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

// skeleton; params for our db
const Page = db.define('page', {  // two params(name, obj with data)
  title: {
    type: Sequelize.STRING, // throws error if not string
    allowNull: false  // not given a title it will not allow, throws error
  },
  slug: {
    type: Sequelize.STRING, // throws error if not string
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT, // throws error if not string; article content
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'close'), // throws error if not BOOLEAN
  }
})

Page.addHook('beforeValidate', (page, options) => {
  page.slug = generateSlug(page.title);
  //hook gives value to slug before validation
  //hook to prevent errors (if no title)
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING, // throws error if not string
    allowNull: false, // defaultValue: 'someValue'
    unique: true
  },
  email: {
    type: Sequelize.STRING, // throws error if not string
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  }
})



module.exports = {
  db,
  Page,
  User,
}