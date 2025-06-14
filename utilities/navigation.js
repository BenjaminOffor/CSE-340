const { getClassifications } = require("../models/inventory-model");

/**
 * Builds the navigation bar HTML using classifications from the DB
 */
async function getNav() {
  let data = await getClassifications();
  let nav = "<ul>";
  nav += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    nav += `<li><a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a></li>`;
  });
  nav += "</ul>";
  return nav;
}

module.exports = getNav;
