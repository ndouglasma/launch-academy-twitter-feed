import React from "react";

const Tweet = (props) => {

  return(
    <div className="callout">
      <div className="media-object">
        <div className="media-object-section">
          <div className="thumbnail">
            <img alt={ props.user_name } src={ props.user_profile_image_url } />
          </div>
        </div>
        <div className="media-object-section">
          <div className="grid-x">
            <div className="cell large-auto">{ props.user_name }</div>
            <div className="cell large-auto grey-color-text">@{ props.user_screen_name }</div>
            <div className="cell large-auto grey-color-text">{ props.date }</div>
          </div>
          <div className="tweet-text">
            <p>{ props.text }</p>
            { props.entitiesObject.hasOwnProperty("media_url") ? <img alt={ props.entitiesObject.display_url } src={ props.entitiesObject.media_url } /> : null }
          </div>
          <div className="grid-x">
            <div className="cell large-auto" onClick={ props.onReplyClick }>
              <i className="fas fa-reply" ></i>
            </div>
            <div
              className={ props.retweeted ? "cell large-auto green-color-text" : "cell large-auto grey-color-text" } onClick={ props.onRetweetClick }>
              <i className="fas fa-retweet"></i>
              &ensp;
              { props.retweet_count }
            </div>
            <div className={ props.favorited ? "cell large-auto red-color-text": "cell large-auto grey-color-text" } onClick={ props.onLikeClick }>
              <i className="fas fa-heart" ></i>
              &ensp;
              { props.favorite_count }
            </div>
            <div className="cell large-auto grey-color-text" onClick={ props.onMoreClick }>
              <i className="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
