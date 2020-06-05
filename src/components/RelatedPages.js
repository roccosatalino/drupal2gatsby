import React from "react";
import { Link } from "gatsby";

class RelatedPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pages: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("https://turismo.giottolabs.com/json/related/" + this.props.nid)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          pages: json,
          isLoading: false,
        });
      });
  }

  render() {
    const { pages, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="related">
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className="related">
        {pages.length > 0 && <h2>Contenuti correlati</h2>}

        {pages.map((page) => (
          <div key={page.nid}>
            <h3>
              <Link to={page.path}>{page.title}</Link>
            </h3>
            <div
              className="textSummary"
              dangerouslySetInnerHTML={{ __html: page.body }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default RelatedPages;
