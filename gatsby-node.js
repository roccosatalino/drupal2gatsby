const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

  const result = await graphql(`
    {
      pages: allNodePage {
        nodes {
          path {
            alias
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.pages.nodes.forEach(node => {
    createPage({
      path: node.path.alias,
      component: blogPostTemplate,
      context: {
        slug: node.path.alias,
      },
    });
  });
};
