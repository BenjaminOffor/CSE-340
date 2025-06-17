// navigation.js

const { getClassifications } = require("../models/inventory-model");

/**
 * Builds the navigation bar HTML using classifications from the DB
 */
async function getNav() {
  try {
    const data = await getClassifications(); // This uses the model, which uses pool internally
    let nav = '<ul class="navigation">';
    nav += '<li><a href="/" title="Home page">Home</a></li>';

    data.forEach((row) => {
      nav += `<li><a href="/inv/type/${row.classification_id}" title="View our ${row.classification_name} vehicles">${row.classification_name}</a></li>`;
    });

    nav += "</ul>";
    return nav;
  } catch (error) {
    console.error("getNav error:", error);
    return '<ul class="navigation"><li><a href="/">Home</a></li></ul>';
  }
}

module.exports = getNav;
