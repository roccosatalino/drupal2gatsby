import React from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, nodePage } = data; // data.markdownRemark holds your post data
  const { siteMetadata } = site;
  const { title, body, relationships } = nodePage;
  return (
    <Layout>
      <Helmet>
        <title>
          {title} | {siteMetadata.title}
        </title>
        <meta name="description" content="" />
      </Helmet>
      <div className="blog-post-container">
        <article className="post">
          <h1 className="titlePage">{title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: body.value }}
          />
        </article>
        {relationships.field_related.length > 0 && (
          <div className="related">
            <h2>Contenuti correlati</h2>
            {relationships.field_related.map((node) => (
              <div>
                <h3>
                  <Link to={node.path.alias} className="post-link">
                    {node.title}
                  </Link>
                </h3>
                <div
                  className="textSummary"
                  dangerouslySetInnerHTML={{ __html: node.body.summary }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    nodePage(path: { alias: { eq: $slug } }) {
      title
      body {
        value
      }
      relationships {
        field_related {
          body {
            summary
          }
          title
          path {
            alias
          }
        }
      }
    }
  }
`;
