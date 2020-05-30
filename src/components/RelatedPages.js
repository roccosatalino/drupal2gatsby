import React from "react";

class RelatedPages extends React.Component {
  /*constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }*/

  componentDidMount() {
    fetch(
      "https://turismo.giottolabs.com/json/related/" + this.props.nid
    ).then((response) => console.log(response));
  }

  render() {
    return <div className="related">PAGINE CORRELATE</div>;
  }
}

export default RelatedPages;
