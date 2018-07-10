import React from "react";
import { Link } from "react-router-dom";
import InnerHeader from "./InnerHeader";
import { withTracker } from "meteor/react-meteor-data";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "./helpers/Loader";

const Podcasts = ({ title, isLoggedIn }) => {
  return (
    <div className="podcasts">
      <InnerHeader title={title} />

      {isLoggedIn ? (
        renderPodcasts()
      ) : (
        <div className="podcasts__content">
          <h2>To see your subscribed podcasts Login or Signup.</h2>
        </div>
      )}
    </div>
  );
};

function renderPodcasts() {
  return (
    <Query query={GET_SUBSCRIBED_PODCASTS} pollInterval={5000}>
      {({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) throw error;

        if (!data || !data.podcasts || data.podcasts.length === 0) {
          return (
            <div className="podcasts__content">
              <h2>Oh no! It's empty!</h2>
              <div>
                Head to <Link to="/discover">Discover section</Link>, to find
                something you interested in.
              </div>
            </div>
          );
        }

        return data.podcasts.map(podcast => {
          if (!podcast) return;
          return (
            <div key={podcast.podcastId} className="podcasts__card">
              <Link to={`/podcasts/${podcast.podcastId}`}>
                <img
                  className="podcasts__image"
                  src={podcast.artworkUrl}
                  alt=""
                />
              </Link>
            </div>
          );
        });
      }}
    </Query>
  );
}

const GET_SUBSCRIBED_PODCASTS = gql`
  query Podcasts {
    podcasts {
      podcastId
      artworkUrl
    }
  }
`;

export default withTracker(() => {
  return { isLoggedIn: !!Meteor.userId() };
})(Podcasts);
